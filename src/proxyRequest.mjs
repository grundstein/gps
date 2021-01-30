import http from 'http'

import { log } from '@grundstein/commons'
import { respond } from '@grundstein/commons/lib.mjs'

const libName = '@grundstein/gps.proxyRequest'

export const proxyRequest = (req, res, config) => {
  const { hostname: proxiedHost, staticHost, staticPort, apiHost, apiPort, time } = config

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
      ...req.headers,
      'x-forwarded-for': proxiedHost,
    },
  }

  return new Promise((resolve, reject) => {
    const responder = http.get(remoteOptions, proxyRes => {
      const { statusCode, headers } = proxyRes
      res.writeHead(statusCode, headers)

      proxyRes.pipe(res)

      proxyRes.on('end', () => {
        log.timeTaken(time, `${libName} req end:`)
      
        proxyRes.unpipe(res)

        resolve()
      })

      proxyRes.on('error', e => {
        log.error(`${libName} req error: ${e}`)

        proxyRes.unpipe(res)

        reject(e)
      })
    })

    responder.on('error', e => {
      respond(req, res, { body: '500 - proxy error.', code: 500 })

      proxyRes.unpipe(res)

      reject(e)
    })
  })
}
