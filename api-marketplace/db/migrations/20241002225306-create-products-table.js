'use strict';

const { PRODUCT_TABLE } = require('../models/products.model'); // Asegúrate de que la ruta sea correcta

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(PRODUCT_TABLE, {
      product_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      sku: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(PRODUCT_TABLE);
  },
};
