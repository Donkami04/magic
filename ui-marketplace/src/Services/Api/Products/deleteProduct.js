import axios from "axios";
import { BASE_API_URL } from "../index";

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
