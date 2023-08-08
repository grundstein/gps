import path from 'node:path'

export const defaults = {
  host: '0.0.0.0',
  port: 4343,
  staticHost: 'localhost',
  staticPort: 2350,
  apiHost: 'localhost',
  apiPort: 2351,
  apiRoot: '/',
  certDir: path.join(
    process.cwd(),
    'node_modules',
    '@grundstein',
    'commons',
    'src',
    'certificates',
  ),
}
