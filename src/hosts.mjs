export const gps = { host: '127.0.0.1', port: 5230, name: 'grundstein positioning service' }
export const grs = { host: '127.0.0.1', port: 5231, name: 'grundstein redirection service' }
export const gul = { host: '127.0.0.1', port: 5232, name: 'grundstein universal logger' }
export const ghc = { host: '127.0.0.1', port: 5233, name: 'grundstein health checker' }

export const gms = { host: '127.0.0.1', port: 2350, name: 'grundstein magic server' }
export const gas = { host: '127.0.0.1', port: 2351, name: 'grundstein api server' }
export const gss = { host: '127.0.0.1', port: 2352, name: 'grundstein static server' }
export const gbs = { host: '127.0.0.1', port: 2353, name: 'grundstein build service' }

export const pods = {
  '127.0.0.1': {
    'dev.grundstein.it': {
      services: ['gms', 'gas'],
      git: {
        org: 'grundstein',
        repo: 'grundstein.it',
        branch: 'master',
      },
    },
    'test.dev.grundstein.it': {
      services: ['gms'],
      git: {
        org: 'grundstein',
        repo: 'grundstein.it',
        branch: 'master',
      },
    },
  },
}
