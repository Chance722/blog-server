import * as http from 'http'
import * as Koa from 'koa'
import * as views from 'koa-views'
import * as json from 'koa-json'
import * as bodyparser from 'koa-bodyparser'
import * as logger from 'koa-logger'
import * as cors from 'koa2-cors'
import * as jwt from 'koa-jwt'
import config from './config'
import routes from './routes'
import interceptor from './middlewares/interceptor'
import responseMiddleWare from './middlewares/response'
import errorMiddleWare from './middlewares/error'


const secret = config.TOKEN_SECRET

const app = new Koa()

// middlewares
app.use(responseMiddleWare)
app.use(errorMiddleWare)
app.use(interceptor)
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(cors())

// logger
app.use(async (ctx: Koa.Context, next: Function) => {
  const start: number = + new Date()
  await next()
  const ms = + new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


// jwt 数组中的路径不需要通过jwt验证
// 不需鉴权的路由: admin部分路由, nuxt-blog路由, 页面资源请求(如: /favicon.ico 等等)
// app.use(jwt({ secret }).unless({
//   path: [/^\/api\/admin\/login/, /^\/api\/admin\/regist/, /^\/api\/blog/, /^((?!\/api).)*$/]
// }))
app.use(jwt({ secret }).unless({
  path: [/^\/api/, /^((?!\/api).)*$/]
}))

// routes
app.use(routes.routes())
  .use(routes.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

http.createServer(app.callback()).listen(config.APP.PORT, () => {
  console.log(`node-Koa Run! port at ${config.APP.PORT}`)
})

