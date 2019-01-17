import dataHelpler from '../utils/dataHelper'
import categorysModel from '../models/categorys'
import Pagination from '../utils/pagination'
import { Op } from 'sequelize'

export default class TypeService {

  public static async addType (ctx) {
    const { name, description, thumb, type } = ctx.request.body
    if (dataHelpler.isEmpty(name, description, type)) {
      ctx.fail(422, '参数不能为空')
      return
    }
    const cate = await categorysModel.findOne({
      where: { name }
    })
    if (cate) {
      ctx.fail('已存在同名分类')
    } else {
      const result = await categorysModel.create({
        name,
        description,
        thumb,
        type,
        create_time: new Date().getTime()
      }).catch(err => {
        ctx.throw(500, '服务器内部错误')
      })
      if (result) ctx.success('添加成功')
      else ctx.fail('添加失败')
    }
  }

  public static async deleteType (ctx) {
    const ids = ctx.request.body.id
    if (dataHelpler.isEmpty(ids)) {
      ctx.fail(422, '参数不能为空')
      return
    }
    let idArray = []
    try {
      idArray = typeof ids === 'string' ? ids.split(',') : [ids]
    } catch (e) {
      ctx.fail(422, '参数错误')
    }
    const result = categorysModel.destroy({
      where: {
        id: {
          [Op.in]: idArray
        }
      }
    }).catch(err => {
      ctx.throw(500, '服务器内部错误')
    })
    if (result) ctx.success('删除成功')
    else ctx.fail('删除失败')
  }

  public static async listTypes (ctx) {
    const { type, typeName, pageIndex, pageSize } = ctx.request.body
    const totalRecord = await categorysModel.count({
      where: {
        name: {
          [Op.like]: `%${typeName}%`
        },
        type
      }
    })
    const pagination = new Pagination(pageSize, pageIndex, totalRecord)
    const list = await categorysModel.findAll({
      offset: pagination.getStartRecord(),
      limit: pagination.getPageSize(),
      where: {
        name: {
          [Op.like]: `%${typeName}%`
        },
        type
      }
    }).catch(err => {
      ctx.throw(500, '服务器内部错误')
    })

    ctx.success({ list, pageIndex, pageSize, total: totalRecord }, '操作成功')

  }

  public static async listAllTypes (ctx) {
    const list = await categorysModel.findAll().catch(err => ctx.throw(500))
    ctx.success({ list }, '操作成功')
  }

  public static async updateType (ctx) {
    const { name, description, thumb, type, id } = ctx.request.body
    if (dataHelpler.isEmpty(name, description, type, id)) {
      ctx.fail(422, '参数不能为空')
      return
    }
    const cate = await categorysModel.findOne({
      where: {
        id
      }
    })
    if (!cate) {
      ctx.fail('找不到对应分类')
    } else {
      const result = categorysModel.update({ name, description, thumb },
        { where: { id } }).catch(err => { ctx.thorw(500) })
      if (result) ctx.success('更新成功')
      else ctx.fail('更新失败')
    }
  }
}
