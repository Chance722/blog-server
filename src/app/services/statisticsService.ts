import statisticsModel from '../models/statistics'
import CONFIG from '../../config'
import { Op } from 'sequelize'

export default class StatisticsService {
  public static async record (payload) {
    const { type, type_desc, nums } = payload
    let params = { type, type_desc, create_time: new Date().getTime() }
    if (nums) {
      params = Object.assign(params, { nums })
    }
    const res = await statisticsModel.create(params)
    if (res) console.log(`统计项创建成功`)
  }

  public static async getDataByDate (ctx) {
    const { type, begin_time, end_time } = ctx.request.body
    const statType = CONFIG.STAT_TYPE[type]
    const list = await statisticsModel.findAll({
      where: {
        type: statType,
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
