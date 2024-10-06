import axios from "axios";
// const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT || "local";

let base_url = "https://magic-log.onrender.com"
// if (ENVIRONMENT === "production") {
//   base_url = "https://magic-log.onrender.com"
// }

export const BASE_API_URL = `http://${base_url}/api/v1/marketplace`;

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
