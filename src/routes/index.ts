import * as Router from 'koa-router'
import CONFIG from '../config'
// import admin from './admin'
// import tag from './tag'
// import category from './category'
// import qiniu from './qiniu'
// import article from './article'
// import comment from './comment'
// import album from './album'
// import music from './music'
// import statistics from './statistics'
// import user from './user'
const router = new Router({
  prefix: CONFIG.APP.ROOT_PATH
})

// router.use('/admin', admin.routes(), admin.allowedMethods())
// router.use('/tag', tag.routes(), tag.allowedMethods())
// router.use('/category', category.routes(), category.allowedMethods())
// router.use('/article', article.routes(), article.allowedMethods())
// router.use('/qiniu', qiniu.routes(), qiniu.allowedMethods())
// router.use('/comment', comment.routes(), comment.allowedMethods())
// router.use('/album', album.routes(), album.allowedMethods())
// router.use('/music', music.routes(), music.allowedMethods())
// router.use('/statistics', statistics.routes(), statistics.allowedMethods())
// router.use('/user', user.routes(), user.allowedMethods())

export default router
