import http2 from 'node:http2'

import { lib, log } from '@grundstein/commons'

const { HTTP2_HEADER_PATH, HTTP2_HEADER_LOCATION, HTTP2_HEADER_STATUS } = http2.constants

export const handler = config => {
  const { host: proxiedHost, staticHost, staticPort, apiHost, apiPort, apiRoot = '/' } = config

  return async (stream, headers) => {
    let host = staticHost
    let port = staticPort
    let url = headers[HTTP2_HEADER_PATH] || '/'

    let hostname = lib.getHostname(headers)

    if (hostname.startsWith('www.')) {
      const cleanHostname = hostname.slice(4)

      stream.respond({
        [HTTP2_HEADER_STATUS]: 302,
        [HTTP2_HEADER_LOCATION]: `https://${cleanHostname}${url}`
      })

      stream.end()
      return
    }

    const root = apiRoot.startsWith('/') ? apiRoot : `/${apiRoot}`

    const isApiHost = proxiedHost === apiHost
    const isApiSubdomain = proxiedHost.startsWith('api.')
    const isApiPath = apiRoot !== '/' && url.startsWith(apiRoot)

    if (isApiHost && isApiSubdomain && isApiPath) {
      host = apiHost
      port = apiPort

      if (url.startsWith(root)) {
        url = url.substring(root.length)
      }
    }

    const client = http2.connect(`https://${host}:${port}`)
    client.on('error', err => log.server.error(err.code, err.msg))

    const req = client.request({
      ...headers,
      // ':authority': 'grundstein',
      // [http2.constants.HTTP2_HEADER_PATH]: '/',
      'x-forwarded-for': lib.getClientIp(stream, headers),
    })

    req.on('response', head => {
      stream.respond(head)
    })

    req.setEncoding('utf8')

    let data = ''
    req.on('data', chunk => {
      data += chunk
    })

    req.on('end', () => {
      stream.end(data)
      client.close()
    })

    req.on('error', e => {
      log.server.error(e.code, e.msg)
    })

    req.end()
  }
}

export default handler
