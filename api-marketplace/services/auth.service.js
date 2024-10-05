const bcrypt = require("bcrypt");
const { User } = require("../db/models/users.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

async function loginUser(email, password) {
  console.log(email, password);
  try {
    if (!email || !password)
      return { statusCode: 400, message: "Email y password requeridos" };
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return { statusCode: 401, message: "Email o password incorrectos" };
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(isMatch);
      return {
        statusCode: 401,
        message: "Email o password incorrectos",
        data: null,
      };
    }
    delete user.dataValues.password;
    return { statusCode: 200, message: "Ok", data: user };
  } catch (error) {
    // console.error(error);
    throw error;
  }
}

function signToken(user) {
  try {
    const payload = {
      rol: user.rol,
      email: user.email,
      name: user.name,
      user_id: user.user_id,
    };
    const token = jwt.sign(payload, SECRET);
    return {
      token,
    };
  } catch (error) {
    console.error(error);
  }
}

module.exports = { loginUser, signToken };
