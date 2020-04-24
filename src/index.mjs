import path from 'path'

import http from 'http'
import https from 'https'

import { fs, log, middleware } from '@grundstein/commons'

import proxy from './proxy.mjs'

export const gps = async (config = {}) => {
  try {
    const startTime = log.hrtime()

    const { host = '0.0.0.0', port = 4343 } = config

    const cwd = process.cwd()
    const certDir = path.join(cwd, 'certificates')

    let connector = http

    const options = {}

    const privCertFile = path.join(certDir, 'priv.pem')
    const pubCertFile = path.join(certDir, 'pub.pem')

    try {
      options.key = await fs.readFile(privCertFile)
      options.cert = await fs.readFile(pubCertFile)
      connector = https
    } catch(e) {
       if (e.code !== 'ENOENT') {
         throw e
       }
    }

    const server = connector.createServer(options, proxy)

    server.on('connection', socket => {
      socket.setNoDelay(true)
    })

    const listener = middleware.listener({ host, port, startTime })
    server.listen(port, host, listener)
  } catch (e) {
    log.error(e)
    process.exit(1)
  }
}

export default gps
