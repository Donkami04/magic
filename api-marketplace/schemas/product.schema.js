const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().max(100).required().messages({
    "any.required": "El nombre del producto es requerido",
  }),
  sku: Joi.string().max(100).required().messages({
    "any.required": "El SKU del producto es requerido",
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    "any.required": "La cantidad del producto es requerida",
    "number.min": "La cantidad del producto debe ser al menos 1",
    "number.integer": "La cantidad del producto debe ser un número entero",
  }),
  price: Joi.number().integer().positive().required().messages({
    "any.required": "El precio del producto es requerido",
    "number.positive": "El precio del producto debe ser un número positivo"
  }),
});

const editProductSchema = Joi.object({
  user_id: Joi.number().required().messages({
    "any.required": "El user id del producto es requerido",
  }),
  product_id: Joi.number().required().messages({
    "any.required": "El producto id del producto es requerido",
  }),
  name: Joi.string().max(100).required().messages({
    "any.required": "El nombre del producto es requerido",
  }),
  sku: Joi.string().max(100).required().messages({
    "any.required": "El SKU del producto es requerido",
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    "any.required": "La cantidad del producto es requerida",
    "number.min": "La cantidad del producto debe ser al menos 1",
    "number.integer": "La cantidad del producto debe ser un número entero",
  }),
  price: Joi.number().integer().positive().required().messages({
    "any.required": "El precio del producto es requerido",
    "number.positive": "El precio del producto debe ser un número positivo"
  }),
});

// Exporta el esquema para su uso en la validación
module.exports = { productSchema, editProductSchema };
