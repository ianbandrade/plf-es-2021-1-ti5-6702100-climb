package structs

type DeployError struct {
  Err     error
  Message string
}

func (deployError *DeployError) Error() string {
  return deployError.Message
}
