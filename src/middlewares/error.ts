import { BaseContext } from 'koa'
import CONFIG from '../config'

export default async (ctx: BaseContext, next: () => Promise<any>) => {
  try {
    await next()
  } catch (err) {
    let code = err.status || 500
    if (code === 200) code = -1
    let message = ''
    if (Object.is(process.env.NODE_ENV, 'production')) {
      // 生产环境 则返回配置的code信息
      message = CONFIG.CODE_MAP[code]
    } else {
      // 开发环境下 则返回实际错误信息
      message = err.message
    }
    ctx.fail(code, message, err.errors)
  }
}
