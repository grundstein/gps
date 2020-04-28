import https from 'https'
import http from 'http'

import { log } from '@grundstein/commons'

// import memStore from '@grundstein/mem-store'

const libName = '@grundstein/gps.proxy'

export const proxy = config => (req, res) => {
  const startTime = process.hrtime()

  const { proxyHost, proxyPort } = config

  const remoteOptions = {
    hostname: proxyHost,
    port: proxyPort,
    path: req.url,
  }

  http.get(remoteOptions, proxyRes => {
    proxyRes.pipe(res)

    // const response = []

    // proxyRes.on('data', chunk => {
    //   response.push(chunk)
    // })

    proxyRes.on('end', () => {
      log.timeTaken(startTime, `${libName} req end:`)
      // TODO: write response to mem-store
    })

    proxyRes.on('error', err => {
      log.error('E_UNKNOWN', err)
    })
  })
}

export default proxy
