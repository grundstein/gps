import http from 'http'

import { log } from '@grundstein/commons'
import { formatLog, getHostname, respond } from '@grundstein/commons/lib.mjs'

const libName = '@grundstein/gps.proxyRequest'

export const proxyRequest = (req, res, config) => {
  const { hostname: proxiedHost, staticHost, staticPort, apiHost, apiPort, startTime } = config

  let hostname = staticHost
  let port = staticPort

  if (proxiedHost.startsWith('api.')) {
    hostname = apiHost
    port = apiPort
  }

  const remoteOptions = {
    hostname,
    port,
    path: req.url,
    headers: {
      'x-forwarded-for': proxiedHost,
    },
  }

  return new Promise((resolve, reject) => {
    const responder = http.get(remoteOptions, proxyRes => {
      proxyRes.pipe(res)

      // TODO: write response to mem-store for caching. only do so for static files!

      // const response = []

      // proxyRes.on('data', chunk => {
      //   response.push(chunk)
      // })

      proxyRes.on('end', () => {
        log.timeTaken(startTime, `${libName} req end:`)
        resolve()
      })

      proxyRes.on('error', e => {
        reject(e)
      })
    })

    responder.on('error', e => {
      respond(req, res, { body: '500 - proxy error.', code: 500 })
      reject(e)
    })
  })
}
