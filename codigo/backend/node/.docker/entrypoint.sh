#!/bin/sh

PATH=${PATH}:$HOME/app/node_modules/.bin

DB_HOST=${DATABASE_HOST:?}
DB_PORT=${DATABASE_PORT:?}

until nc -z ${DB_HOST} ${DB_PORT}; do
  sleep 0.1
done

yarn install --silent

exec "$@"
