#!/usr/bin/env node

import cli from '@magic/cli'

import run from './server.mjs'

const opts = {
  options: [
    ['--help', '-help', 'help', '--h', '-h'],
    ['--host', '-h'],
    ['--port', '-p'],
  ],
  default: {
    '--host': '127.0.0.1',
    '--port': 4443,
  },
  single: ['--host', '--port'],
  help: {
    name: 'gps: grundstein proxy/positioning server',
    header: 'load balancer. public app entry point. single point of failure.',
    options: {
      '--host': 'internal hostname to listen to, default 127.0.0.1',
      '--port': 'port, default 4443',
    },
    example: `
# run proxy and positioning services:
gps

# serve files using an absolute path, a custom host and port 443.
gps --host grundstein.it --port 443
`,
  },
}

const { args } = cli(opts)

run(args)
