import http from 'http'

import { log } from '@grundstein/commons'
import { formatLog, getHostname, respond } from '@grundstein/commons/lib.mjs'

const libName = '@grundstein/gps.proxyRequest'

export const proxyRequest = (req, res, config) => {
  const { hostname, proxyHost, proxyPort, startTime } = config

  const remoteOptions = {
    hostname: proxyHost,
    port: proxyPort,
    path: req.url,
    headers: {
      'x-forwarded-for': hostname,
    },
  }

  return new Promise((resolve, reject) => {
    const responder = http.get(remoteOptions, proxyRes => {
      proxyRes.pipe(res)

      // const response = []

      // proxyRes.on('data', chunk => {
      //   response.push(chunk)
      // })

      proxyRes.on('end', () => {
        log.timeTaken(startTime, `${libName} req end:`)
        // TODO: write response to mem-store
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
