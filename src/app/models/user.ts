import * as Sequelize from 'sequelize'
import sequelize from './sequelize'

const userModel = sequelize.define('user', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, unique: true },
  name: { type: Sequelize.STRING(60), allowNull: false },
  email: { type: Sequelize.STRING(60), allowNull: false },
  homepage: { type: Sequelize.STRING(200) },
  ip: { type: Sequelize.STRING(20) },
  status: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
  create_time: { type: Sequelize.DATE }
}, {
    freezeTableName: true, // 默认false修改表名为复数, true不修改表名, 与数据库同步
    tableName: 'user',
    timestamps: false
  })

export default userModel
