const { Product } = require("../db/models/products.model");
const { Op } = require("sequelize");

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

  // Controlador para obtener productos filtrados por nombre, SKU y/o precio
  async getFilteredProducts(name, sku, price) {
    try {
      price = Number(price)
      const conditions = {};
      if (name) {
        conditions.name = {
          [Op.like]: `%${name.toLowerCase()}%`,
        };
      }

      if (sku) {
        conditions.sku = {
          [Op.like]: `%${sku.toLowerCase()}%`,
        };
      }

      if (price) {
        conditions.price = {
          [Op.lte]: price,
        };
      }

      // Realizar la búsqueda
      const data = await Product.findAll({ where: conditions });

      return {
        statusCode: 200,
        message: "Productos filtrados obtenidos exitosamente",
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
        name: data.name.toLowerCase(),
        sku: data.sku.toLowerCase(),
        quantity: data.quantity || 0,
        price: data.price,
        user_id: userData.user_id, // Asignar el user_id proporcionado
      });

      return {
        statusCode: 201,
        message: "Producto creado",
        data: newProduct,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error creando el producto: " + error.message);
    }
  }

  async getProductsBySeller(user_id) {
    try {
      const products = await Product.findAll({
        where: { user_id: user_id },
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
