import dataHelpler from '../utils/dataHelper'
import albumModel from '../models/album'
import tagsModel from '../models/tags'
import articleTagsModel from '../models/article_tags'
import categorysModel from '../models/categorys'
import Pagination from '../utils/pagination'
import { Op } from 'sequelize'

albumModel.belongsTo(categorysModel, {
  as: 'categoryInfo',
  foreignKey: 'type'
})

export default class AlbumService {

  public static async addPicture (ctx) {
    const { url, content, tags, type, state, weather, address, color } = ctx.request.body
    if (dataHelpler.isEmpty(url, content, type)) {
      ctx.fail(422, '参数不能为空')
      return
    }
    let params = {
      url,
      content,
      type,
      state,
      weather,
      address,
      color,
      create_time: new Date().getTime()
    }
    if (tags && tags.length) {
      params = Object.assign(params, {
        tags: tags.join(',')
      })
    }
    const result = await albumModel.create(params).catch(err => {
      console.log(err)
      ctx.throw(500)
    })
    if (result) ctx.success('添加成功')
    else ctx.fail('添加失败')
  }

  public static async deletePicture (ctx) {
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
    const result = albumModel.destroy({
      where: {
        id: {
          [Op.in]: idArray
        }
      }
    }).catch(err => ctx.throw(500))
    if (result) ctx.success('删除成功')
    else ctx.fail('删除失败')
  }

  public static async listPictures (ctx) {
    const { tags, type, state, keywords, pageIndex, pageSize } = ctx.request.body
    let condition = {
      state
    }
    if (!dataHelpler.isEmpty(type)) {
      condition = Object.assign(condition, { type })
    }
    if (!dataHelpler.isEmpty(keywords)) {
      condition = Object.assign(condition, {
        [Op.or]: {
          content: {
            [Op.like]: `%${keywords || ''}%`
          },
          weather: {
            [Op.like]: `%${keywords || ''}%`
          },
          address: {
            [Op.like]: `%${keywords || ''}%`
          }
        }
       })
    }
    let articleIds = []
    if (tags && tags.length) {
      // 通过article_tags关联表获取文章ID数组
      await articleTagsModel.findAll({
        where: {
          tagId: {
            [Op.in]: tags
          }
        }
      }).then(res => {
        articleIds = res.map(item => item.articleId)
      }).catch(err => ctx.throw(500))

      // 合并查询
      condition = Object.assign(condition, {
        id: {
          [Op.in]: articleIds
        }
      })

    }
    const totalRecord = await albumModel.count({
      where: condition
    })
    const pagination = new Pagination(pageSize, pageIndex, totalRecord)
    const albums = await albumModel.findAll({
      offset: pagination.getStartRecord(),
      limit: pagination.getPageSize(),
      where: condition,
      include: {
        as: 'categoryInfo',
        model: categorysModel
      }
    }).catch(err => ctx.throw(500))

    const result = albums.map(async item => {
      let tagInfo = null
      const tagIds = item.tags.split(',')
      tagInfo = await tagsModel.findAll({
        where: {
          id: {
            [Op.in]: tagIds
          }
        }
      })
      return Object.assign(item.dataValues, { tagInfo })
    })

    const list = await Promise.all(result).catch(err => ctx.throw(500))
    ctx.success({ list, pageIndex, pageSize, total: totalRecord }, '操作成功')
  }

  public static async updatePicture (ctx) {
    const { id } = ctx.request.body
    if (dataHelpler.isEmpty(id)) {
      ctx.fail(422, '参数不能为空')
      return
    }
    let params = {}
    if (ctx.request.body.tags) {
      params = Object.assign(ctx.request.body, {
        tags: ctx.request.body.tags.join(',')
      })
    } else {
      params = ctx.request.body
    }
    const result = albumModel.update(params, {
      where: { id }
    }).catch(err => ctx.throw(500))
    if (result) ctx.success('更新成功')
    else ctx.fail('更新失败')
  }

  public static async getPicture (ctx) {
    const id = ctx.query.id
    if (dataHelpler.isEmpty(id)) {
      ctx.fail(422, '参数不能为空')
      return
    }
    const data = await albumModel.findOne({ where: { id } }).catch(err => ctx.throw(500))
    if (data) ctx.success(data, '操作成功')
    else ctx.fail('请求失败')
  }

}
