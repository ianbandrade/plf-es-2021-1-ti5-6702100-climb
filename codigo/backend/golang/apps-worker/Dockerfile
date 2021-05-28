FROM golang:1.16.3-alpine3.13

WORKDIR /go/src/app

RUN go get github.com/githubnemo/CompileDaemon

ENV CGO_ENABLED 0

ENTRYPOINT CompileDaemon --command=app \
    --build="go build -o /go/bin/app"
