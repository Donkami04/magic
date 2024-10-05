import axios from "axios";

// const ENVIRONMENT = import.meta.env.ENVIRONMENT || "local";

export const BASE_API_URL = `http://localhost:3000/api/v1/marketplace`;

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
