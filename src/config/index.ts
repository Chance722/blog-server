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
    USER: 'user',
    COMMENTS: 'comments',
    VIEWS: 'views',
    ARTICLE: 'article',
    LIKES: 'likes',
    TAG: 'tag',
    CATEGORY: 'category',
    KEYWORDS: 'keywords'
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
