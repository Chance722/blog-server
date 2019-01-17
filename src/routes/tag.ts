import * as Router from 'koa-router'
import tagController from '../app/controllers/tagController'
const router = new Router()

router.post('/addTag', tagController.addTag)
router.post('/deleteTag', tagController.deleteTag)
router.post('/listTags', tagController.listTags)
router.post('/updateTag', tagController.updateTag)
router.get('/listAllTags', tagController.listAllTags)

export default router

