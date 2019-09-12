/**
 * 配置文件
 */
const config = {
  // 操作类型
  OPERATION_TYPE: {
    1: 'likes',
    2: 'comments',
    3: 'views'
  },
  DATE_TYPE: {
    1: 'RECENT_WEEK',
    2: 'RECENT_MONTH',
    3: 'RECENT_THREE_MONTH',
    4: 'RECENT_HALF_YEAR',
    5: 'RECENT_YEAR'
  },
  DATE_STAT_SETTING: {
    'RECENT_WEEK': {
      prevDays: 6,
      splitNums: 1,
      value: 1
    },
    'RECENT_MONTH': {
      prevDays: 29,
      splitNums: 5,
      value: 2
    },
    'RECENT_THREE_MONTH': {
      prevDays: 89,
      splitNums: 15,
      value: 3
    },
    'RECENT_HALF_YEAR': {
      prevDays: 179,
      splitNums: 30,
      value: 4
    },
    'RECENT_YEAR': {
      prevDays: 364,
      splitNums: 60,
      value: 5
    }
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
  },
  // 我的网易云歌单ID
  MUSIC_LIST_ID: '371766297',
  // 七牛配置
  QINIU: {
    // accessKey: 'YOUR_ACCESS_KEY',
    // secretKey: 'YOUR_SECRET_KEY',
    accessKey: 'uGfIINWyiSdl1ED8gCNMQ9bLz0XfP0iTs0RibVqH',
    secretKey: 'm-2ZG9dbC-t1r2vTZ5cXEoxtnJKi4ciWFXzj2oun',
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
    DATABASE: 'chance722sql',
    USERNAME: 'root',
    PASSWORD: '123456',
    PORT: 3306,
    HOST: 'localhost'
  }
}

export default config
