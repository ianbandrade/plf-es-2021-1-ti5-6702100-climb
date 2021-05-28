package main

import (
	"climb/apps-worker/config"
	"climb/apps-worker/infrastructure/message"
	"climb/apps-worker/services/build"
	"climb/apps-worker/services/clone"
	"climb/apps-worker/services/deploy"
	"climb/apps-worker/services/destroy"
	"climb/apps-worker/services/extractPort"
	"climb/apps-worker/services/push"
	"climb/apps-worker/structs"
	"climb/apps-worker/utils"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"strings"

	"github.com/streadway/amqp"
)

func main() {
	go func() {
		if err := message.Consumer("apps_deploy",
			[]string{"apps.create.req", "apps.update.req"}, func(msg amqp.Delivery) {
				messageId, appName, err := func() (messageId, appName string, err error) {
					var deployRequest structs.DeployRequest

					if err = json.Unmarshal(msg.Body, &deployRequest); err != nil {
						utils.LogError(err, "failed to parse Deploy Request")
						return
					}

					app := &deployRequest.Application
					messageId = deployRequest.Id
					appName = app.Name

					image := fmt.Sprintf("%s:%s/%s:%s",
						config.RegistryAddress, config.RegistryPort, app.Name, deployRequest.Commit)

					if msg.RoutingKey == "apps.create.req" {
						directory, err := ioutil.TempDir(os.TempDir(), "climb")

						if err != nil {
							utils.LogError(err, "failed to create workspace directory")
							return messageId, appName, err
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
							return messageId, appName, err
						}

						if err = build.Build(image, workdir); err != nil {
							err = &structs.AppError{Err: err, Message: "Falha ao construir a aplicação"}
							return messageId, appName, err
						}

						if err = push.Push(image); err != nil {
							err = &structs.AppError{Err: err, Message: "Falha ao armazenar a aplicação"}
							return messageId, appName, err
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

				if response := getResponse(messageId, appName, err); response != nil {
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
				messageId, appName, err := func() (messageId, appName string, err error) {
					var destroyRequest structs.DestroyRequest

					if err = json.Unmarshal(msg.Body, &destroyRequest); err != nil {
						utils.LogError(err, "failed to parse Destroy Request")
						return messageId, appName, err
					}

					app := &destroyRequest.Application
					messageId = destroyRequest.Id
					appName = app.Name

					if err = destroy.Destroy(app.Name); err != nil {
						err = &structs.AppError{Err: err, Message: "Falha ao remover a aplicação"}
						return messageId, appName, err
					}

					return
				}()

				if response := getResponse(messageId, appName, err); response != nil {
					routingKey := "apps.delete.res"

					if err = message.Producer(routingKey, "application/json", *response); err != nil {
						utils.LogError(err, "failed to produce destroy response")
					}
				}

			}); err != nil {
			utils.LogError(err, "failed to consume destroy message")
		}
	}()

	select {}
}

func getResponse(messageId, appName string, err error) *[]byte {
	host := utils.RequiredEnv("HOST")
	url := fmt.Sprintf("https://%s.%s", appName, host)

	response := structs.Response{
		Id:      messageId,
		URL:     url,
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
