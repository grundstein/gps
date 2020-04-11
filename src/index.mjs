import { log } from '@grundstein/commons'

import proxy from './proxy.mjs'
import server from './server.mjs'

export const gps = async (config = {}) => {
  try {
    const startTime = log.hrtime()

    const { host = '127.0.0.1' } = config

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

    // run the proxy on port 443
    proxy(config)
    // run the redirection server on port 80
    server(config)
  } catch (e) {
    log.error(e)
    process.exit(1)
  }
}

export default gps
