import statisticsService from '../services/statisticsService'

export default class StatisticsController {
  /**
   * @param {string} type
   * @param {string} begin_time
   * @param {string} end_time
   * @return {object} { list }
   */
  public static getDataByDate (ctx) {
    return statisticsService.getDataByDate(ctx)
  }

  public static newVisit (ctx) {
    return statisticsService.newVisit(ctx)
  }
}

