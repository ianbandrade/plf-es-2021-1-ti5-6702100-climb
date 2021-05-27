package config

import (
	"climb/apps-worker/utils"
	"fmt"
)

var RegistryAddress = utils.RequiredEnv("REGISTRY_ADDRESS")
var RegistryPort = utils.RequiredEnv("REGISTRY_PORT")

var DockerAddress = utils.RequiredEnv("DOCKER_ADDRESS")
var DockerPort = utils.RequiredEnv("DOCKER_PORT")

var DockerHost = fmt.Sprintf("tcp://%s:%s", DockerAddress, DockerPort)
