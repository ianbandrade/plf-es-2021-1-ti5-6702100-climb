package message

import (
  "climb/apps-deployer/structs"
  "climb/apps-deployer/utils"
  "fmt"
  "github.com/streadway/amqp"
  "sync"
  "time"
)

type AmqpServer = struct {
  connection *amqp.Connection
  channel    *amqp.Channel
}

var once sync.Once

var amqpServer *AmqpServer
var amqpError error

func getServer() (*AmqpServer, error) {
  once.Do(func() {
    amqpServer = &AmqpServer{}

    user := utils.OptionalEnv("RABBITMQ_USER", "guest")
    pass := utils.OptionalEnv("RABBITMQ_PASS", "guest")
    host := utils.OptionalEnv("RABBITMQ_HOST", "localhost")
    port := utils.OptionalEnv("RABBITMQ_PORT", "5672")

    amqpURL := fmt.Sprintf("amqp://%s:%s@%s:%s/", user, pass, host, port)

    for ok := true; ok; ok = amqpServer.connection == nil {
      connection, err := amqp.Dial(amqpURL)
      amqpServer.connection = connection

      if err != nil {
        errorMessage := "failed to connect to RabbitMQ"
        utils.LogError(err, errorMessage)
        amqpError = &structs.RabbitMQError{Err: err, Message: errorMessage}

        time.Sleep(2 * time.Second)
      }
    }

    amqpError = nil

    channel, err := amqpServer.connection.Channel()
    amqpServer.channel = channel

    if err != nil {
      errorMessage := "failed to open a channel"
      utils.LogError(err, errorMessage)
      amqpError = &structs.RabbitMQError{Err: err, Message: errorMessage}
    }
  })

  return amqpServer, amqpError
}
