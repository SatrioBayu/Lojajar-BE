"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UmkmImages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      umkmId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Umkms",
          key: "id",
        },
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      publicId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UmkmImages");
  },
};
