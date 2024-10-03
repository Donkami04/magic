const { Model, DataTypes, Sequelize } = require("sequelize");
const USER_TABLE = "users";

const UserSchema =  {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(225),
    allowNull: false,
  },
  rol: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
};

class User extends Model {
  static associate(models) {
    // Un usuario puede tener muchos productos
    this.hasMany(models.Product, {
      as: 'products', // Alias para la relación
      foreignKey: 'user_id' // Clave foránea en la tabla de productos
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: "User",
      timestamps: false,
    };
  }
}

module.exports = { USER_TABLE, UserSchema, User };
