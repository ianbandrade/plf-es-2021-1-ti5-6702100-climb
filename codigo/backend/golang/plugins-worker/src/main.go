package main

import (
	"climb/plugins-worker/infrastructure/message"
	"climb/plugins-worker/services/deploy"
	"climb/plugins-worker/services/destroy"
	"climb/plugins-worker/structs"
	"climb/plugins-worker/utils"
	"encoding/json"
	"github.com/streadway/amqp"
)

func main() {
	go func() {
		if err := message.Consumer("plugins_deploy",
			[]string{"plugins.create.req"}, func(msg amqp.Delivery) {
				messageId, credentials, err := func() (
					messageId string, credentials []structs.Credential, err error) {
					var deployRequest structs.DeployRequest

					if err = json.Unmarshal(msg.Body, &deployRequest); err != nil {
						utils.LogError(err, "failed to parse Deploy Request")
						return
					}

					plugin := &deployRequest.Plugin
					messageId = deployRequest.Id

					credentials, err = deploy.Deploy(plugin.Name, plugin.Chart)

					if err != nil {
						err = &structs.AppError{Err: err, Message: "Falha ao criar App Pré-configurado"}
						return
					}

					return
				}()

				if response := getResponse(messageId, credentials, err); response != nil {
					routingKey := "plugins.create.res"

					if err = message.Producer(routingKey, "application/json", *response); err != nil {
						utils.LogError(err, "failed to produce deploy response")
					}
				}
			}); err != nil {
			utils.LogError(err, "failed to consume deploy request")
		}
	}()

	go func() {
		if err := message.Consumer("plugins_destroy",
			[]string{"plugins.delete.req"}, func(msg amqp.Delivery) {
				messageId, credentials, err := func() (
					messageId string, credentials []structs.Credential, err error) {
					var destroyRequest structs.DestroyRequest

					if err = json.Unmarshal(msg.Body, &destroyRequest); err != nil {
						utils.LogError(err, "failed to parse Destroy Request")
						return
					}

					plugin := &destroyRequest.Plugin
					messageId = destroyRequest.Id

					if err = destroy.Destroy(plugin.Name, plugin.Chart); err != nil {
						err = &structs.AppError{Err: err, Message: "Falha ao deletar App Pré-configurado"}
						return
					}

					return
				}()

				if response := getResponse(messageId, credentials, err); response != nil {
					routingKey := "plugins.delete.res"

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

func getResponse(messageId string, credentials []structs.Credential, err error) *[]byte {
	response := structs.Response{
		Id:          messageId,
		Credentials: credentials,
		Error:       nil,
		Success:     true,
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
