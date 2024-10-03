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

// Obtener productos registrados por el vendedor
router.post(
  "/myproducts",
  passport.authenticate("jwt", { session: false }),
  checkRoles("vendedor"),
  async (req, res, next) => {
    try {
      const { user_id } = req.user;
      const newProduct = await Product.getProductsBySeller(user_id);
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

router.put(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles("vendedor"),
  validateData(productSchema),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const changes = req.body;
      const data = await Product.editOneProduct(id, changes);
      res.status(data.status).json({
        status: data.status,
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

// router.delete(
//   "/remove/:id",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res, next) => {
//     try {
//       const id = req.params.id;
//       const userDeleted = await deleteProduct(id);
//       res.status(userDeleted.status).json({
//         status: userDeleted.status,
//         message: userDeleted.message,
//         error: userDeleted.error,
//         data: userDeleted.data,
//       });
//     } catch (error) {
//       console.error(error);
//       next(error);
//     }
//   }
// );

module.exports = router;
