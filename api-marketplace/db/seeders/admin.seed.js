'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Juan Camilo',
        email: 'admin@mail.com',
        password: '$2b$10$Zc.ejEabujCNndC/w2SRX.Fh/bTpAvnPeRFdI9HL3fa588GO/p1oW', // Asegúrate de hashear la contraseña
        rol: 'admin',
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', { email: 'admin@mail.com' }, {});
  },
};
