import * as Router from 'koa-router'
import albumController from '../app/controllers/albumController'
const router = new Router()

router.post('/addPicture', albumController.addPicture)
router.post('/listPictures', albumController.listPictures)
router.post('/deletePicture', albumController.deletePicture)
router.post('/updatePicture', albumController.updatePicture)
router.get('/getPicture', albumController.getPicture)

export default router
