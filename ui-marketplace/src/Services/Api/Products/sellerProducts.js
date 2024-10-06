import axios from "axios";
import { BASE_API_URL } from "../index";

export const getProductsBySeller = async (token) => {
  return axios
    .get(`${BASE_API_URL}/products/myproducts`, {
      headers: {
        Authorization: `Bearer ${token}` // Agregamos el token en el encabezado
      }
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw new Error("Error al obtener la lista de productos del usuario");
    });
};

export const getProductsBySellerId = async (token, userId) => {
  return axios
    .get(`${BASE_API_URL}/products/seller/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}` // Agregamos el token en el encabezado
      }
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw new Error("Error al obtener la lista de productos del usuario");
    });
};
