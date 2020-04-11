import http from 'http'

import { log, middleware } from '@grundstein/commons'

import handler from './handler.mjs'

export const run = async (config = {}) => {
  try {
    const startTime = log.hrtime()

    const { host = '127.0.0.1', port = 4443 } = config

    if (!config.hosts) {
      log.error('No hosts specified. grundstein does not know what to do.')
      process.exit(0)
    }

    if (!config.repos) {
      log.error('No repos specified. grundstein does not know what to do.')
      process.exit(0)
    }

    config.repoBody = JSON.stringify(config.repos, null, 2)
    config.hostBody = JSON.stringify(config.hosts, null, 2)

    const server = http.createServer(handler(config))

    const clientError = middleware.clientError({ host, port, startTime })
    server.on('clientError', clientError)

    const listener = middleware.listener({ host, port, startTime })
    server.listen(port, host, listener)
  } catch (e) {
    log.error(e)
    process.exit(1)
  }
}

export default run
