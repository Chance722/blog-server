import dataHelpler from '../utils/dataHelper'
import * as crypto from 'crypto'
import adminModel from '../models/admin'
import * as jsonWebToken from 'jsonwebtoken'
import CONFIG from '../../config'

// md5编码
const md5Decode = (pwd: string) => {
  return crypto.createHash('md5').update(pwd).digest('hex')
}

export default class AdminService {

  public static async login (ctx) {
    const { name, pwd } = ctx.request.body
    if (dataHelpler.isEmpty(name, pwd)) {
      ctx.fail(422, '参数不能为空')
      return
    }
    const crypto_pwd = md5Decode(pwd)
    const admin = await adminModel.findOne({
      where: {
        name,
        pwd: crypto_pwd
      }
    })
    if (admin) {
      const last_login_time = new Date().getTime()
      const user_name = { jWtUSeRNamE: name }
      const token = jsonWebToken.sign(user_name, CONFIG.TOKEN_SECRET, { expiresIn: 3600 })
      const result = await adminModel.update({
        token,
        last_login_time
      }, {
          where: {
            id: admin.id
          }
        }).catch(err => {
          ctx.throw(500)
        })
      if (result) ctx.success({ id: admin.id, token, name, avator: admin.avator }, '登录成功')
      else ctx.fail('登录失败')
    } else {
      ctx.fail('账号或密码错误')
    }
  }

  public static async regist (ctx) {
    const name = ctx.query.name
    const pwd = ctx.query.pwd
    if (dataHelpler.isEmpty(name, pwd)) {
      ctx.fail(422, '参数不能为空')
      return
    }
    const admin = await adminModel.findOne({
      where: { name }
    })
    if (admin) {
      ctx.fail('已存在同名账号')
    } else {
      const crypto_pwd = md5Decode(pwd)
      const reg_time = new Date().getTime()
      const user_name = { jWtUSeRNamE: name }
      const token = jsonWebToken.sign(user_name, CONFIG.TOKEN_SECRET, { expiresIn: 3600 })
      const result = await adminModel.create({
        name,
        pwd: crypto_pwd,
        reg_time,
        token
      }).catch(err => {
        ctx.throw(500)
      })
      if (result) ctx.success('注册成功')
      else ctx.fail('注册失败')
    }

  }

  public static async saveBaseInfo (ctx) {
    const token = ctx.header.authorization
    const admin = await adminModel.findOne({
      where: {
        token
      }
    })
    if (!admin) {
      ctx.fail(401)
      return
    }
    if (token) {
      const result = await adminModel.update(ctx.request.body, {
        where: {
          id: admin.id
        }
      }).catch(err => {
        ctx.throw(500)
      })
      if (result) ctx.success('保存成功')
      else ctx.fail('保存失败')
    }
  }

  public static async saveUserInfo (ctx) {
    const token = ctx.header.authorization
    const { new_pwd, old_pwd, pwd, name, nickname, signature, avator } = ctx.request.body
    if (dataHelpler.isEmpty(new_pwd, old_pwd, pwd)) {
      ctx.fail(422, '密码不能为空')
      return
    }
    if (new_pwd !== pwd) {
      ctx.fail(422, '两次密码不一致')
      return
    }
    const admin = await adminModel.findOne({
      where: {
        token
      }
    })
    if (!admin) {
      ctx.fail(401)
      return
    }

    const result = await adminModel.update({
      name,
      nickname,
      signature,
      pwd: md5Decode(ctx.request.body.pwd),
      avator
    }, {
        where: {
          id: admin.id
        }
      }).catch(err => {
        ctx.throw(500)
      })
    if (result) ctx.success({ id: admin.id, token, name, avator }, '保存成功')
    else ctx.fail('保存失败')

  }

  public static async getSettingInfo (ctx) {
    const token = ctx.header.authorization
    if (token) {
      const data = await adminModel.findOne({
        where: {
          token
        },
        attributes: ['id', 'name', 'nickname', 'avator', 'signature', 'blog_title', 'page_title', 'keywords', 'blog_address', 'blog_desc', 'email', 'icp_numbers']
      })
      if (data) ctx.success(data, '操作成功')
      else ctx.fail('获取失败')
    } else {
      ctx.fail(401)
    }
  }

}
