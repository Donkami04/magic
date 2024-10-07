import axios from "axios";
const VITE_API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

export const BASE_API_URL = `${VITE_API_BASE}/api/v1/marketplace`;

export const deleteProduct = async (token, productId) => {
  return axios
    .delete(`${BASE_API_URL}/products/delete/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw new Error(error.message);
    });
};
