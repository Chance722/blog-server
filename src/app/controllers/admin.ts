import adminService from '../services/admin'
import { BaseContext } from 'koa'

export default class AdminController {
  public static regist (ctx: BaseContext) {
    return adminService.regist(ctx)
  }
}