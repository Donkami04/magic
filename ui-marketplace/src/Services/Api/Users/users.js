import axios from "axios";
// const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT || "local";

let base_url = "https://magic-log.onrender.com"
// if (ENVIRONMENT === "production") {
//   base_url = "https://magic-log.onrender.com"
// }

export const BASE_API_URL = `http://${base_url}/api/v1/marketplace`;

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
