package deploy

import (
  "climb/apps-deployer/services/deploy/specs"
  "climb/apps-deployer/structs"
  "climb/apps-deployer/utils"
  "context"
  "fmt"
  "github.com/traefik/traefik/v2/pkg/provider/kubernetes/crd/generated/clientset/versioned"
  "path/filepath"

  "github.com/docker/go-connections/nat"
  metaV1 "k8s.io/apimachinery/pkg/apis/meta/v1"
  "k8s.io/client-go/kubernetes"
  "k8s.io/client-go/tools/clientcmd"
)

func Deploy(name, image string, port nat.Port, envs []structs.Env) (err error) {
  ctx := context.TODO()
  namespace := "default"
  kubeConfigPath, _ := filepath.Abs("kubernetes/config")

  config, err := clientcmd.BuildConfigFromFlags("", kubeConfigPath)

  if err != nil {
    utils.LogError(err, "failed to create Kubernetes Rest Config")
    return
  }

  kubernetesClientSet, err := kubernetes.NewForConfig(config)

  if err != nil {
    utils.LogError(err, "failed to create Kubernetes Client Set")
    return
  }

  traefikClientSet, err := versioned.NewForConfig(config)

  if err != nil {
    utils.LogError(err, "failed to create Traefik Client Set")
    return
  }

  coreV1Client := kubernetesClientSet.CoreV1()
  appsV1Client := kubernetesClientSet.AppsV1()
  traefikV1alpha1Client := traefikClientSet.TraefikV1alpha1()

  deploymentSpec := specs.Deployment(name, image, port, envs)

  deployment, err := appsV1Client.Deployments(namespace).Create(
    ctx, deploymentSpec, metaV1.CreateOptions{})

  if err != nil {
    errorMessage := fmt.Sprintf("failed to create Kubernetes Deployment %s", name)
    utils.LogError(err, errorMessage)
    return
  }

  fmt.Printf("Created Deployment %s\n", deployment.ObjectMeta.Name)

  serviceSpec := specs.Service(name, port)

  service, err := coreV1Client.Services(namespace).Create(
    ctx, serviceSpec, metaV1.CreateOptions{})

  if err != nil {
    errorMessage := fmt.Sprintf("failed to create Kubernetes Service %s", name)
    utils.LogError(err, errorMessage)
    return
  }

  fmt.Printf("Created Service %s\n", service.ObjectMeta.Name)

  ingressRouteSpec := specs.IngressRoute(name, port)

  ingressRoute, err := traefikV1alpha1Client.IngressRoutes(namespace).Create(
    ctx, ingressRouteSpec, metaV1.CreateOptions{})

  if err != nil {
    errorMessage := fmt.Sprintf("failed to create Traefik Ingress Route %s", name)
    utils.LogError(err, errorMessage)
    return
  }

  fmt.Printf("Created Ingress Route %s\n", ingressRoute.ObjectMeta.Name)

  return
}
