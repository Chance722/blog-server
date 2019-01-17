import * as NeteaseMusic from 'simple-netease-cloud-music'
import CONFIG from '../../config'
const nm = new NeteaseMusic()


export default class MusicController {

  public static async getList (ctx) {
    const res = await nm.playlist(CONFIG.MUSIC_LIST_ID).catch(err => ctx.throw(500))
    if (res) ctx.success(res, '获取成功')
    else ctx.fail('获取歌单失败')
  }

  public static async getLyric (ctx) {
    const id = ctx.query.id
    const res = await nm.lyric(id).catch(err => ctx.throw(500))
    if (res) ctx.success(res, '获取成功')
    else ctx.fail('获取歌词失败')
  }

  public static async getPicture (ctx) {
    const id = ctx.query.id
    const res = await nm.picture(id, 400)
    if (res) ctx.success(res, '获取成功')
    else ctx.fail('获取图片失败')
  }

  public static async getSongUrl (ctx) {
    const id = ctx.query.id
    const res = await nm.url(id, 400)
    if (res) ctx.success(res, '获取成功')
    else ctx.fail('获取歌曲失败')
  }

}
