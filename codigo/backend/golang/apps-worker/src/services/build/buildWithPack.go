package build

import (
  "climb/apps-deployer/utils"
  "context"
  "github.com/buildpacks/pack"
  "github.com/docker/docker/client"
)

func buildWithPack(dockerClient *client.Client, image, workdir string) (err error) {
  ctx := context.Background()

  packClient, err := pack.NewClient(pack.WithDockerClient(dockerClient))

  if err != nil {
    utils.LogError(err, "failed to create Pack client")
    return
  }

  buildOptions := pack.BuildOptions{
    Image:   image,
    AppPath: workdir,
    Builder: utils.OptionalEnv("PACK_BUILDER", "heroku/buildpacks:20"),
  }

  err = packClient.Build(ctx, buildOptions)

  if err != nil {
    utils.LogError(err, "failed to build image with Pack")
    return
  }

  return err
}
