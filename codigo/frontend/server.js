const next = require('next')
const express = require('express')
const { createProxyMiddleware } = require("http-proxy-middleware")

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const apiPaths = {
  '/api-client': {
    target: `http://${process.env.NEXT_PUBLIC_API_HOST}`,
    pathRewrite: {
      '^/api-client': ''
    },
    changeOrigin: true
  }
}

const isDevelopment = process.env.NODE_ENV !== 'production'

app.prepare().then(() => {
  const server = express()

  if (isDevelopment) {
    server.use('/api-client', createProxyMiddleware(apiPaths['/api-client']));
  }

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
  })
}).catch(err => {
  console.error('Error:::::', err)
})