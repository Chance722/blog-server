export default class DataHelper {
  public static isEmpty (...args) {
    let isEmpty = false
    for (const arg of args) {
      if (arg === null || arg === undefined || arg === '') {
        isEmpty = true
        break
      }
    }
    return isEmpty
  }
  public static xssEncode (val) {
    const encodeVal = val.replace(/[<]/g, '&lt;').replace(/[>]/g, '&gt;').replace(/'/g, '&#039;')
    return encodeVal
  }
  public static formatDate (date) {
    const year = date.getFullYear()
    const month = `${new Array(2).join('0')}${Number(date.getMonth()) + 1}`.slice(-2)
    const day = `${new Array(2).join('0')}${date.getDate()}`.slice(-2)
    const hour = `${new Array(2).join('0')}${date.getHours()}`.slice(-2)
    const min = `${new Array(2).join('0')}${date.getMinutes()}`.slice(-2)
    const sec = `${new Array(2).join('0')}${date.getSeconds()}`.slice(-2)
    return `${year}-${month}-${day} ${hour}:${min}:${sec}`
  }
  public static isSensitive (values) {
    const sensitiveWords = ['草你妈', '你妈逼']
    for (const word of sensitiveWords) {
      if (values.includes(word)) {
        return true
      }
    }
    return false
  }
  public static getCurrentWeek () {
    const dayStamp = 86400
    const now = new Date()
    const nowStamp = now.getTime()
    const currentDay = now.getDay()
    const beginStamp = nowStamp - currentDay * dayStamp
    const endStamp = nowStamp + (6 - currentDay) * dayStamp
    return { beginStamp: new Date(beginStamp), endStamp: new Date(endStamp) }
  }
  public static getCurrentMonth () {
    const now = new Date()
    const totalDays = this.getTotalDays(now)
    const dayStamp = 86400
    const nowStamp = now.getTime()
    const currentDate = now.getDate()
    const beginStamp = nowStamp - (currentDate - 1) * dayStamp
    const endStamp = nowStamp + (totalDays - currentDate) * dayStamp
    return { beginStamp: new Date(beginStamp), endStamp: new Date(endStamp) }
  }

  public static getTotalDays (now) {
    const _31days = [1, 3, 5, 7, 8, 10, 12]
    const _30days = [4, 6, 9, 11]
    const m = Number(now.getMonth()) + 1
    const isLeapYear = now.getFullYear() % 4 === 0
    if (_31days.includes(m)) {
      return 31
    } else if (_30days.includes(m)) {
      return 30
    } else if (m === 2 && isLeapYear) {
      return 29
    } else {
      return 28
    }
  }
}
