import * as Router from 'koa-router'
import userController from '../app/controllers/userController'
const router = new Router()

router.post('/setStatus', userController.setStatus)

export default router
