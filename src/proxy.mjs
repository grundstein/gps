import https from 'https'
import http from 'http'

import { log } from '@grundstein/commons'

import { respond } from '@grundstein/commons/lib.mjs'

import { proxyRequest } from './proxyRequest.mjs'

// import memStore from '@grundstein/mem-store'

const libName = '@grundstein/gps.proxy'

export const proxy = config => async (req, res) => {
  const startTime = process.hrtime()

  try {
    await proxyRequest(req, res, config)
  } catch (e) {
    log.error(e)
  }
}

export default proxy
