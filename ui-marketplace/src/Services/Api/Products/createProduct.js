import axios from "axios";

// const ENVIRONMENT = import.meta.env.ENVIRONMENT || "local";

export const BASE_API_URL = `http://localhost:3000/api/v1/marketplace`;

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
