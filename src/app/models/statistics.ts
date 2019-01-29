import * as Sequelize from 'sequelize'
import sequelize from './sequelize'

const statisticsModel = sequelize.define(
  'statistics',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    name: { type: Sequelize.STRING(60), allowNull: false },
    description: { type: Sequelize.STRING(60) },
    user_id: { type: Sequelize.INTEGER },
    content: { type: Sequelize.STRING },
    create_time: { type: Sequelize.DATE }
  },
  {
    freezeTableName: true, // 默认false修改表名为复数, true不修改表名, 与数据库同步
    tableName: 'statistics',
    timestamps: false
  }
)

export default statisticsModel
