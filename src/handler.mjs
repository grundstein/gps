import { lib, log } from '@grundstein/commons'

export const handler = string => (req, res) => {
  const startTime = log.hrtime()

  lib.respond(res, { code: 200, body: string })

  log.timeTaken(startTime, 'hosts file response took')
}

export default handler
