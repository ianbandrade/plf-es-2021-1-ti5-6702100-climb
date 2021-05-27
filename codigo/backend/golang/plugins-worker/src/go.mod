module climb/plugins-worker

go 1.16

replace (
	github.com/abbot/go-http-auth => github.com/containous/go-http-auth v0.4.1-0.20200324110947-a37a7636d23e
	github.com/docker/distribution => github.com/docker/distribution v0.0.0-20191216044856-a8371794149d
	github.com/docker/docker => github.com/moby/moby v17.12.0-ce-rc1.0.20200618181300-9dc6525e6118+incompatible
	github.com/go-check/check => github.com/containous/check v0.0.0-20170915194414-ca0bf163426a
)

require (
	github.com/streadway/amqp v0.0.0-20190827072141-edfb9018d271
	github.com/tidwall/gjson v1.7.4
	github.com/tidwall/sjson v1.1.6
	github.com/traefik/traefik/v2 v2.4.8
	helm.sh/helm/v3 v3.5.4
	k8s.io/apimachinery v0.20.4
	k8s.io/cli-runtime v0.20.4
	k8s.io/client-go v0.20.4
)
