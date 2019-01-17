export default class Pagination {
  private pageSize: number
  private pageIndex: number
  private totalRecord: number
  private startRecord: number
  private totalPage: number
  constructor (pageSize: number = 10, pageIndex: number = 1, totalRecord: number = 0) {
    this.pageSize = pageSize
    this.pageIndex = pageIndex
    this.totalRecord = totalRecord
    this.startRecord = 1
    this.totalPage = 0
  }

  public getPageNum () {
    if (this.pageIndex <= 0) {
      return 1
    }
    return this.pageIndex
  }

  public setPageNum (pageIndex) {
    if (!pageIndex) return
    this.pageIndex = pageIndex
  }

  public getPageSize () {
    return this.pageSize
  }

  public setPageSize (pageSize) {
    if (!pageSize) return
    this.pageSize = pageSize
  }

  public getTotalRecord () {
    if (this.totalRecord < 0) {
      return 0
    }
    return this.totalRecord
  }

  public setTotalRecord (totalRecord) {
    this.totalRecord = totalRecord
  }

  public getTotalPage () {
    if (this.totalRecord <= 0) {
      return 0
    }
    let size = this.totalRecord / this.pageSize
    const mod = this.totalRecord % this.pageSize
    if (mod !== 0) size++
    this.totalPage = size
    return this.totalPage
  }

  public getStartRecord () {
    return (this.pageIndex - 1) * this.pageSize
  }

  public getEndRecord () {
    return (this.pageIndex - 1) * this.pageSize + this.pageSize
  }
}
