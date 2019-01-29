/**
 * 配置文件
 */
const CONFIG = {
  // 操作类型
  OPERATION_TYPE: {
    1: 'likes',
    2: 'comments',
    3: 'views'
  },
  // 统计类型
  STAT_TYPE: {
    NEW_VISITOR: {
      NAME: 'NEW_VISITOR',
      DESC: '新增访问数'
    },
    NEW_USER: {
      NAME: 'NEW_USER',
      DESC: '新增用户数'
    },
    NEW_COMMENTS: {
      NAME: 'NEW_COMMENTS',
      DESC: '新增留言数'
    },
    NEW_ARTICLE_COMMENTS: {
      NAME: 'NEW_ARTICLE_COMMENTS',
      DESC: '新增文章评论数'
    },
    NEW_VIEWS: {
      NAME: 'NEW_VIEWS',
      DESC: '新增阅读数'
    },
    NEW_LIKES: {
      NAME: 'NEW_LIKES',
      DESC: '新增点赞数'
    },
    TAG: {
      NAME: 'SEARCH_BY_TAG',
      DESC: '通过标签检索文章的次数统计'
    },
    CATEGORY: {
      NAME: 'SEARCH_BY_CATEGORY',
      DESC: '通过分类检索文章的次数统计'
    },
    KEYWORDS: {
      NAME: 'SEARCH_BY_KEYWORDS',
      DESC: '通过关键字检索文章的次数统计'
    }
  },
  // 我的网易云歌单ID
  MUSIC_LIST_ID: '371766297',
  // 七牛配置
  QINIU: {
    accessKey: 'YOUR_ACCESS_KEY',
    secretKey: 'YOUR_SECRET_KEY',
    bucket: 'blogimage',
    origin: 'http://blogimage.u.clouddn.com',
    uploadURL: 'http://up.clouddn.com/'
  },
  // CODE返回
  CODE_MAP: {
    '-1': '请求失败',
    200: '请求成功',
    401: '权限校验失败',
    403: 'Forbidden',
    404: 'URL资源未找到',
    422: '参数校验失败',
    500: '服务器内部错误'
  },
  // TOKEN密钥
  TOKEN_SECRET: 'jwt-secret-722',
  // 启动端口及接口前缀
  APP: {
    PORT: 3000,
    ROOT_PATH: '/api'
  },
  // 数据库配置
  MYSQL: {
    DATABASE: 'blogsql',
    USERNAME: 'root',
    PASSWORD: '123456',
    PORT: '3306',
    HOST: 'localhost'
  }
}

export default CONFIG
