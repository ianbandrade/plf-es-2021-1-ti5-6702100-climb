package specs

import (
  "climb/apps-deployer/structs"
  "github.com/docker/go-connections/nat"
  appsV1 "k8s.io/api/apps/v1"
  v1 "k8s.io/api/apps/v1"
  coreV1 "k8s.io/api/core/v1"
  metaV1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func Deployment(name, image string, port nat.Port, envs []structs.Env) *v1.Deployment {
  return &appsV1.Deployment{
    ObjectMeta: metaV1.ObjectMeta{
      Name: name,
    },
    Spec: appsV1.DeploymentSpec{
      Selector: &metaV1.LabelSelector{
        MatchLabels: map[string]string{
          "app": name,
        },
      },
      Template: coreV1.PodTemplateSpec{
        ObjectMeta: metaV1.ObjectMeta{
          Labels: map[string]string{
            "app": name,
          },
        },
        Spec: coreV1.PodSpec{
          Containers: []coreV1.Container{
            {
              Name:  name,
              Image: image,
              Ports: []coreV1.ContainerPort{
                {
                  ContainerPort: int32(port.Int()),
                },
              },
              Env: getEnvironments(envs),
            },
          },
        },
      },
    },
  }
}

func getEnvironments(environments []structs.Env) (envs []coreV1.EnvVar) {
  for _, env := range environments {
    envs = append(envs, coreV1.EnvVar{
      Name:  env.Key,
      Value: env.Value,
    })
  }

  return envs
}
