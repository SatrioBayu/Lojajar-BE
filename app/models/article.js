"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Article.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      Article.hasMany(models.ArticleImage, {
        foreignKey: "articleId",
        onDelete: "CASCADE",
      });
    }
  }
  Article.init(
    {
      userId: DataTypes.INTEGER,
      judul: DataTypes.STRING,
      isi: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Article",
    }
  );
  return Article;
};
