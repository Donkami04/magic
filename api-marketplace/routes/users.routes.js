const express = require("express");
const router = express.Router();
const { createUserSchema } = require("../schemas/users.schema");
const { validateData } = require("../middlewares/validator.handler");
const { checkRoles } = require("../middlewares/auth.handler");
const passport = require("passport");;
const { UserService } = require("../services/users.service");

const User = new UserService();

// Obtener usuarios
router.get("/", 
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  async (req, res, next) => {
  try {
    const response = await User.getUsers();
    if (response.data.length > 0) {
      response.data.forEach((user) => {
        delete user.dataValues.password; // Eliminamos el valor del password de cada usuario
      });
    }
    res.status(response.statusCode).json({
      statusCode: response.statusCode,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Registrar usuario
router.post(
  "/new",
  validateData(createUserSchema),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newUser = await User.createUser(data);
      res.status(newUser.statusCode).json({
        statusCode: newUser.statusCode,
        message: newUser.message,
        error: newUser.error,
        data: newUser.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);


module.exports = router;
