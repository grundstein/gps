import http from 'http'

import { middleware } from '@grundstein/commons'

import handler from './handler.mjs'

export const server = (config) => {
  const server = http.createServer(handler(config))

  const clientError = middleware.clientError({ host, port: 80, startTime })
  server.on('clientError', clientError)

  const listener = middleware.listener({ host, port: 80, startTime })
  server.listen(port, host, listener)

  return server
}

export default server
