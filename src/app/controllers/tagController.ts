import tagService from '../services/tagService'

export default class TagController {

  /**
   * @param {string} name required
   * @param {string} description required
   * @param {string} thumb
   * @param {string} type required
   * @return null
   */
  public static addTag (ctx) {
    return tagService.addTag(ctx)
  }

  /**
   * @param {any} id
   * @return null
   */
  public static deleteTag (ctx) {
    return tagService.deleteTag(ctx)
  }

  /**
   * @param {number} pageSize required
   * @param {number} pageIndex required
   * @param {string} tagName
   * @param {number} type required
   * @return {object} { list, pageIndex, pageSize, total }
   */
  public static listTags (ctx) {
    return tagService.listTags(ctx)
  }

  /**
   * @param null
   * @return {object} { list }
   */
  public static listAllTags (ctx) {
    return tagService.listAllTags(ctx)
  }

  /**
   * @param {number} id
   * @return null
   */
  public static updateTag (ctx) {
    return tagService.updateTag(ctx)
  }

}
