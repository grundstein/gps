import { lib } from '@grundstein/commons'

export const handler = string => (req, res) => {
  lib.respond(res, { code: 200, body: string })
}

export default handler
