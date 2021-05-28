#!/bin/bash

DNS_TOKEN=${DNS_TOKEN:?}

sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker
sudo snap install docker

sudo groupadd microk8s
sudo usermod -aG microk8s $USER
newgrp microk8s
sudo snap install microk8s --classic

mkdir ~/.kube
microk8s.kubectl config view --raw > ~/.kube/config

cat << END | sudo tee /var/snap/docker/current/config/daemon.json > /dev/null
{
  "hosts": ["unix:///var/run/docker.sock", "tcp://0.0.0.0:2375"]
}
END

sudo snap restart docker

microk8s enable helm3 registry dns
sudo snap alias microk8s.helm3 helm
sudo snap alias microk8s.kubectl kubectl

kubectl create namespace monitoring
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo add traefik https://helm.traefik.io/traefik
helm repo update

kubectl create secret generic cloudflare --from-literal=dns-token=$DNS_TOKEN

helm upgrade --install traefik traefik/traefik -f src/traefik-values.yaml
helm upgrade --install --namespace monitoring prometheus-operator prometheus-community/kube-prometheus-stack -f src/prometheus-values.yaml

kubectl -n default apply -f src/traefik-dashboard-service.yaml
kubectl -n monitoring apply -f src/traefik-servicemonitor.yaml
kubectl -n monitoring create cm grafana-traefik --from-file=src/traefik.json
kubectl -n monitoring label cm grafana-traefik grafana_dashboard=traefik

cat << END | sudo tee /usr/local/bin/k8s-start > /dev/null
#!/bin/bash
sudo kubectl port-forward --address 0.0.0.0 svc/traefik 80:80 &>/dev/null &
sudo kubectl port-forward --address 0.0.0.0 svc/traefik 443:443 &>/dev/null &
sudo kubectl port-forward --address 0.0.0.0 svc/traefik-dashboard 9000:9000 &>/dev/null &

sudo kubectl port-forward --address 0.0.0.0 -n monitoring svc/prometheus-operator-grafana 3000:80 &>/dev/null &
sudo kubectl port-forward --address 0.0.0.0 -n monitoring svc/prometheus-operator-kube-p-prometheus 9090:9090 &>/dev/null &
END

chmod ug+x /usr/local/bin/k8s-start
