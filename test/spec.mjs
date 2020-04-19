import { is } from '@magic/test'

import defaultGps, { gps } from '../src/index.mjs'

export default [
  { fn: () => gps, expect: is.fn, info: 'gps is a function' },
  { fn: () => defaultGps, expect: is.fn, info: 'gps default export is a function' },
  { fn: is.deep.eq(gps, defaultGps), info: 'defaultGps and gps exports are equal' },
]
