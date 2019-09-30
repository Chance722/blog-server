import adminService from '../services/admin'
import { BaseContext } from 'koa'

export default class AdminController {

  /**
   * @description 注册
   */ 
  public static regist (ctx: BaseContext) {
    return adminService.regist(ctx)
  }

  /**
   * @description 登录
   */
  public static login (ctx: BaseContext) {
    return adminService.login(ctx)
  }

  /**
   * @description 修改密码
   */
  public static savePwd (ctx: BaseContext) {
    return adminService.savePwd(ctx)
  }

  /**
   * @description 获取设置
   */
  public static getInfo (ctx: BaseContext) {
    return adminService.getInfo(ctx)
  }

  /**
   * 
   * @description 更新配置
   */
  public static updateInfo (ctx: BaseContext) {
    return adminService.updateInfo(ctx)
  }

}