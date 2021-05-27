package extractPort

import (
  "climb/apps-deployer/config"
  "climb/apps-deployer/utils"
  "context"
  "github.com/docker/docker/api/types"
  "github.com/docker/docker/client"
  "github.com/docker/go-connections/nat"
  "io"
  "os"
)

func Extract(image string) (exposedPort nat.Port, err error) {
  ctx := context.Background()
  dockerClient, err := client.NewClientWithOpts(client.WithHost(config.DockerHost))

  if err != nil {
    utils.LogError(err, "failed to create Docker client")
    return
  }

  reader, err := dockerClient.ImagePull(ctx, image, types.ImagePullOptions{})

  if err != nil {
    utils.LogError(err, "failed to pull image")
    return
  }

  _, err = io.Copy(os.Stdout, reader)

  if err != nil {
    utils.LogError(err, "failed to read image pull response")
    return
  }

  imageInfo, _, err := dockerClient.ImageInspectWithRaw(ctx, image)

  if err != nil {
    utils.LogError(err, "failed to inspect image")
    return
  }

  exposedPort, err = nat.NewPort("tcp", "8080")

  if err != nil {
    utils.LogError(err, "failed to create port")
    return
  }

  for port := range imageInfo.Config.ExposedPorts {
    exposedPort = port
    break
  }

  return
}
