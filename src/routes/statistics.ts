import * as Router from 'koa-router'
import statisticsController from '../app/controllers/statisticsController'
const router = new Router()

router.post('/getDataByDate', statisticsController.getDataByDate)

export default router
