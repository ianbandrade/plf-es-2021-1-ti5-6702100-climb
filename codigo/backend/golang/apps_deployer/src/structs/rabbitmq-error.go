package structs

type RabbitMQError struct {
  Err     error
  Message string
}

func (rabbitMQError *RabbitMQError) Error() string {
  return rabbitMQError.Message
}
