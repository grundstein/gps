import https from 'https'
import http from 'http'

import { log } from '@grundstein/commons'

import { respond } from '@grundstein/commons/lib.mjs'

import { proxyRequest } from './proxyRequest.mjs'

// import memStore from '@grundstein/mem-store'

export const handler = config => async (req, res) => {
  const startTime = process.hrtime()

  try {
    await proxyRequest(req, res, { ...config, startTime })
  } catch (e) {
    log.error(e)
  }
}

export default handler
