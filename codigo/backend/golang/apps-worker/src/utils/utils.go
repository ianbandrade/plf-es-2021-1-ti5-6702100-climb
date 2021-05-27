package utils

import (
  "fmt"
  "log"
  "os"
)

func LogError(err error, message string) {
  if err != nil {
    message = fmt.Sprintf("%s: %s", message, err.Error())
  }

  log.Print(message)
}

func OptionalEnv(key, fallback string) (value string) {
  value = os.Getenv(key)

  if len(value) == 0 {
    return fallback
  }

  return value
}

func RequiredEnv(key string) (value string) {
  value = os.Getenv(key)

  if len(value) == 0 {
    log.Fatalf("Environment variable \"%s\" not defined", key)
  }

  return value
}
