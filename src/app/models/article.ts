import * as Sequelize from 'sequelize'
import sequelize from './sequelize'

const articleModel = sequelize.define(
  'article',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    blog_title: { type: Sequelize.STRING(100), allowNull: false },
    keywords: { type: Sequelize.STRING(60) },
    description: { type: Sequelize.STRING(200) },
    tags: { type: Sequelize.STRING(60) },
    content: { type: Sequelize.STRING },
    status: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    open: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    thumb: { type: Sequelize.STRING(100) },
    category: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    create_time: { type: Sequelize.DATE },
    update_time: { type: Sequelize.DATE },
    views: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    likes: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    comments: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 }
  },
  {
    freezeTableName: true, // 默认false修改表名为复数, true不修改表名, 与数据库同步
    tableName: 'article',
    timestamps: false
  }
)

export default articleModel
