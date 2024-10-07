import axios from "axios";
const VITE_API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

const BASE_API_URL = `${VITE_API_BASE}/api/v1/marketplace`;

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
