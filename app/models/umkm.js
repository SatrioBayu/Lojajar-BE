"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Umkm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Umkm.hasMany(models.UmkmImage, {
        foreignKey: "umkmId",
        onDelete: "CASCADE",
      });
      Umkm.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  Umkm.init(
    {
      userId: DataTypes.INTEGER,
      nama: DataTypes.STRING,
      jenis: DataTypes.STRING,
      alamat: DataTypes.STRING,
      noHp: DataTypes.STRING,
      deskripsi: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Umkm",
    }
  );
  return Umkm;
};
