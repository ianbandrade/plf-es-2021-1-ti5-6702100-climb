module climb/apps-worker

go 1.16

replace (
	github.com/abbot/go-http-auth => github.com/containous/go-http-auth v0.4.1-0.20200324110947-a37a7636d23e
	github.com/go-check/check => github.com/containous/check v0.0.0-20170915194414-ca0bf163426a
)

require (
	github.com/buildpacks/pack v0.18.0
	github.com/docker/docker v20.10.0-beta1.0.20201110211921-af34b94a78a1+incompatible
	github.com/docker/go-connections v0.4.0
	github.com/go-git/go-git/v5 v5.3.0
	github.com/streadway/amqp v1.0.0
	github.com/traefik/traefik/v2 v2.4.8
	k8s.io/api v0.20.2
	k8s.io/apimachinery v0.20.2
	k8s.io/client-go v0.20.2
)
