const express = require("express");
const router = express.Router();
const { loginSchema } = require("../schemas/auth.schema");
const { validateData } = require("../middlewares/validator.handler");
const passport = require("passport");
const { signToken } = require("../services/auth.service");
const jwt = require("jsonwebtoken");

// const SECRET = process.env.JWT_SECRET;

router.post(
  "/login",
  // validateData(loginSchema),
  passport.authenticate("local", { session: false }),
  validateData(loginSchema),

  async (req, res, next) => {
    try {
      const user = req.user;
      if (user.statusCode === 401) {
        res.status(user.statusCode).json({
          statusCode: user.statusCode,
          message: user.message,
          error: user.error,
          data: user.data,
        });
      } else {
        const tokenData = signToken(user.data.dataValues); // Genera el token
        res.status(user.statusCode).json({
          statusCode: user.statusCode,
          message: user.message,
          error: user.error,
          data: {
            user: user.data,
            token: tokenData.token, // Agrega el token generado
          },
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

// Obtener informacion del JWT
router.get(
  "/decode/jwt",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { user_id, rol } = req.user;
      const data = {
        user_id,
        rol,
      }
      res.status(200).json({
        statusCode: 200,
        data: data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;
