import dataHelpler from '../utils/dataHelper'
import tagsModel from '../models/tags'
import Pagination from '../utils/pagination'
import { Op } from 'sequelize'

export default class TagService {

  public static async addTag (ctx) {
    const { name, description, thumb, type } = ctx.request.body
    if (dataHelpler.isEmpty(name, description, type)) {
      ctx.fail(422, '参数不能为空')
      return
    }
    const tag = await tagsModel.findOne({
      where: { name }
    })
    if (tag) {
      ctx.fail('已存在同名标签')
    } else {
      const result = await tagsModel.create({
        name,
        description,
        thumb,
        type,
        create_time: new Date().getTime()
      }).catch(err => ctx.throw(500))
      if (result) ctx.success('添加成功')
      else ctx.fail('添加失败')
    }
  }

  public static async deleteTag (ctx) {
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
    const result = tagsModel.destroy({
      where: {
        id: {
          [Op.in]: idArray
        }
      }
    }).catch(err => ctx.throw(500))
    if (result) ctx.success('删除成功')
    else ctx.fail('删除失败')
  }

  public static async listTags (ctx) {
    const { type, tagName, pageIndex, pageSize } = ctx.request.body
    const totalRecord = await tagsModel.count({
      where: {
        name: {
            [Op.like]: `%${tagName}%`
        },
        type
      }
    })
    const pagination = new Pagination(pageSize, pageIndex, totalRecord)
    const list = await tagsModel.findAll({
      offset: pagination.getStartRecord(),
      limit: pagination.getPageSize(),
      where: {
        name: {
          [Op.like]: `%${tagName}%`
        },
        type
      }
    }).catch(err => ctx.throw(500))

    ctx.success({ list, pageIndex, pageSize, total: totalRecord }, '操作成功')

  }

  public static async listAllTags (ctx) {
    const list = await tagsModel.findAll().catch(err => ctx.throw(500))
    ctx.success({ list }, '操作成功')
  }

  public static async updateTag (ctx) {
    const { name, description, thumb, id } = ctx.request.body
    if (dataHelpler.isEmpty(name, description, id)) {
      ctx.fail(422, '参数不能为空')
      return
    }
    const tag = await tagsModel.findOne({
      where: {
        id
      }
    })
    if (!tag) {
      ctx.fail('找不到对应标签')
    } else {
      const result = tagsModel.update({ name, description, thumb },
        { where: { id } }).catch(err => { ctx.thorw(500) })
      if (result) ctx.success('更新成功')
      else ctx.fail('更新失败')
    }
  }
}
