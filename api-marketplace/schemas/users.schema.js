const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string().required().min(3).max(100).messages({
    "any.required": "El nombre del usuario es requerido",
    "string.empty": "El nombre del usuario es requerido",
    "string.min": "El nombre del usuario debe tener al menos 3 caracteres",
  }),
  email: Joi.string().email().allow("").empty("").required().messages({
    "string.email": "El email debe tener un formato valido",
    "any.required": "El email es requerido",
    "string.empty": "El email es requerido",
  }),
  password: Joi.string()
    .required()
    .min(8)
    .max(30)
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/)
    .messages({
      "any.required": "El password es requerido",
      "string.pattern.base":
        "El password debe contener al menos un número y un carácter especial",
      "string.min": "El password debe tener al menos 8 caracteres",
      "string.max": "El password debe tener maximo 30 caracteres",
      "string.empty": "El password es requerido",
    }),
});

module.exports = { createUserSchema };
