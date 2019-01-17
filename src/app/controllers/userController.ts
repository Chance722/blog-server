import userService from '../services/userService'

export default class UserController {
  /**
   * @param {string} name required
   * @param {string} email required
   * @param {string} ip
   * @param {string} homepage
   * @return null
   */
  public static addUser ({ name, email, ip, homepage }) {
    return userService.addUser({ name, email, ip, homepage })
  }

  /**
   * @param {string} name required
   * @param {string} email required
   * @return {userModel} user
   */
  public static getUser (name, email) {
    return userService.getUser(name, email)
  }

  /**
   * @param {number} status required
   * @param {string} name required
   * @param {string} email required
   * @return null
   */
  public static setStatus (ctx) {
    return userService.setStatus(ctx)
  }
}
