package message

import (
	"climb/plugins-worker/structs"
	"climb/plugins-worker/utils"
	"fmt"

	"github.com/streadway/amqp"
)

func Producer(routingKey, contentType string, body []byte) (err error) {
	server, err := getServer()

	if err != nil {
		return err
	}

	if err = server.channel.Publish(
		"amq.topic",
		routingKey,
		false,
		false,
		amqp.Publishing{
			ContentType: contentType,
			Body:        body,
		},
	); err != nil {
		errorMessage := fmt.Sprintf("failed to publish message")
		utils.LogError(err, errorMessage)

		return &structs.RabbitMQError{Message: errorMessage}
	}

	return
}
