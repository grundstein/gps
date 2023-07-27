#!/usr/bin/env node

import { cli } from '@grundstein/commons'

import run from './index.mjs'

const opts = {
  options: [
    ['--host', '--ip', '-H'],
    ['--port', '-p', '-P'],
    ['--static-host'],
    ['--static-port'],
    ['--api-host'],
    ['--api-port'],
    ['--api-root'],
    ['--cert-dir', '--cert', '-c'],
  ],
  default: {
    '--host': '0.0.0.0',
    '--port': 4343,
    '--static-host': 'localhost',
    '--static-port': 2350,
    '--api-host': 'localhost',
    '--api-port': 2351,
    '--api-root': '/',
    // '--cert-dir': '/etc/letsencrypt/live',
  },
  single: [
    '--host',
    '--port',
    '--static-host',
    '--static-port',
    '--api-host',
    '--api-port',
    '--api-root',
    '--cert-dir',
  ],
  help: {
    name: 'gps: grundstein proxy/positioning server',
    header: 'load balancer. public app entry point. single point of failure.',
    options: {
      '--host': 'hostname to listen to',
      '--port': 'port to listen to',
      '--static-host': 'host the proxied static server listens to',
      '--static-port': 'port the proxied static server listens to',
      '--api-host': 'host the proxied api listens to',
      '--api-port': 'port the proxied api listens to',
      '--api-root': 'root path of the api',
      '--cert-dir': 'directory with ssl ca',
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
