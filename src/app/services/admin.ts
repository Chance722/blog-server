import adminModel from '../models/admin'
import dataHelper from '../utils/dataHelper'
import adminInterface from '../interfaces/admin'
import { Admin } from '../../db/entity/admin'
import { getManager } from 'typeorm'
import { BaseContext } from 'koa'

const entityManager = getManager()

export default class AdminService {

  public static async regist (ctx: BaseContext) {
    const query: adminInterface.RegistParam = ctx.query
    const name = query.name
    const pwd = query.pwd
    if (dataHelper.isEmpty(name, pwd)) {
      ctx.fail(422, '参数不能为空')
    }
    const admin = new Admin()
    admin.name = name
    admin.pwd = pwd
    const res = await entityManager.save(admin)
    console.log(res)
  }
}