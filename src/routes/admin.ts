import * as Router from 'koa-router'
import adminCtrl from '../app/controllers/admin'

const router = new Router()

router.get('/regist', adminCtrl.regist)
router.post('/login', adminCtrl.login)
router.post('/savePwd', adminCtrl.savePwd)
router.get('/getInfo', adminCtrl.getInfo)
router.post('/updateInfo', adminCtrl.updateInfo)

export default router