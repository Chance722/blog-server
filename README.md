[koa]: https://koajs.com
[koa-image]: https://img.shields.io/badge/Powered%20By-Koa-df0541.svg?style=flat-square
[blog-front]: https://github.com/Chance722/blog-front
[blog-admin]: https://github.com/Chance722/blog-admin

# blog-server

[![powered by koa][koa-image]][koa]
[![GitHub forks](https://img.shields.io/github/forks/Chance722/blog-server.svg?style=flat-square)](https://github.com/Chance722/blog-server/network/members)
[![GitHub stars](https://img.shields.io/github/stars/Chance722/blog-server.svg?style=flat-square)](https://github.com/Chance722/blog-server/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/Chance722/blog-server.svg?style=flat-square)](https://github.com/Chance722/blog-server/issues)


RESTful API server application for my personal blog

* Web client for user: [blog-front]([blog-front]) powered by [Nuxt.js@2](https://github.com/nuxt/nuxt.js)
* Web client for admin [blog-admin](https://github.com/Chance722/blog-admin) powered by Vue and element-ui
* Web client for server powered by koa and typescript

## Quick Start

### Environment Dependencies

- [mysql](https://www.mysql.com/)
- [pm2](http://pm2.keymetrics.io/)
- [typescript](http://www.typescriptlang.org/)

### Development

``` bash
$ npm install
$ npm run mysql
$ npm run dev
```

### Deploy

``` bash
$ npm run build
$ npm start
```

### npm scripts

- Use `npm run tslint` to check code style.
- Use `npm run mysql` to init your database.

## CHANGELOG

参见[CHANGLOG.md](https://github.com/Chance722/blog-server/blob/master/CHANGELOG.md)

