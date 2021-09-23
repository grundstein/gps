import { lib, log } from '@grundstein/commons'

import { proxyRequest } from './proxyRequest.mjs'

export const handler = config => async (req, res) => {
  const time = log.hrtime()

  let hostname = lib.getHostname(req)

  // strip www from the domain
  if (hostname.startsWith('www.')) {
    hostname = hostname.replace('www.', '')

    res.writeHead(302, {
      Location: `https://${hostname}${req.url}`,
    })

    log.server.request(req, res, { type: 'www redirect', time })
    res.end()
    return
  }

  try {
    await proxyRequest(req, res, { ...config, hostname, time })
  } catch (e) {
    log.error(e)
    res.end()
  }
}

export default handler
