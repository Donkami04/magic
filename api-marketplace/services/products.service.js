const { Product } = require("../db/models/products.model");

class ProductService {
  async getProducts() {
    try {
      const data = await Product.findAll();
      return {
        statusCode: 200,
        message: "Product information successfully obtained",
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
        message: "Product information successfully obtained",
        data: products,
      };
    } catch (error) {
      throw new Error("Error getting products information: " + error.message);
    }
  }

  async editOneProduct(product_id, changes, user_id) {
    try {
      // Intentamos actualizar el producto directamente
      const response = await Product.update(changes, {
        where: { product_id: product_id, user_id: user_id },
      });

      // Si no se actualizó ningún registro, verificamos el motivo
      if (response[0] === 0) {
        const product = await Product.findOne({
          where: { product_id: product_id },
        });

        if (product) {
          return {
            statusCode: 403,
            message: "You are not authorized to modify this product",
          };
        }

        return {
          statusCode: 404,
          message: "The product does not exist",
        };
      }

      return {
        statusCode: 200,
        message: "The product has been successfully edited",
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error editing product");
    }
  }

  async deleteProduct(product_id, user_id) {
    try {
      // Intentamos eliminar el producto directamente
      const response = await Product.destroy({
        where: { product_id: product_id, user_id: user_id },
      });

      // Si no se eliminó ningún registro, verificamos el motivo
      if (response === 0) {
        const product = await Product.findOne({
          where: { product_id: product_id },
        });

        if (product) {
          return {
            statusCode: 403,
            message: "You are not authorized to delete this product",
          };
        }

        return {
          statusCode: 404,
          message: "The product does not exist",
        };
      }

      return {
        statusCode: 200,
        message: "The product has been deleted successfully",
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error deleting product");
    }
  }
}

module.exports = { ProductService };
