#!/usr/bin/env node

import { cli } from '@grundstein/commons'

import run from './index.mjs'

const opts = {
  options: [
    ['--help', '-help', 'help', '--h', '-h'],
    ['--host', '-h'],
    ['--port', '-p'],
    ['--proxy-host'],
    ['--proxy-port'],
  ],
  default: {
    '--host': '0.0.0.0',
    '--port': 4343,
    '--proxy-host': 'localhost',
    '--proxy-port': 2350,
  },
  single: ['--host', '--port'],
  help: {
    name: 'gps: grundstein proxy/positioning server',
    header: 'load balancer. public app entry point. single point of failure.',
    options: {
      '--host': 'hostname to listen to',
      '--port': 'port to listen to',
      '--proxy-host': 'host the proxied server listens to',
      '--proxy-port': 'port the proxied server listens to',
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
