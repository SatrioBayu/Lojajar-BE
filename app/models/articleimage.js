"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ArticleImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ArticleImage.belongsTo(models.Article, {
        foreignKey: "articleId",
        onDelete: "CASCADE",
      });
    }
  }
  ArticleImage.init(
    {
      articleId: DataTypes.INTEGER,
      image: DataTypes.STRING,
      publicId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ArticleImage",
    }
  );
  return ArticleImage;
};
