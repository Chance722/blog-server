import statisticsModel from '../models/statistics'
import CONFIG from '../../config'
import { Op } from 'sequelize'

export default class StatisticsService {

  public static async record (payload) {
    const { type, user_id, content } = payload
    let params = { name: CONFIG.STAT_TYPE[type].NAME, description: CONFIG.STAT_TYPE[type].DESC, create_time: new Date().getTime() }
    if (user_id) params = Object.assign(params, { user_id })
    if (content) params = Object.assign(params, { content })
    const res = await statisticsModel.create(params)
    if (res) console.log(`统计项创建成功`)
  }

  public static async newVisit (ctx) {
    const id = ctx.query.body.id
    let params = { type: 'NEW_VISITOR' }
    if (id) params = Object.assign({ type: 'NEW_VISITOR' }, { user_id: id })
    this.record(params)
  }

  public static async getDataByDate (ctx) {
    const { type, begin_time, end_time } = ctx.request.body
    const list = await statisticsModel.findAll({
      where: {
        type,
        create_time: {
          [Op.lte]: end_time,
          [Op.gte]: begin_time
        }
      }
    }).catch(err => {
      console.log(err)
    })
    console.log(list)
    if (list) ctx.success(list, '获取成功')
    else ctx.fail('获取失败')
  }
}
