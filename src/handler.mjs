import { log } from '@grundstein/commons'

import { /* formatLog, */ getHostname, respond } from '@grundstein/commons/lib.mjs'

import { proxyRequest } from './proxyRequest.mjs'

// import memStore from '@grundstein/mem-store'

export const handler = config => async (req, res) => {
  if (!req.url.startsWith('/') || req.url.includes('://')) {
    respond(req, res, {
      body: '418 - I am a Teapot',
      code: 418,
      type: 'teapot-response',
    })

    return
  }

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
