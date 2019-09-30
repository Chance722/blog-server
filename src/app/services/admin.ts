import dataHelper from '../utils/dataHelper'
import adminInterface from '../interfaces/admin'
import * as crypto from 'crypto'
import * as jsonWebToken from 'jsonwebtoken'
import config from '../../config'
import { Admin } from '../../db/entity/admin'
import { getConnection } from 'typeorm'
import { BaseContext } from 'koa'

const md5Decode = (pwd: string) => {
  return crypto.createHash('md5').update(pwd).digest('hex')
}

export default class AdminService {

  /**
   * @description 注册
   * @param {string} ctx.query.name 用户名
   * @param {string} ctx.query.pwd 密码
   */ 
  public static async regist (ctx: BaseContext) {
    const { name, pwd }: adminInterface.RegistParam = ctx.query
    if (dataHelper.isEmpty(name, pwd)) return ctx.fail(422, '参数不能为空')
    const adminRepository = await getConnection().getRepository(Admin)
    const crypto_pwd = md5Decode(pwd)
    const admin = await adminRepository.findOne({
      name,
      pwd: crypto_pwd,
    })
    if (admin) return ctx.fail('已存在同名账号')
    const reg_time = new Date().getTime()
    const user_name = { jWtUSeRNamE: name }
    const token = jsonWebToken.sign(user_name, config.TOKEN_SECRET, { expiresIn: 3600 })
    const adminModel = new Admin()
    adminModel.name = name
    adminModel.pwd = crypto_pwd
    adminModel.reg_time = reg_time
    adminModel.token = token
    const result = await adminRepository.save(adminModel)
    if (result) ctx.success('注册成功')
    else ctx.fail('注册失败')
  }

  /**
   * @description 登录
   * @param {string} ctx.request.body.name 用户名
   * @param {string} ctx.request.body.pwd 密码
   */
  public static async login (ctx: BaseContext) {
    const { name, pwd } = ctx.request.body
    if (dataHelper.isEmpty(name, pwd)) return ctx.fail(422, '参数不能为空')
    const adminRepository = await getConnection().getRepository(Admin)
    const crypto_pwd = md5Decode(pwd)
    const admin = await adminRepository.findOne({
      name,
      pwd: crypto_pwd,
    })
    if (!admin) return ctx.fail('账号或密码错误')
    const user_name = { jWtUSeRNamE: name }
    const token = jsonWebToken.sign(user_name, config.TOKEN_SECRET, { expiresIn: 3600 })
    const adminModel = await adminRepository.findOne(admin.id)
    adminModel.token = token
    adminModel.last_login_time = new Date().getTime()
    const result = await adminRepository.save(adminModel)
    if (result) ctx.success({ id: result.id, token, name, avatar: result.avatar }, '登录成功')
    else ctx.fail('登录失败')
  }

  /**
   * @description 修改密码
   * @param {string} ctx.request.body.new_pwd 新密码
   * @param {string} ctx.request.body.old_pwd 旧密码
   * @param {string} ctx.request.body.pwd 确认密码
   */
  public static async savePwd (ctx: BaseContext) {
    const token = ctx.header.authorization
    const { new_pwd, old_pwd, pwd } = ctx.request.body
    console.log('pwd: ', pwd)
    if (dataHelper.isEmpty(new_pwd, old_pwd, pwd)) return ctx.fail('密码不能为空')
    if (new_pwd !== pwd) return ctx.fail(422, '两次密码不一致')
    const adminRepository = await getConnection().getRepository(Admin)
    const adminModel = await adminRepository.findOne({
      token,
    })
    if (!adminModel) return ctx.fail(401)
    const crypto_old_pwd = md5Decode(old_pwd)
    console.log('adminModel: ', adminModel)
    if (adminModel.pwd !== crypto_old_pwd) return ctx.fail('旧密码输入错误')
    const crypto_pwd = md5Decode(pwd)
    adminModel.pwd = crypto_pwd
    const result = await adminRepository.save(adminModel)
    if (result) ctx.success('保存成功')
    else ctx.fail('保存失败')
  }

  /**
   * @description 获取配置
   */
  public static async getInfo (ctx: BaseContext) {
    const token = ctx.header.authorization
    const adminRepository = await getConnection().getRepository(Admin)
    const adminModel = await adminRepository.findOne({
      token,
    })
    console.log('adminModel', adminModel)
    if (!adminModel) return ctx.fail(401)
    ctx.success({ ...adminModel }, '获取成功')
  }

  /**
   * @description 更新配置
   */
  public static async updateInfo (ctx: BaseContext) {
    const token = ctx.header.authorization
    const adminRepository = await getConnection().getRepository(Admin)
    const adminModel = await adminRepository.findOne({
      token,
    })
    if (!adminModel) return ctx.fail(401)
    const reqKeys = Object.keys(ctx.request.body)
    for (let i = 0; i < reqKeys.length; i++) {
      adminModel[reqKeys[i]] = ctx.request.body[reqKeys[i]]
    }
    const result = await adminRepository.save(adminModel)
    if (result) ctx.success('更新成功')
    else ctx.fail('更新失败')
  }

}