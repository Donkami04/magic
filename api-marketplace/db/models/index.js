const { User, UserSchema } = require('./users.model');
const { Product, ProductSchema } = require('./products.model'); // Asegúrate de importar el modelo de productos

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));

  // Establecer asociaciones
  User.associate(sequelize.models);
  Product.associate(sequelize.models);
}

module.exports = setupModels;
