import categoryService from '../services/categoryService'

export default class TagController {

  /**
   * @param {string} name
   * @param {string} description
   * @param {string} thumb
   * @param {string} type required
   * @return null
   */
  public static addType (ctx) {
    return categoryService.addType(ctx)
  }

  /**
   * @param {any} id
   * @return null
   */
  public static deleteType (ctx) {
    return categoryService.deleteType(ctx)
  }

  /**
   * @param {number} pageSize required
   * @param {number} pageIndex required
   * @param {string} typeName
   * @param {number} type required
   * @return {object} { list, pageIndex, pageSize, total }
   */
  public static listTypes (ctx) {
    return categoryService.listTypes(ctx)
  }

  /**
   * @param null
   * @return {object} { list }
   */
  public static listAllTypes (ctx) {
    return categoryService.listAllTypes(ctx)
  }

  /**
   * @param {string} name
   * @param {string} description
   * @param {string} thumb
   * @param {string} type required
   * @param {number} id
   * @return null
   */
  public static updateType (ctx) {
    return categoryService.updateType(ctx)
  }

}
