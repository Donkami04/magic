const { Model, DataTypes, Sequelize } = require("sequelize");
const { USER_TABLE } = require("./users.model");
const PRODUCT_TABLE = "products";

const ProductSchema =  {
  product_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  sku: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'user_id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
};

class Product extends Model {
  static associate(models) {
    // Un producto pertenece a un usuario
    this.belongsTo(models.User, {
      as: 'user',            // Alias para la relación
      foreignKey: 'user_id' // Clave foránea en la tabla de productos
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: "Product",
      timestamps: false,
    };
  }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product };
