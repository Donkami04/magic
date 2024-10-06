'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products', [
      {
        name: 'Zapato',
        sku: 'AER123-A',
        price: 999,
        quantity: 10,
        user_id: 1
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('products', null, {});
  },
};
