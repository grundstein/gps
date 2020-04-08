import http from 'http'

import log from '@magic/log'

import handler from './handler.mjs'
import hosts from './hosts.mjs'

export const run = async (config = {}) => {
  const startTime = log.hrtime()

  const { args = {} } = config

  const { port = 23230, host = '127.0.0.1', dir = 'static/public' } = args

  try {
    const hostString = JSON.stringify(hosts, null, 2)

    const server = http.createServer(handler(hostString))

    server.on('clientError', (err, socket) => {
      socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
    })

    server.listen(port, host, () => {
      const timeToListen = process.hrtime(startTime)

      log.success('Mainthread started', `pid: ${process.pid}`)
      log(`server listening to ${host}:${port}`)

      log.timeTaken(startTime, 'startup needed:')
    })
  } catch (e) {
    log.error(e)
    process.exit(1)
  }
}

export default run
