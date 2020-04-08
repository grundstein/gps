export const hosts = {
  gps: { host: '127.0.0.1', port: 5230, name: 'grundstein positioning service' },
  grs: { host: '127.0.0.1', port: 5231, name: 'grundstein redirection service' },
  gul: { host: '127.0.0.1', port: 5232, name: 'grundstein universal logger' },
  ghc: { host: '127.0.0.1', port: 5233, name: 'grundstein health checker' },

  gms: { host: '127.0.0.1', port: 2350, name: 'grundstein magic server' },
  gas: { host: '127.0.0.1', port: 2351, name: 'grundstein api server' },
  gss: { host: '127.0.0.1', port: 2352, name: 'grundstein static server' },
  gbs: { host: '127.0.0.1', port: 2353, name: 'grundstein build service' },
}

export default hosts
