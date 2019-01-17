import * as Router from 'koa-router'
import musicController from '../app/controllers/musicController'
const router = new Router()

router.get('/getList', musicController.getList)
router.get('/getLyric', musicController.getLyric)
router.get('/getPicture', musicController.getPicture)
router.get('/getSongUrl', musicController.getSongUrl)

export default router
