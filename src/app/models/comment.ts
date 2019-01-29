import * as Sequelize from 'sequelize'
import sequelize from './sequelize'

const commentModel = sequelize.define(
  'comments',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    post_id: { type: Sequelize.INTEGER, allowNull: false },
    pid: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    content: { type: Sequelize.STRING },
    likes: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    ip: { type: Sequelize.STRING(20) },
    city: { type: Sequelize.STRING(60) },
    region: { type: Sequelize.STRING(60) },
    country: { type: Sequelize.STRING(60) },
    agent: { type: Sequelize.STRING(200) },
    author_id: { type: Sequelize.INTEGER, allowNull: false },
    state: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
    create_time: { type: Sequelize.DATE },
    update_time: { type: Sequelize.DATE }
  },
  {
    freezeTableName: true, // 默认false修改表名为复数, true不修改表名, 与数据库同步
    tableName: 'comments',
    timestamps: false
  }
)

export default commentModel
