const { User } = require("../db/models/users.model");
const bcrypt = require('bcrypt');

class UserService {
  async getUsers() {
    try {
      const data = await User.findAll();
      return {
        statusCode: 200,
        message: "User information successfully obtained",
        data: data,
      };
    } catch (error) {
      throw new Error("Error getting user information");
    }
  }

  async createUser(data) {
    try {
      // Validamos si ya existe el usuario
      const existingUser = await User.findOne({
        where: { email: data.email },
      });

      // Si no existe, creamos el usuario
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = await User.create({
          name: data.name,
          email: data.email,
          password: hashedPassword,
          rol: "vendedor"
        });

        return {
          statusCode: 201,
          message: "Usuario creado, por favor inicie sesión",
          data: newUser.name,
        };
      }

      return {
        statusCode: 409,
        message: `El correo ${data.email} ya se encuentra registrado`,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error creando usuario");
    }
  }
}

module.exports = { UserService };
