import * as Router from 'koa-router'
import adminCtrl from '../app/controllers/admin'

const router = new Router()

router.get('/regist', adminCtrl.regist)

export default router