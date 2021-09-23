import http from 'http'

import { lib, log } from '@grundstein/commons'

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
      'x-forwarded-for': lib.getClientIp(req),
    },
  }

  return new Promise((resolve, reject) =>
    http
      .get(remoteOptions, proxyRes => {
        const { statusCode, headers } = proxyRes
        res.writeHead(statusCode, headers)

        proxyRes.pipe(res)

        proxyRes.on('end', () => {
          log.timeTaken(time, `${libName} req end:`)

          proxyRes.unpipe(res)
          proxyRes.destroy()

          resolve({ proxyRes })
        })

        proxyRes.on('error', e => {
          log.timeTaken(time, `${libName} proxyRes error: ${e.message}`)

          proxyRes.unpipe(res)
          proxyRes.destroy()

          res.end()

          reject(e)
        })
      })
      .on('error', e => {
        lib.respond(req, res, { body: '500 - proxy error.', code: 500 })
        reject(e)
      })
  )
}
