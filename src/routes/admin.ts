import * as Router from 'koa-router'
import adminController from '../app/controllers/adminController'
const router = new Router()

router.post('/login', adminController.login)
router.get('/regist', adminController.regist)
router.post('/saveBaseInfo', adminController.saveBaseInfo)
router.post('/saveUserInfo', adminController.saveUserInfo)
router.get('/getSettingInfo', adminController.getSettingInfo)

export default router
