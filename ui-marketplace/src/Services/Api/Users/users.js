import axios from "axios";
const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT || "local";

let base_url = ""
if (ENVIRONMENT === "production") {
  base_url = "https://magic-log.onrender.com"
} else {
  base_url = "http://3.218.40.246:3000"
}

export const BASE_API_URL = `${base_url}/api/v1/marketplace`;

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
