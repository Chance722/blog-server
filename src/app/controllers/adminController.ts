import adminService from '../services/adminService'

export default class AdminController {

  /**
   * @param {string} name
   * @param {string} pwd
   * @return {object} { id, token }
   */
  public static login (ctx) {
    return adminService.login(ctx)
  }

  /**
   * @param {string} name
   * @param {string} pwd
   * @return null
   */
  public static regist (ctx) {
    return adminService.regist(ctx)
  }

  /**
   * @param {string} blog_title
   * @param {string} page_title
   * @param {string} keywords
   * @param {string} blog_address
   * @param {string} blog_desc
   * @param {string} email
   * @param {string} icp_numbers
   * @return null
   */
  public static saveBaseInfo (ctx) {
    return adminService.saveBaseInfo(ctx)
  }

  /**
   * @param {string} name
   * @param {string} nickname
   * @param {string} signature
   * @param {string} new_pwd
   * @param {string} old_pwd
   * @param {string} confirm_pwd
   * @param {string} avator
   * @return null
   */
  public static saveUserInfo (ctx) {
    return adminService.saveUserInfo(ctx)
  }

  /**
   * @param null
   * @return {object}
   */
  public static getSettingInfo (ctx) {
    return adminService.getSettingInfo(ctx)
  }

}
