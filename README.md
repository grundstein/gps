## @grundstein/gps

**g**rundstein **p**roxy **s**erver

### WIP. NOT FULLY AUTOMATED, TESTED AND BENCHMARKED YET!

### features:

#### 404/500 fallback

* serves 404 page if services are down.
* serves 50+ error pages if services error.

#### proxy

publicly proxies various services:

##### working:
* [gss](https://github.com/grundstein/gss)
  static service - serves bigger static files via cdn instead of gms
* [grs](https://github.com/grundstein/grs)
  redirects http to https as well as www.domain.name to domain.name

##### wip:
* [gas](https://github.com/grundstein/gas)
  WIP api service - serves apis for all hosted magic pages.
* [ghs](https://github.com/grundstein/ghs)
  WIP health service - serves health status pages for all hosted pages
* [gul](https://github.com/grundstein/gul)
  WIP universal logger - serves logs for all hosted pages, both via rest api and static html.
* ...

#### installation
```bash
npm i -g @grundstein/gps
```

#### usage
```bash
// show full help
gps --help

// run full gps service on https://127.0.0.1:4343
gps

// serve on specific host and port
gps --host grundstein.it --port 443
```

#### changelog

##### v0.0.1
first release

##### v0.0.2
update dependencies

##### v0.0.3
update @grundstein/commons to make sure createSecureContext works

##### v0.0.4
update dependencies

#### v0.0.5 - unreleased
...
