import axios from "axios";
import { BASE_API_URL } from "../index";

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
