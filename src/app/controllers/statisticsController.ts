import statisticsService from '../services/statisticsService'

export default class StatisticsController {
  /**
   * @param {string} name
   * @param {number} type
   * @return {object} { list }
   */
  public static getDataByDate (ctx) {
    return statisticsService.getDataByDate(ctx)
  }

  public static newVisit (ctx) {
    return statisticsService.newVisit(ctx)
  }

  public static getTotalData (ctx) {
    return statisticsService.getTotalData(ctx)
  }
}

