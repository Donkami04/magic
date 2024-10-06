const express = require("express");
const router = express.Router();
const { productSchema } = require("../schemas/product.schema");
const { validateData } = require("../middlewares/validator.handler");
const { checkRoles } = require("../middlewares/auth.handler");
const passport = require("passport");
const { ProductService } = require("../services/products.service");

const Product = new ProductService();

// Obtener productos
router.get("/", async (req, res, next) => {
  try {
    const response = await Product.getProducts();
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

// Obtener productos filtrados por nombre, price, SKU y/o precio
router.get("/filter", async (req, res, next) => {
  try {
    const { name, sku, price } = req.query;
    const response = await Product.getFilteredProducts(name, sku, price);
    res.status(200).json({
      statusCode: 200,
      message: "Productos filtrados obtenidos exitosamente",
      data: response.data,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Obtener productos registrados por el vendedor
router.get(
  "/myproducts",
  passport.authenticate("jwt", { session: false }),
  checkRoles("vendedor"),
  async (req, res, next) => {
    try {
      const { user_id } = req.user;
      const data = await Product.getProductsBySeller(user_id);
      res.status(data.statusCode).json({
        statusCode: data.statusCode,
        message: data.message,
        error: data.error,
        data: data.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Obtener productos registrados por el vendedor
router.get(
  "/seller/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await Product.getProductsBySeller(id);
      res.status(data.statusCode).json({
        statusCode: data.statusCode,
        message: data.message,
        error: data.error,
        data: data.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Registrar producto
// Solo usuarios registrados/vendedores
router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  checkRoles("vendedor"),
  validateData(productSchema),
  async (req, res, next) => {
    try {
      const userData = req.user;
      const data = req.body;
      const newProduct = await Product.createProduct(data, userData);
      res.status(newProduct.statusCode).json({
        statusCode: newProduct.statusCode,
        message: newProduct.message,
        error: newProduct.error,
        data: newProduct.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Editar producto
router.put(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles("vendedor"),
  validateData(productSchema),
  async (req, res, next) => {
    try {
      const product_id = req.params.id;
      const user_id = req.user.user_id;
      const changes = req.body;
      const data = await Product.editOneProduct(product_id, changes, user_id);

      res.status(data.statusCode).json({
        statusCode: data.statusCode,
        message: data.message,
        error: data.error,
        data: data.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Eliminar
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles("vendedor"),
  async (req, res, next) => {
    try {
      const product_id = req.params.id;
      const user_id = req.user.user_id;
      const data = await Product.deleteProduct(product_id, user_id);
      res.status(data.statusCode).json({
        statusCode: data.statusCode,
        message: data.message,
        error: data.error,
        data: data.data,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;
