import { log } from '@grundstein/commons'

import { /* formatLog, */ getHostname } from '@grundstein/commons/lib.mjs'

import { proxyRequest } from './proxyRequest.mjs'

// import memStore from '@grundstein/mem-store'

export const handler = config => async (req, res) => {
  const time = process.hrtime()

  let hostname = getHostname(req)

  // strip www from the domain
  if (hostname.startsWith('www.')) {
    hostname = hostname.replace('www.', '')

    res.writeHead(302, {
      Location: `https://${hostname}${req.url}`,
    })

    // formatLog(req, res, { type: 'www redirect', time: log.hrtime() })
    res.end()
    return
  }

  try {
    await proxyRequest(req, res, { ...config, hostname, time })
  } catch (e) {
    log.error(e)
  }
}

export default handler
