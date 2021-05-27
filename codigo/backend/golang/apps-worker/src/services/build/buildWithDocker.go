package build

import (
  "climb/apps-deployer/utils"
  "context"
  "github.com/docker/docker/api/types"
  "github.com/docker/docker/client"
  "github.com/docker/docker/pkg/archive"
  "io"
  "os"
)

func buildWithDocker(dockerClient *client.Client, image, workdir string) (err error) {
  ctx := context.Background()

  buildContext, err := archive.TarWithOptions(workdir, &archive.TarOptions{})

  if err != nil {
    utils.LogError(err, "failed to create workdir tar file")
    return
  }

  buildOptions := types.ImageBuildOptions{
    Tags: []string{image},
  }

  buildResponse, err := dockerClient.ImageBuild(ctx, buildContext, buildOptions)

  if err != nil {
    utils.LogError(err, "failed to build image with Docker")
    return
  }

  defer buildResponse.Body.Close()
  _, err = io.Copy(os.Stdout, buildResponse.Body)

  if err != nil {
    utils.LogError(err, "failed to read image build response")
    return
  }

  return err
}
