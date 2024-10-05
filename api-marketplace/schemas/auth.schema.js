const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().allow("").empty("").required().messages({
    "string.email": "El email debe tener un formato válido",
    "any.required": "El email es requerido",
    "string.empty": "El email es requerido",
  }),
  password: Joi.string()
    .required()
    .min(8)
    .max(30)
    .messages({
      "any.required": "El password es requerido",
      "string.empty": "El password es requerido",
      "string.min": "El password debe tener al menos 8 caracteres",
    }),
});

module.exports = { loginSchema };
