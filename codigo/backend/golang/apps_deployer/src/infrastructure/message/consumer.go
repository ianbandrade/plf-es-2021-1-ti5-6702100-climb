package message

import (
  "climb/apps-deployer/structs"
  "climb/apps-deployer/utils"
  "fmt"
  "github.com/streadway/amqp"
)

func Consumer(queueName string, routingKeys []string, handler func(amqp.Delivery)) (err error) {
  server, err := getServer()

  if err != nil {
    return err
  }

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

  for _, routingKey := range routingKeys {
    if err = server.channel.QueueBind(
      queue.Name,
      routingKey,
      "amq.topic",
      false,
      nil,
    ); err != nil {
      errorMessage := fmt.Sprintf("failed to bind queue %s", queueName)
      utils.LogError(err, errorMessage)

      return &structs.RabbitMQError{Message: errorMessage}
    }
  }

  messages, err := server.channel.Consume(
    queue.Name,
    "",
    true,
    false,
    false,
    false,
    nil,
  )

  if err != nil {
    errorMessage := fmt.Sprintf("failed to consume queue %s", queueName)
    utils.LogError(err, errorMessage)

    return &structs.RabbitMQError{Message: errorMessage}
  }

  for message := range messages {
    msg := message

    go func() {
      handler(msg)
    }()
  }

  return
}
