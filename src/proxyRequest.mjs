import http from 'http'

import { lib, log } from '@grundstein/commons'

const libName = '@grundstein/gps.proxyRequest'

export const proxyRequest = (req, res, config) => {
  const { hostname: proxiedHost, staticHost, staticPort, apiHost, apiPort, apiRoot, time } = config

  let hostname = staticHost
  let port = staticPort
  let path = req.url
  const root = apiRoot.startsWith('/') ? apiRoot : `/${apiRoot}`

  const isApiHost = proxiedHost === apiHost
  const isApiPath = proxiedHost.startsWith('api.') || path.startsWith('/api')

  if (isApiHost && isApiPath) {
    hostname = apiHost
    port = apiPort

    if (path.startsWith(root)) {
      path = path.substring(root.length)
    }
  }

  const remoteOptions = {
    hostname,
    port,
    path,
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
      }),
  )
}
