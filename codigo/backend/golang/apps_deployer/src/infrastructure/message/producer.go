package message

import (
	"climb/apps-deployer/structs"
	"climb/apps-deployer/utils"
	"fmt"
	"github.com/streadway/amqp"
)

func Producer(contentType string, body []byte) (err error) {
	server, err := getServer()

	if err != nil {
		return err
	}

	queueName := utils.RequiredEnv("PRODUCER_QUEUE")

	queue, err := server.channel.QueueDeclare(
		queueName,
		true,
		false,
		false,
		false,
		nil,
	)

	if err != nil {
		errorMessage := fmt.Sprintf("failed to declare queue %s", queueName)
		utils.LogError(err, errorMessage)

		return &structs.RabbitMQError{Message: errorMessage}
	}

	if err = server.channel.Publish(
		"",
		queue.Name,
		false,
		false,
		amqp.Publishing{
			ContentType:     contentType,
			Body:            body,
		},
	); err != nil {
		errorMessage := fmt.Sprintf("failed to publish to queue %s", queueName)
		utils.LogError(err, errorMessage)

		return &structs.RabbitMQError{Message: errorMessage}
	}

	return
}
