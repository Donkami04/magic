const { Product } = require("../db/models/products.model");

class ProductService {
  async getProducts() {
    try {
      const data = await Product.findAll();
      return {
        statusCode: 200,
        message: "Products information successfully obtained",
        data: data,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error getting products information");
    }
  }

  async createProduct(data, userData) {
    try {
      // Validar que se proporcione el user_id
      if (!userData.user_id) {
        return {
          statusCode: 400,
          message: "User ID is required to create a product.",
        };
      }

      // Crear un nuevo producto
      const newProduct = await Product.create({
        name: data.name,
        sku: data.sku,
        quantity: data.quantity,
        price: data.price,
        user_id: userData.user_id, // Asignar el user_id proporcionado
      });

      return {
        statusCode: 201,
        message: "Product created successfully.",
        data: newProduct,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error creating product: " + error.message);
    }
  }

  async getProductsBySeller(user_id) {
    try {
      // Buscar productos asociados al usuario
      const products = await Product.findAll({
        where: { user_id: user_id }, // Usar el user_id encontrado
      });

      return {
        statusCode: 200,
        message: "Products information successfully obtained",
        data: products,
      };
    } catch (error) {
      throw new Error("Error getting products information: " + error.message);
    }
  }
}

module.exports = { ProductService };
