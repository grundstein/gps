import http from 'http'

import log from '@magic/log'
import { formatLog, respond } from '@grundstein/commons/lib.mjs'

const libName = '@grundstein/gps.proxy'

export const proxyRequest = (req, res, config) => {
  const { proxyHost, proxyPort, startTime } = config

  const remoteOptions = {
    hostname: proxyHost,
    port: proxyPort,
    path: req.url,
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
