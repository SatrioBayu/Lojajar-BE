"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Surat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Surat.init(
    {
      nama: DataTypes.STRING,
      nik: DataTypes.STRING,
      namaPemohon: DataTypes.STRING,
      nikPemohon: DataTypes.STRING,
      noWa: DataTypes.STRING,
      jenis: DataTypes.STRING,
      keterangan: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Surat",
    }
  );
  return Surat;
};
