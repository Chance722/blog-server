import statisticsModel from '../models/statistics'
import CONFIG from '../../config'
import dataHelper from '../utils/dataHelper'
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
    const { name, type } = ctx.request.body
    const dateType = CONFIG.DATE_TYPE[type]
    let params = {
      create_time: {
        [Op.lte]: dataHelper.getRecentDates(dateType).endStamp,
        [Op.gte]: dataHelper.getRecentDates(dateType).beginStamp
      }
    }
    if (name) params = Object.assign(params, { name })

    // 先获取时间区间内的所有数据
    const list = await statisticsModel.findAll({
      where: params
    }).catch(err => ctx.fail(500))

    const dates = this.getDateStamps(dateType).map(item => dataHelper.formatDate(new Date(item), true))
    const filterList = []
    const dayStamp = 86400 * 1000
    for (let i = 0; i < dates.length; i++) {
      const beginStamp = new Date(`${dates[i]} 00:00:00`).getTime()
      const endStamp = beginStamp + dayStamp * CONFIG.DATE_STAT_SETTING[dateType].splitNums
      // const endStamp = new Date(`${dates[i]} 23:59:59`).getTime()
      const childList = list.length ? list.filter(item => {
        const createTime = new Date(item.create_time).getTime()
        return createTime >= beginStamp && createTime < endStamp
      }) : []

      if (i <= dates.length && type !== 1) {
        filterList.push({
          date: `${dates[i]}~${dates[i + 1]}`,
          list: childList
        })
      } else {
        filterList.push({
          date: dates[i],
          list: childList
        })
      }
    }

    if (filterList) ctx.success(filterList, '获取成功')
    else ctx.fail('获取失败')
  }

  public static getDateStamps (type) {
    const dayStamp = 86400 * 1000
    const now = new Date()
    const endStamp = now.getTime()
    const stamps = []
    const total = 7
    for (let i = 0; i < total; i++) {
      stamps.unshift(endStamp - i * CONFIG.DATE_STAT_SETTING[type].splitNums * dayStamp)
    }
    return stamps
  }
}
