import 'reflect-metadata'
import { createConnection } from 'typeorm'
import config from '../config'

createConnection(  {
  type: "mysql",
  host: config.MYSQL.HOST,
  port: config.MYSQL.PORT,
  username: config.MYSQL.USERNAME,
  password: config.MYSQL.PASSWORD,
  database: config.MYSQL.DATABASE,
  entities: [
    __dirname + "/entity/**/*.ts"
  ],
  synchronize: true,
  logging: false
}).then(async connection => {
  console.log('init tables successed.')
}).catch(err => console.log(err))