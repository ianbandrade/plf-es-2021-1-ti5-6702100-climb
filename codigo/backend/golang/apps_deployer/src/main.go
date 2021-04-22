package main

import (
  "climb/apps-deployer/config"
  "climb/apps-deployer/infrastructure/message"
  "climb/apps-deployer/services/build"
  "climb/apps-deployer/services/clone"
  "climb/apps-deployer/services/push"
  "climb/apps-deployer/structs"
  "climb/apps-deployer/utils"
  "encoding/json"
  "errors"
  "fmt"
  "io/ioutil"
  "os"
  "strings"
)

func main() {
  err := message.Consumer(func(deployMessage []byte) {
    deployId, err := func() (deployId string, err error) {
      var deploy structs.DeployRequest

      if err = json.Unmarshal(deployMessage, &deploy); err != nil {
        utils.LogError(err, "failed to parse deploy deployMessage")
        return
      }

      application := &deploy.Application
      image := fmt.Sprintf("%s:%s/%s", config.RegistryAddress, config.RegistryPort, application.Name)

      directory, err := ioutil.TempDir(os.TempDir(), "climb")

      if err != nil {
        utils.LogError(err, "failed to create workspace directory")
        return
      }

      defer os.RemoveAll(directory)

      deployId = deploy.Id
      workdir := fmt.Sprintf("%s/%s", directory, strings.Trim(application.RepositoryPath, "/"))

      if err = clone.Clone(
        application.RepositoryURL,
        application.RepositoryRef,
        deploy.Token,
        workdir,
      ); err != nil {
        err = &structs.DeployError{Err: err, Message: "Falha ao clonar o repositório"}
        return
      }

      if err = build.Build(image, workdir); err != nil {
        err = &structs.DeployError{Err: err, Message: "Falha ao construir a aplicação"}
        return
      }

      if err = push.Push(image); err != nil {
        err = &structs.DeployError{Err: err, Message: "Falha ao salvar a aplicação"}
        return
      }

      return
    }()

    var deployResponse structs.DeployResponse

    if errors.Is(err, &structs.DeployError{}) {
      deployResponse = structs.DeployResponse{
        Id:      deployId,
        Error:   err.Error(),
        Success: false,
      }
    } else if err == nil {
      deployResponse = structs.DeployResponse{
        Id:      deployId,
        Error:   "",
        Success: true,
      }
    } else {
      return
    }

    deployResponseJSON, err := json.Marshal(deployResponse)
    _ = message.Producer("application/json", deployResponseJSON)
  })

  utils.LogError(err, "failed to run application")
}
