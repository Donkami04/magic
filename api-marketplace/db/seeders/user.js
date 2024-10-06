'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        name: 'aaa',
        email: 'aaa@mail.com',
        password: '$2b$10$Zc.ejEabujCNndC/w2SRX.Fh/bTpAvnPeRFdI9HL3fa588GO/p1oW',
        rol: 'admin',
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', { email: 'aaa@mail.com' }, {});
  },
};
