package message

import (
  "climb/apps-deployer/structs"
  "climb/apps-deployer/utils"
  "fmt"
)

func Consumer(handler func([]byte)) (err error) {
  server, err := getServer()

  if err != nil {
    return err
  }

  queueName := utils.RequiredEnv("CONSUMER_QUEUE")

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

  messages, err := server.channel.Consume(
    queue.Name,
    "",
    true,
    false,
    false,
    false,
    nil,
  )

  for message := range messages {
    msg := message

    go func() {
      handler(msg.Body)
    }()
  }

  return
}
