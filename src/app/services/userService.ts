import dataHelpler from '../utils/dataHelper'
import userModel from '../models/user'

export default class UserService {

  public static async addUser ({ name, email, ip, homepage }) {
    const result = await userModel.create({
      name,
      email,
      ip,
      homepage,
      create_time: new Date().getTime()
    })
    return result
  }

  public static async getUser (name, email) {
    const user = await userModel.findOne({
      where: {
        name,
        email
      }
    })
    return user
  }

  public static async getUserById (id) {
    return await userModel.findOne({ where: { id } })
  }

  public static async setStatus (ctx) {
    const { id, status } = ctx.request.body
    if (dataHelpler.isEmpty(id, status)) {
      ctx.fail(422, '参数不能为空')
      return
    }
    const user = this.getUserById(id)
    if (!user) {
      ctx.fail('用户不存在')
      return
    }
    const result = await userModel.update({ status }, { where: { id } })
    if (result) ctx.success('设置成功')
    else ctx.fail('设置失败')
  }
}
