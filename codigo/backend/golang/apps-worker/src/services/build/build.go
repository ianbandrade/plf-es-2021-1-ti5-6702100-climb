package build

import (
  "climb/apps-deployer/config"
  "climb/apps-deployer/utils"
  "fmt"
  "github.com/docker/docker/client"
  "os"
)

func Build(image, workdir string) (err error) {
  dockerClient, err := client.NewClientWithOpts(client.WithHost(config.DockerHost))

  if err != nil {
    utils.LogError(err, "failed to create Docker client")
    return
  }

  dockerfilePath := fmt.Sprintf("%s/Dockerfile", workdir)
  _, err = os.Stat(dockerfilePath)

  if os.IsNotExist(err) {
    err = buildWithPack(dockerClient, image, workdir)
  } else {
    err = buildWithDocker(dockerClient, image, workdir)
  }

  return err
}
