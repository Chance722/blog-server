import dataHelpler from '../utils/dataHelper'
import commentModel from '../models/comment'
import userModel from '../models/user'
import * as geoip from 'geoip-lite'
import { Op } from 'sequelize'
import Pagination from '../utils/pagination'
import userService from './userService'
import statisticsService from './statisticsService'
import CONFIG from '../../config'

commentModel.belongsTo(userModel, {
  as: 'user',
  foreignKey: 'author_id'
})

export default class CommentService {

  public static async leaveComment (ctx) {
    const { post_id, pid, content, author_name, author_email, homepage } = ctx.request.body
    if (dataHelpler.isEmpty(post_id, pid, content, author_name, author_email)) {
      ctx.fail(422, '参数不能为空')
      return
    }
    if (dataHelpler.isSensitive(content)) {
      ctx.fail('检测到含有敏感词汇，老哥别太暴躁好吗')
      return
    }
    let user = await userService.getUser(author_name, author_email)
    // 获取ip地址
    const ip = (ctx.req.headers['x-forwarded-for'] ||
      ctx.req.headers['x-real-ip'] ||
      ctx.req.connection.remoteAddress ||
      ctx.req.socket.remoteAddress ||
      ctx.req.connection.socket.remoteAddress ||
      ctx.req.ip ||
      ctx.req.ips[0]).replace('::ffff:', '')
    const ip_location = geoip.lookup(ip)
    const agent = ctx.headers['user-agent']

    // 由name和email确定user的唯一性 如果找不到user则新增
    if (!user) {
      user = await userService.addUser({ name: author_name, email: author_email, ip, homepage })

      // 新增统计项
      statisticsService.record({
        type: 'NEW_USER',
        user_id: user.id
      })
    }

    const result = await commentModel.create({
      post_id,
      pid,
      content,
      author_id: user.id,
      agent,
      ip,
      city: ip_location && ip_location.city,
      region: ip_location && ip_location.region,
      country: ip_location && ip_location.country,
      create_time: new Date().getTime()
    })

    // 新增统计项
    statisticsService.record({
      type: 'NEW_COMMENTS',
      user_id: user.id,
      content
    })

    if (result) ctx.success('发布成功')
    else ctx.fail('发布失败')

  }

  public static async listComments (ctx) {
    const { type, state, keywords, pageIndex, pageSize } = ctx.request.body
    let condition = {
      state
    }
    if (keywords) {
      condition = Object.assign(condition, {
        [Op.or]: {
          content: {
            [Op.like]: `%${keywords}%`
          },
          author_name: {
            [Op.like]: `%${keywords}%`
          },
          author_email: {
            [Op.like]: `%${keywords}%`
          }
        }
      })
    }
    if (type === 0) {
      condition = Object.assign(condition, {
        post_id: 0
      })
    } else if (type === 1) {
      condition = Object.assign(condition, {
        post_id: {
          [Op.not]: 0
        }
      })
    }
    const totalRecord = await commentModel.count({
      where: condition
    })
    const pagination = new Pagination(pageSize, pageIndex, totalRecord)
    const list = await commentModel.findAll({
      offset: pagination.getStartRecord(),
      limit: pagination.getPageSize(),
      where: condition,
      include: {
        as: 'user',
        model: userModel
      }
    }).catch(err => ctx.throw(500))
    if (list) ctx.success({ list, pageIndex, pageSize, total: totalRecord }, '操作成功')
    else ctx.success('获取失败')
  }

  public static async getComment (ctx) {
    const id = ctx.query.id
    if (dataHelpler.isEmpty(id)) {
      ctx.fail(422, '参数不能为空')
      return
    }
    const result = await commentModel.findOne({
      where: {
        id
      }
    })
    if (result) ctx.success(result, '获取成功')
    else ctx.fail('获取失败')
  }

  public static async setState (ctx) {
    const { state, id } = ctx.request.body
    if (dataHelpler.isEmpty(state, id)) {
      ctx.fail(422, '参数不能为空')
      return
    }
    // TODO: 需要根据token检测对应的user是否为管理员 只有管理员有权限进行setState操作
    const result = commentModel.update({
      state
    }, {
      where: { id }
    }).catch(err => ctx.thorw(500))
    if (result) ctx.success('操作成功')
    else ctx.fail('操作失败')
  }

  public static async setLikes (ctx) {
    const { id } = ctx.request.body
    if (dataHelpler.isEmpty(id)) {
      ctx.fail(422, '参数不能为空')
      return
    }
    const comment = await commentModel.findOne({
      where: { id }
    })
    if (comment) {
      const result = commentModel.update({
        likes: Number(comment.likes) + 1
      }, {
          where: { id }
        }).catch(err => ctx.thorw(500))
      if (result) ctx.success('操作成功')
      else ctx.fail('操作失败')
    } else {
      ctx.fail(422, '参数有误')
    }

  }

}
