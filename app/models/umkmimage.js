"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UmkmImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UmkmImage.belongsTo(models.Umkm, {
        foreignKey: "umkmId",
        onDelete: "CASCADE",
      });
    }
  }
  UmkmImage.init(
    {
      umkmId: DataTypes.INTEGER,
      image: DataTypes.STRING,
      publicId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UmkmImage",
    }
  );
  return UmkmImage;
};
