import path from 'path'

import http from 'http'
import https from 'https'

import { fs, log, middleware } from '@grundstein/commons'

import { createServer } from '@grundstein/commons/lib.mjs'

import proxy from './proxy.mjs'

export const gps = async (config = {}) => {
  try {
    config.startTime = log.hrtime()

    const server = await createServer(config, proxy(config))

    server.on('connection', socket => {
      socket.setNoDelay(true)
    })
  } catch (e) {
    log.error(e)
    process.exit(1)
  }
}

export default gps
