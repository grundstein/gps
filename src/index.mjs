import path from 'path'

import http from 'http'
import https from 'https'

import { fs, log, middleware } from '@grundstein/commons'

import { createServer } from '@grundstein/commons/lib.mjs'

import handler from './handler.mjs'

export const gps = async (config = {}) => {
  try {
    config.startTime = log.hrtime()

    const server = await createServer(config, handler(config))

    server.on('connection', socket => {
      socket.setNoDelay(true)
    })
  } catch (e) {
    log.error(e)
    process.exit(1)
  }
}

export default gps
