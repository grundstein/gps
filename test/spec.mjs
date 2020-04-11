import { is } from '@magic/test'

import defaultRunCluster, { run } from '../src/index.mjs'

import handler from '../src/handler.mjs'

export default [
  { fn: () => run, expect: is.fn, info: 'runCluster is a function' },
  { fn: () => defaultRunCluster, expect: is.fn, info: 'runCluster default export is a function' },
  { fn: is.deep.eq(run, defaultRunCluster), info: 'runCluster exports are equal' },

  { fn: is.fn(handler), info: 'handler is a function' },
]
