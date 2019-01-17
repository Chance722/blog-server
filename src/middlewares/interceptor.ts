import { BaseContext } from 'koa'

export default async (ctx: BaseContext, next: () => Promise<any>) => {
  // 拦截器
  const allowedOrigins = ['https://chance722.me', 'https://admin.chance722.me', 'file://']
  const origin = ctx.request.headers.origin || ''
  if (allowedOrigins.includes(origin) || origin.includes('localhost') || origin.includes('127.0.0.1')) {
    ctx.set('Access-Control-Allow-Origin', origin)
  }
  ctx.set({
    'Access-Control-Allow-Headers': 'Authorization, Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With',
    'Access-Control-Allow-Methods': 'PUT,PATCH,POST,GET,DELETE,OPTIONS',
    'Access-Control-Max-Age': '1728000',
    'Content-Type': 'application/jsoncharset=utf-8',
    'X-Powered-By': 'my_blog 1.0.0'
  })

  // Options
  if (ctx.request.method === 'OPTIONS') {
    ctx.status = 200
    return false
  }

  // 生产环境 防止非法请求
  if (Object.is(process.env.NODE_ENV, 'production')) {
    const { referer, origin } = ctx.request.headers
    if (origin !== 'file://') {
      const isVerifyed = (!origin || origin.includes('chance722.me')) && (!referer || referer.includes('chance722.me'))
      if (!isVerifyed) {
        ctx.throw(403, { code: 0, message: '身份验证失败' })
        return false
      }
    }
  }

  await next()

}
