import * as Router from 'koa-router'
import commentController from '../app/controllers/commentController'
const router = new Router()

router.post('/leaveComment', commentController.leaveComment)
router.post('/listComments', commentController.listComments)
router.get('/getComment', commentController.getComment)
router.patch('/setState', commentController.setState)
router.patch('/setLikes', commentController.setLikes)

export default router
