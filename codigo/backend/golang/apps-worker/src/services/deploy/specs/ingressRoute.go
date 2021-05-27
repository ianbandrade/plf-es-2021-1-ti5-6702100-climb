package specs

import (
  "climb/apps-deployer/utils"
  "fmt"

  "github.com/docker/go-connections/nat"
  "github.com/traefik/traefik/v2/pkg/provider/kubernetes/crd/traefik/v1alpha1"
  metaV1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func IngressRoute(name string, port nat.Port) *v1alpha1.IngressRoute {
  host := utils.RequiredEnv("HOST")

  return &v1alpha1.IngressRoute{
    ObjectMeta: metaV1.ObjectMeta{
      Name: name,
    },
    Spec: v1alpha1.IngressRouteSpec{
      EntryPoints: []string{"websecure"},
      TLS: &v1alpha1.TLS{
        CertResolver: "letsencrypt",
      },
      Routes: []v1alpha1.Route{
        {
          Kind:  "Rule",
          Match: fmt.Sprintf("Host(`%s.%s`)", name, host),
          Services: []v1alpha1.Service{
            {
              LoadBalancerSpec: v1alpha1.LoadBalancerSpec{
                Name: name,
                Port: int32(port.Int()),
              },
            },
          },
        },
      },
    },
  }
}
