#!/bin/sh

PATH=${PATH}:$HOME/app/node_modules/.bin

DB_HOST=${DATABASE_HOST:?}
DB_PORT=${DATABASE_PORT:?}

REDIS_HOST=${REDIS_HOST:?}
REDIS_PORT=${REDIS_PORT:?}

AMPQ_HOST=${AMPQ_HOST:?}
AMPQ_PORT=${AMPQ_PORT:?}

until nc -z ${DB_HOST} ${DB_PORT}; do
  until nc -z ${REDIS_HOST} ${REDIS_PORT}; do
    until nc -z ${AMPQ_HOST} ${AMPQ_PORT}; do
      sleep 0.1
    done
  done
done

yarn install --silent

exec "$@"
