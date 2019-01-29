import dataHelpler from '../utils/dataHelper'
import articleModel from '../models/article'
import tagsModel from '../models/tags'
import categorysModel from '../models/categorys'
import articleTagsModel from '../models/article_tags'
import articleCategorysModel from '../models/article_categorys'
import Pagination from '../utils/pagination'
import statisticsService from './statisticsService'
import CONFIG from '../../config'
import { Op } from 'sequelize'

articleModel.belongsTo(categorysModel, {
  as: 'categoryInfo',
  foreignKey: 'category'
})

export default class ArticleService {

  public static async addArticle (ctx) {
    const { blog_title, keywords, tags, content, status, open, thumb, category } = ctx.request.body
    if (dataHelpler.isEmpty(blog_title, content)) {
      ctx.fail(422, '参数不能为空')
      return
    }
    const article = await articleModel.create({
      blog_title,
      keywords,
      tags: tags.join(','),
      content,
      status: status || 0,
      open: open || 0,
      thumb,
      category,
      create_time: new Date().getTime()
    }).catch(err => {
      ctx.throw(500)
    })

    // 更新article_tags关联表
    const tagResult = tags.map(async tag => {
      await articleTagsModel.create({
        articleId: article.id,
        tagId: tag
      }).catch(err => ctx.throw(500))
    })
    // 更新aticle_categorys关联表
    const catResult = await articleCategorysModel.create({
      articleId: article.id,
      categoryId: category
    }).catch(err => ctx.throw(500))

    if (tagResult && catResult) ctx.success('保存成功')
    else ctx.fail('保存失败')
  }

  // TODO: 根据搜索类型 添加相应的统计类型 ( TAG, CATEGORY, KEYWORDS )
  public static async listArticles (ctx) {
    const { tags, category, open, status, blog_title, pageIndex, pageSize } = ctx.request.body
    let condition = {
      open,
      status,
      blog_title: {
        [Op.like]: `%${blog_title}%`
      }
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
    }
    if (category && category.length) {
      // 通过article_categorys关联表获取文章ID数组
      await articleCategorysModel.findAll({
        where: {
          categoryId: {
            [Op.in]: category
          }
        }
      }).then(res => {
        const catRes = res.map(item => item.articleId)
        if (articleIds.length) catRes.filter(item => articleIds.includes(item))
        else articleIds = catRes
      }).catch(err => ctx.throw(500))
    }
    // 合并查询条件
    if (tags.length || category.length) {
      condition = Object.assign(condition, {
        id: {
          [Op.in]: articleIds
        }
      })
    }
    // 再通过文章ID数组和其他参数进行查询
    const totalRecord = await articleModel.count({
      where: condition
    })
    const pagination = new Pagination(pageSize, pageIndex, totalRecord)
    const articles = await articleModel.findAll({
      offset: pagination.getStartRecord(),
      limit: pagination.getPageSize(),
      where: condition,
      include: {
        as: 'categoryInfo',
        model: categorysModel
      }
    }).catch(err => ctx.throw(500))

    const result = articles.map(async item => {
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

  public static async deleteArticle (ctx) {
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
    const result = articleModel.destroy({
      where: {
        id: {
          [Op.in]: idArray
        }
      }
    }).catch(err => ctx.throw(500))
    if (result) ctx.success('删除成功')
    else ctx.fail('删除失败')
  }

  public static async updateArticle (ctx) {
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
    const result = await articleModel.update(params, {
      where: {
        id
      }
    })
    if (result) ctx.success('更新成功')
    else ctx.fail('更新失败')

  }

  public static async getArticle (ctx) {
    const id = ctx.query.id
    if (dataHelpler.isEmpty(id)) {
      ctx.fail(422, '参数不能为空')
      return
    }
    const data = await articleModel.findOne({ where: { id } }).catch(err => ctx.thorw(500))
    // TODO: 根据getArticle的来源 判断是否添加 NEW_VIEWS 统计
    if (data) ctx.success(data, '操作成功')
    else ctx.fail('请求失败')
  }

  public static async setState (ctx) {
    const { type, id, user_id } = ctx.request.body
    const operationType = CONFIG.OPERATION_TYPE[type]
    const article = await articleModel.findOne({
      where: { id }
    })
    if (article) {
      let params = null
      let record_params = null
      if (operationType === 'likes') {
        params = { likes: Number(article.likes) + 1 }
        record_params = { type: 'NEW_LIKES' }
      } else if (operationType === 'comments') {
        params = { comments: Number(article.comments) + 1 }
        record_params = { type: 'NEW_ARTICLE_COMMENTS' }
      } else if (operationType === 'views') {
        params = { views: Number(article.views) + 1 }
        record_params = { type: 'NEW_VIEWS' }
      }
      const res = await articleModel.update(params, { where: { id } }).catch(err => ctx.throw(500))

      // 新增统计项
      if (user_id) record_params = Object.assign(record_params, { user_id })
      statisticsService.record({
        record_params
      })

      if (res) ctx.success('操作成功')
      else ctx.fail('操作失败')
    }
  }
}
