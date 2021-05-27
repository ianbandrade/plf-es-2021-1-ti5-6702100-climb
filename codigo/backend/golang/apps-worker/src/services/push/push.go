package push

import (
	"climb/apps-worker/config"
	"climb/apps-worker/utils"
	"context"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"io"
	"os"
)

func Push(image string) (err error) {
	ctx := context.Background()

	dockerClient, err := client.NewClientWithOpts(client.WithHost(config.DockerHost))

	if err != nil {
		utils.LogError(err, "failed to create Docker client")
		return
	}

	pushOptions := types.ImagePushOptions{
		RegistryAuth: "docker",
	}

	pushResponse, err := dockerClient.ImagePush(ctx, image, pushOptions)

	if err != nil {
		utils.LogError(err, "failed to push image")
		return
	}

	defer pushResponse.Close()
	_, err = io.Copy(os.Stdout, pushResponse)

	if err != nil {
		utils.LogError(err, "failed to read image push response")
		return
	}

	return err
}
