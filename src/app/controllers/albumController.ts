import albumService from '../services/albumService'

export default class AlbumController {

  /**
   * @param {string} url required
   * @param {string} content required
   * @param {string} tags
   * @param {number} type required
   * @param {number} state
   * @param {number} weather
   * @param {string} address
   * @param {string} color
   * @return null
   */
  public static addPicture (ctx) {
    return albumService.addPicture(ctx)
  }

  /**
   * @param {string | number} id required
   * @return null
   */
  public static deletePicture (ctx) {
    return albumService.deletePicture(ctx)
  }

  /**
   * @param {number} type
   * @param {number} state
   * @param {string} keywords
   * @param {number} pageIndex requied
   * @param {number} pageSize required
   * @return {object} { list, pageIndex, pageSize, total }
   */
  public static listPictures (ctx) {
    return albumService.listPictures(ctx)
  }

  /**
   * @param {number} id required
   * @param {string} url required
   * @param {string} content required
   * @param {string} tags
   * @param {number} type required
   * @param {number} state
   * @param {number} weather
   * @param {string} address
   * @param {string} color
   * @return null
   */
  public static updatePicture (ctx) {
    return albumService.updatePicture(ctx)
  }

  /**
   * @param {number} id required
   * @return {object} data
   */
  public static getPicture (ctx) {
    return albumService.getPicture(ctx)
  }
}
