package utils

import (
	"fmt"
	"log"
	"math/rand"
	"os"
	"time"
)

func GetURI(protocol string) string {
	return fmt.Sprintf(`%s://{{index . "username"}}@{{index . "password"}}:{{index . "host"}}/{{index . "database"}}`, protocol)
}

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

func RandomString(length int) string {
	const alphanumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
	bytes := make([]byte, length)

	rand.Seed(time.Now().UnixNano())

	for i := 0; i < length; i++ {
		bytes[i] = alphanumeric[rand.Int()%len(alphanumeric)]
	}

	return string(bytes)
}

func RequiredEnv(key string) (value string) {
	value = os.Getenv(key)

	if len(value) == 0 {
		log.Fatalf("Environment variable \"%s\" not defined", key)
	}

	return value
}
