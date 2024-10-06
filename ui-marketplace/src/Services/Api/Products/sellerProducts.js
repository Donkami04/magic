import axios from "axios";
const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT || "local";

let base_url = ""
if (ENVIRONMENT === "production") {
  base_url = "https://magic-log.onrender.com"
} else {
  base_url = "http://localhost:3000"
}

export const BASE_API_URL = `${base_url}/api/v1/marketplace`;

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
