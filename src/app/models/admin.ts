import * as Sequelize from 'sequelize'
import sequelize from './sequelize'

const adminModel = sequelize.define('admin', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, unique: true },
  name: { type: Sequelize.STRING(60), allowNull: false },
  nickname: { type: Sequelize.STRING(100) },
  pwd: { type: Sequelize.STRING(100), allowNull: false },
  avator: { type: Sequelize.STRING(100) },
  token: { type: Sequelize.STRING(200) },
  signature: { type: Sequelize.STRING(200) },
  blog_title: { type: Sequelize.STRING(100) },
  page_title: { type: Sequelize.STRING(100) },
  keywords: { type: Sequelize.STRING(100) },
  blog_address: { type: Sequelize.STRING(100) },
  blog_desc: { type: Sequelize.STRING(200) },
  email: { type: Sequelize.STRING(60) },
  icp_numbers: { type: Sequelize.STRING(60) },
  reg_time: { type: Sequelize.DATE },
  last_login_time: { type: Sequelize.DATE }
}, {
    freezeTableName: true, // 默认false修改表名为复数, true不修改表名, 与数据库同步
    tableName: 'admin',
    timestamps: false
  })

export default adminModel
