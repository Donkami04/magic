import axios from "axios";
import { BASE_API_URL } from "../index";

export const getUsers = async (token) => {
  return axios
    .get(`${BASE_API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}` // Agregamos el token en el encabezado
      }
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw new Error(error);
    });
};
