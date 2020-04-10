## @grundstein/gps

### WIP. NOT IN PRODUCTION, TESTED AND/OR BENCHMARKED YET!

### gps: grundstein proxy/positioning server

### features:

#### central config "database"
serves /config/ which responds with a json file including all grundstein services and their config.

#### 404/500 fallback

* serves 404 page if services are down.
* serves 50+ error pages if services error.

#### proxy

publicly proxies various services:

* [gms](https://github.com/grundstein/gms)
  magic service - serves all static files for magic pages from memory.
* [gas](https://github.com/grundstein/gas)
  api service - serves apis for all hosted magic pages.
* [gss](https://github.com/grundstein/gss)
  WIP static service - serves bigger static files via cdn instead of gms
* [ghs](https://github.com/grundstein/ghs)
  WIP health service - serves health status pages for all hosted pages
* [gul](https://github.com/grundstein/gul)
  WIP universal logger - serves logs for all hosted pages, both via rest api and static html.
* [...]

#### installation
```bash
npm i -g @grundstein/gps
```

#### usage
```bash
// show full help
gps --help

// run full gps service on https://127.0.0.1:4443
gps

// serve on specific host and port
grs --host grundstein.it --port 443
```
