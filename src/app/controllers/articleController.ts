import articleService from '../services/articleService'

export default class ArticleController {
    /**
     * @param {string} blog_title required
     * @param {string} keywords
     * @param {string} tags
     * @param {string} content required
     * @param {number} status
     * @param {numebr} open
     * @param {string} thumb
     * @param {number} category
     * @return null
     */
    public static addArticle (ctx) {
      return articleService.addArticle(ctx)
    }
    /**
     * @param {string} blog_title required
     * @param {string} tags
     * @param {number} status required
     * @param {numebr} open required
     * @param {number} category required
     * @param {number} pageIndex requied
     * @param {number} pageSize required
     * @return {object} { list, pageIndex, pageSize, total }
     */
    public static listArticles (ctx) {
      return articleService.listArticles(ctx)
    }
    /**
     * @param {string | number} id required
     * @return null
     */
    public static deleteArticle (ctx) {
      return articleService.deleteArticle(ctx)
    }
    /**
     * @param {number} id required
     * @param {string} blog_title
     * @param {string} keywords
     * @param {string} tags
     * @param {string} content
     * @param {number} status
     * @param {numebr} open
     * @param {string} thumb
     * @param {number} category
     * @return null
     */
    public static updateArticle (ctx) {
      return articleService.updateArticle(ctx)
    }
    /**
     * @param {number} id required
     * @return {object} data
     */
    public static getArticle (ctx) {
      return articleService.getArticle(ctx)
    }
    /**
     * @param {number} type
     * @param {string} type_desc
     */
    public static setState (ctx) {
      return articleService.setState(ctx)
    }
}
