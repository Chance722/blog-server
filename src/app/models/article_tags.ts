import * as Sequelize from 'sequelize'
import sequelize from './sequelize'

const articleTagsModel = sequelize.define(
  'article_tags',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    articleId: { type: Sequelize.INTEGER, allowNull: false },
    tagId: { type: Sequelize.INTEGER, allowNull: false }
  },
  {
    freezeTableName: true, // 默认false修改表名为复数, true不修改表名, 与数据库同步
    tableName: 'article_tags',
    timestamps: false
  }
)

export default articleTagsModel
