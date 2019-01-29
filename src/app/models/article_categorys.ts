import * as Sequelize from 'sequelize'
import sequelize from './sequelize'

const articleCategorysModel = sequelize.define(
  'article_categorys',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    articleId: { type: Sequelize.INTEGER, allowNull: false },
    categoryId: { type: Sequelize.INTEGER, allowNull: false }
  },
  {
    freezeTableName: true, // 默认false修改表名为复数, true不修改表名, 与数据库同步
    tableName: 'article_categorys',
    timestamps: false
  }
)

export default articleCategorysModel
