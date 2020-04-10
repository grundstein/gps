#!/usr/bin/env node

import cli from '@magic/cli'

import run from './server.mjs'

const args = {
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
      '--host': 'internal hostname to listen to, default grundstein',
      '--port': 'port, default 8080',
    },
    example: `
# run proxy and positioning services:
gps

# serve files using an absolute path, a custom host and port 80
gms --host grundstein.it --port 443
`,
  },
}

const res = cli(args)

run(res)
