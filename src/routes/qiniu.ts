import * as Router from 'koa-router'
import qiniuController from '../app/controllers/qiniuController'
const router = new Router()

router.get('/getToken', qiniuController.getToken)

export default router
