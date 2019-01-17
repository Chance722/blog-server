import * as Sequelize from 'sequelize'
import sequelize from './sequelize'

const categorysModel = sequelize.define('categorys', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, unique: true },
  name: { type: Sequelize.STRING(60), allowNull: false },
  description: { type: Sequelize.STRING(100) },
  thumb: { type: Sequelize.STRING(200) },
  type: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
  article_nums: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
  create_time: { type: Sequelize.DATE }
}, {
    freezeTableName: true, // 默认false修改表名为复数, true不修改表名, 与数据库同步
    tableName: 'categorys',
    timestamps: false
  })

export default categorysModel
