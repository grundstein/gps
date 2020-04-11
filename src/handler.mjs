import { lib, log } from '@grundstein/commons'

export const handler = config => (req, res) => {
  const time = log.hrtime()

  if (req.url === '/hosts' || req.url === '/hosts/') {
    lib.respond(req, res, { code: 200, body: config.hostBody, time })
    return
  }

  if (req.url === '/repos' || req.url === '/repos/') {
    lib.respond(req, res, { code: 200, body: config.repoBody, time });
  }

  lib.respond(req, res, { code: 404, body: '404 - not found', time })
}

export default handler
