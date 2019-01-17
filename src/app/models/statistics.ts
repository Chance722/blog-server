import * as Sequelize from 'sequelize'
import sequelize from './sequelize'

const statisticsModel = sequelize.define('statistics', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, unique: true },
  type: { type: Sequelize.STRING(60), allowNull: false },
  nums: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
  type_desc: { type: Sequelize.STRING(60) },
  create_time: { type: Sequelize.DATE }
}, {
    freezeTableName: true, // 默认false修改表名为复数, true不修改表名, 与数据库同步
    tableName: 'statistics',
    timestamps: false
  })

export default statisticsModel
