import commentService from '../services/commentService'

export default class CommentController {

  /**
   * @param {number} post_id required
   * @param {number} pid required
   * @param {string} content required
   * @param {string} author_name required
   * @param {string} author_email required
   * @return null
   */
  public static leaveComment (ctx) {
    return commentService.leaveComment(ctx)
  }

  /**
   * @param {number} type required
   * @param {number} state required
   * @param {number} pageIndex required
   * @param {number} pageSize required
   * @param {string} keywords
   * @return {object} { list, pageIndex, pageSize, total }
   */
  public static listComments (ctx) {
    return commentService.listComments(ctx)
  }

  /**
   * @param {number} id required
   * @return {object}
   */
  public static getComment (ctx) {
    return commentService.getComment(ctx)
  }

  /**
   * @param {number} id required
   * @param {number} state required
   * @return null
   */
  public static setState (ctx) {
    return commentService.setState(ctx)
  }

  /**
   * @param {number} id required
   * @return null
   */
  public static setLikes (ctx) {
    return commentService.setLikes(ctx)
  }
}
