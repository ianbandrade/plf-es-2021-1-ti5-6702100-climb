package main

import (
  "climb/apps-deployer/config"
  "climb/apps-deployer/infrastructure/message"
  "climb/apps-deployer/services/build"
  "climb/apps-deployer/services/clone"
  "climb/apps-deployer/services/deploy"
  "climb/apps-deployer/services/destroy"
  "climb/apps-deployer/services/extractPort"
  "climb/apps-deployer/services/push"
  "climb/apps-deployer/structs"
  "climb/apps-deployer/utils"
  "encoding/json"
  "fmt"
  "github.com/streadway/amqp"
  "io/ioutil"
  "os"
  "strings"
)

func main() {
  go func() {
    if err := message.Consumer("apps_deploy",
      []string{"apps.create.req", "apps.update.req"}, func(msg amqp.Delivery) {
        messageId, err := func() (messageId string, err error) {
          var deployRequest structs.DeployRequest

          if err = json.Unmarshal(msg.Body, &deployRequest); err != nil {
            utils.LogError(err, "failed to parse Deploy Request")
            return
          }

          messageId = deployRequest.Id
          app := &deployRequest.Application
          image := fmt.Sprintf("%s:%s/%s:%s",
            config.RegistryAddress, config.RegistryPort, app.Name, deployRequest.Commit)

          if msg.RoutingKey == "apps.create.req" {
            directory, err := ioutil.TempDir(os.TempDir(), "climb")

            if err != nil {
              utils.LogError(err, "failed to create workspace directory")
              return messageId, err
            }

            defer os.RemoveAll(directory)
            workdir := fmt.Sprintf("%s/%s", directory, strings.Trim(app.RepositoryPath, "/"))

            if err = clone.Clone(
              app.RepositoryURL,
              app.RepositoryRef,
              deployRequest.Token,
              deployRequest.Commit,
              workdir,
            ); err != nil {
              err = &structs.AppError{Err: err, Message: "Falha ao clonar o repositório"}
              return messageId, err
            }

            if err = build.Build(image, workdir); err != nil {
              err = &structs.AppError{Err: err, Message: "Falha ao construir a aplicação"}
              return messageId, err
            }

            if err = push.Push(image); err != nil {
              err = &structs.AppError{Err: err, Message: "Falha ao armazenar a aplicação"}
              return messageId, err
            }
          }

          port, err := extractPort.Extract(image)

          if err != nil {
            err = &structs.AppError{Err: err, Message: "Falha ao extrair a porta da aplicação"}
            return
          }

          if err = deploy.Deploy(
            app.Name,
            image,
            port,
            app.Environments,
          ); err != nil {
            err = &structs.AppError{Err: err, Message: "Falha ao publicar a aplicação"}
            return
          }

          return
        }()

        if response := getResponse(messageId, err); response != nil {
          routingKey := "apps.create.res"
          if msg.RoutingKey == "apps.update.req" {
            routingKey = "apps.update.res"
          }

          if err = message.Producer(routingKey, "application/json", *response); err != nil {
            utils.LogError(err, "failed to produce deploy response")
          }
        }
      }); err != nil {
      utils.LogError(err, "failed to consume deploy request")
    }
  }()

  go func() {
    if err := message.Consumer("apps_destroy",
      []string{"apps.delete.req"}, func(msg amqp.Delivery) {
        var destroyRequest structs.DestroyRequest

        if err := json.Unmarshal(msg.Body, &destroyRequest); err != nil {
          utils.LogError(err, "failed to parse Destroy Request")
          return
        }

        app := &destroyRequest.Application

        if err := destroy.Destroy(app.Name); err != nil {
          err = &structs.AppError{Err: err, Message: "Falha ao remover a aplicação"}
          return
        }
      }); err != nil {
      utils.LogError(err, "failed to consume destroy message")
    }
  }()

  select {}
}

func getResponse(messageId string, err error) *[]byte {
  response := structs.Response{
    Id:      messageId,
    Error:   nil,
    Success: true,
  }

  if err != nil {
    errorMessage := err.Error()
    response = structs.Response{
      Id:      messageId,
      Error:   &errorMessage,
      Success: false,
    }
  }

  responseJSON, err := json.Marshal(response)

  return &responseJSON
}
