#!/usr/bin/env node

import { cli, lib } from '@grundstein/commons'

import run from './index.mjs'
import { defaults } from './defaults.mjs'

const {
  GPS_HOST = defaults.host,
  GPS_PORT = defaults.port,
  GPS_STATIC_HOST = defaults.staticHost,
  GPS_STATIC_PORT = defaults.staticPort,
  GPS_API_HOST = defaults.apiHost,
  GPS_API_PORT = defaults.apiPort,
  GPS_API_ROOT = defaults.apiRoot,
} = await lib.addEnv()

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
    '--host': GPS_HOST,
    '--port': GPS_PORT,
    '--static-host': GPS_STATIC_HOST,
    '--static-port': GPS_STATIC_PORT,
    '--api-host': GPS_API_HOST,
    '--api-port': GPS_API_PORT,
    '--api-root': GPS_API_ROOT,
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
