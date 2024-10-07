import axios from "axios";
const VITE_API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

const BASE_API_URL = `${VITE_API_BASE}/api/v1/marketplace`;

export const createProduct = async (token, data) => {
  return axios
    .post(`${BASE_API_URL}/products/new`, {
      headers: {
        Authorization: `Bearer ${token}`
      }, 
      data
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw new Error(error.message);
    });
};
