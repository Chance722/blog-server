import { BaseContext } from 'koa'
import CONFIG from '../config'
const successMessage = CONFIG.CODE_MAP[200]
const failMessage = CONFIG.CODE_MAP[-1]

export default async (ctx: BaseContext, next: () => Promise<any>) => {
  ctx.success = (data: any = null , message: string = '') => {
    let result = data
    let resultMsg = message
    if (typeof data === 'string') {
      resultMsg = result
      result = null
    }
    ctx.status = 200
    ctx.body = {
      code: 200,
      success: true,
      message: resultMsg,
      data: result
    }
  }
  ctx.fail = (code: any = -1, message: string = '', error: any = null) => {
    let resultCode = code
    let resultMsg = message
    const resultErr = error
    if (typeof code === 'string') {
      resultMsg = code
      resultCode = -1
    }
    const body = {
      code: resultCode,
      success: false,
      message: resultMsg || CONFIG.CODE_MAP[resultCode] || failMessage,
      error
    }
    ctx.status = resultCode === -1 ? 200 : resultCode
    ctx.body = body
  }

  await next()

}
