const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().max(100).required().messages({
    "any.required": "El nombre del producto es requerido",
    "string.empty": "El nombre del producto es requerido",
  }),
  sku: Joi.string().max(100).required().messages({
    "any.required": "El SKU del producto es requerido",
    "string.empty": "El SKU del producto es requerido",
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    "any.required": "La cantidad del producto es requerida",
    "number.min": "La cantidad del producto debe ser al menos 1",
    "number.integer": "La cantidad del producto debe ser un número entero",
    "number.base": "La cantidad del producto debe ser un número entero",
  }),
  price: Joi.number().integer().positive().max(999999).required().messages({
    "any.required": "El precio del producto es requerido",
    "number.positive": "El precio del producto debe ser un número positivo",
    "number.max": "El precio del producto no puede exceder 999999",
    "number.base": "El precio del producto es requerido"
  }),
});

const editProductSchema = Joi.object({
  name: Joi.string().max(100).required().messages({
    "any.required": "El nombre del producto es requerido",
    "string.empty": "El nombre del producto es requerido",
  }),
  sku: Joi.string().max(100).required().messages({
    "any.required": "El SKU del producto es requerido",
    "string.empty": "El SKU del producto es requerido",
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    "any.required": "La cantidad del producto es requerida",
    "number.min": "La cantidad del producto debe ser al menos 1",
    "number.integer": "La cantidad del producto debe ser un número entero",
    "number.base": "La cantidad del producto debe ser un número entero",
  }),
  price: Joi.number().integer().positive().max(999999).required().messages({
    "any.required": "El precio del producto es requerido",
    "number.positive": "El precio del producto debe ser un número positivo",
    "number.max": "El precio del producto no puede exceder 999999",
    "number.base": "El precio del producto es requerido",
  }),
});

// Exporta el esquema para su uso en la validación
module.exports = { productSchema, editProductSchema };
