import http from 'http'

import { log } from '@grundstein/commons'

import handler from './handler.mjs'
import hosts from './index.mjs'

const sortByPort = list => list.sort((a, b) => a.port - b.port)

export const run = async (config = {}) => {
  try {
    const startTime = log.hrtime()

    const { args = {} } = config

    const { port = 23230, host = '127.0.0.1' } = args

    // sort hosts by port
    const hostList = Object.entries(hosts).sort((([_, a], [_2, b]) => a.port - b.port))
    const sortedHosts = Object.fromEntries(hostList)

    // nicely format the string using JSON.stringify
    const hostString = JSON.stringify(sortedHosts, null, 2)

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
