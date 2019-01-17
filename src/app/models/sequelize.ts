/**
 * Sequelize实例化文件
 */
import * as Sequelize from 'sequelize'
import config from '../../config'

const sequelize = new Sequelize(
  config.MYSQL.DATABASE,
  config.MYSQL.USERNAME,
  config.MYSQL.PASSWORD,
  {
    host: config.MYSQL.HOST,
    port: config.MYSQL.PORT,
    dialect: 'mysql',
    define: { timestamps: false },
    native: false,
    // operatorsAliases: false 如果没加会报错警告： sequelize deprecated String based operators are now deprecated. Please use Symbol based operators for better security
    // 参考链接 http://docs.sequelizejs.com/manual/tutorial/querying.html#operators-security
    operatorsAliases: false,
    timezone: '+08:00'
  }
)

export default sequelize
