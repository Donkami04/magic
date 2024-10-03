import axios from "axios";

const ENVIRONMENT = import.meta.env.ENVIRONMENT || "local";

export const BASE_API_URL = `http://localhost:3000/api/v1/marketplace`;

export const getProducts = async () => {
  return axios
    .get(`${BASE_API_URL}/products`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw new Error("Erro al obtener la lista de productos desde el servidor");
    });
};
