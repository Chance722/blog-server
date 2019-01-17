import * as Router from 'koa-router'
import articleController from '../app/controllers/articleController'
const router = new Router()

router.post('/addArticle', articleController.addArticle)
router.post('/listArticles', articleController.listArticles)
router.post('/deleteArticle', articleController.deleteArticle)
router.post('/updateArticle', articleController.updateArticle)
router.get('/getArticle', articleController.getArticle)
router.post('/setState', articleController.setState)

export default router
