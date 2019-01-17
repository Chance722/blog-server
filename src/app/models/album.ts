import * as Sequelize from 'sequelize'
import sequelize from './sequelize'

const albumModel = sequelize.define('album', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, unique: true },
  url: { type: Sequelize.STRING(200), allowNull: false },
  content: { type: Sequelize.STRING, allowNull: false },
  tags: { type: Sequelize.STRING(60) },
  type: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
  state: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
  likes: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
  comments: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
  views: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
  weather: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
  address: { type: Sequelize.STRING(60) },
  color: { type: Sequelize.STRING(60) },
  create_time: { type: Sequelize.DATE },
  update_time: { type: Sequelize.DATE }
}, {
    freezeTableName: true, // 默认false修改表名为复数, true不修改表名, 与数据库同步
    tableName: 'album',
    timestamps: false
  })

export default albumModel
