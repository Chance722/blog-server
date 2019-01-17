import * as Router from 'koa-router'
import categoryController from '../app/controllers/categoryController'
const router = new Router()

router.get('/listAllTypes', categoryController.listAllTypes)
router.post('/addType', categoryController.addType)
router.post('/deleteType', categoryController.deleteType)
router.post('/listTypes', categoryController.listTypes)
router.post('/updateType', categoryController.updateType)

export default router
