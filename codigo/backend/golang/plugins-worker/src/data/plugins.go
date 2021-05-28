package data

import (
	"climb/plugins-worker/structs"
)

var Plugins = structs.Plugins{
	"mariadb": {
		Entrypoint: "mysql",
		Protocol:   "mariadb",
		WebPort:    nil,
		Storages: []string{
			"data-%s-0",
		},
		Configs: structs.Configs{
			"database": {
				Label: "Banco de dados",
				Path:  "auth.database",
				Size:  8,
			},
			"username": {
				Label: "Usuário",
				Path:  "auth.username",
				Size:  8,
			},
			"password": {
				Label: "Senha",
				Path:  "auth.password",
				Size:  16,
			},
			"rootPassword": {
				Label: "Senha do usuário root",
				Path:  "auth.rootPassword",
				Size:  16,
			},
		},
	},
	"mongodb": {
		Entrypoint: "mongodb",
		Protocol:   "mongodb",
		WebPort:    nil,
		Storages: []string{
			"%s",
		},
		Configs: structs.Configs{
			"database": {
				Label: "Banco de dados",
				Path:  "auth.database",
				Size:  8,
			},
			"username": {
				Label: "Usuário",
				Path:  "auth.username",
				Size:  8,
			},
			"password": {
				Label: "Senha",
				Path:  "auth.password",
				Size:  16,
			},
			"rootPassword": {
				Label: "Senha do usuário root",
				Path:  "auth.rootPassword",
				Size:  16,
			},
		},
	},
	"mysql": {
		Entrypoint: "mysql",
		Protocol:   "mysql",
		WebPort:    nil,
		Storages: []string{
			"data-%s-0",
		},
		Configs: structs.Configs{
			"database": {
				Label: "Banco de dados",
				Path:  "auth.database",
				Size:  8,
			},
			"username": {
				Label: "Usuário",
				Path:  "auth.username",
				Size:  8,
			},
			"password": {
				Label: "Senha",
				Path:  "auth.password",
				Size:  16,
			},
			"rootPassword": {
				Label: "Senha do usuário root",
				Path:  "auth.rootPassword",
				Size:  16,
			},
		},
	},
	"postgresql": {
		Entrypoint: "postgresql",
		Protocol:   "postgresql",
		WebPort:    nil,
		Storages: []string{
			"data-%s-postgresql-0",
		},
		Configs: structs.Configs{
			"database": {
				Label: "Banco de dados",
				Path:  "postgresqlDatabase",
				Size:  8,
			},
			"username": {
				Label: "Usuário",
				Path:  "postgresqlUsername",
				Size:  8,
			},
			"password": {
				Label: "Senha",
				Path:  "postgresqlPassword",
				Size:  16,
			},
		},
	},
	"rabbitmq": {
		Entrypoint: "rabbitmq",
		Protocol:   "amqp",
		WebPort:    int32Ptr(15672),
		Storages: []string{
			"data-%s-rabbitmq-0",
		},
		Configs: structs.Configs{
			"username": {
				Label: "Usuário",
				Path:  "auth.username",
				Size:  8,
			},
			"password": {
				Label: "Senha",
				Path:  "auth.password",
				Size:  16,
			},
		},
	},
	"redis": {
		Entrypoint: "redis",
		Protocol:   "redis",
		WebPort:    nil,
		Storages: []string{
			"redis-data-%s-master-0",
			"redis-data-%s-replicas-0",
			"redis-data-%s-replicas-1",
			"redis-data-%s-replicas-2",
		},
		Configs: structs.Configs{
			"password": {
				Label: "Senha",
				Path:  "auth.password",
				Size:  16,
			},
		},
	},
}

func int32Ptr(i int32) *int32 {
	return &i
}
