import * as qn from 'qn'
import { Context } from 'koa'
import CONFIG from '../../config'

const client = qn.create(CONFIG.QINIU)

export default class QiniuController {
  public static async getToken (ctx: Context) {
    ctx.success({ token: client.uploadToken() }, '获取成功')
  }
}
