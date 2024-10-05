import axios from "axios";

// const ENVIRONMENT = import.meta.env.ENVIRONMENT || "local";

export const BASE_API_URL = `http://localhost:3000/api/v1/marketplace`;

export const deleteProduct = async (token, productId) => {
  return axios
    .delete(`${BASE_API_URL}/products/delete/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => response.statusCode)
    .catch((error) => {
      console.error(error);
      throw new Error(error.message);
    });
};
