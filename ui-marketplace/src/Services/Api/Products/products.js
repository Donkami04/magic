import axios from "axios";
import { BASE_API_URL } from "../index";

export const getProducts = async (name = '', price = '', sku = '') => {
  // Crear un array para almacenar los parámetros de consulta
  const queryParams = [];

  // Agregar solo los parámetros que no son vacíos
  if (name) queryParams.push(`name=${encodeURIComponent(name)}`);
  if (price) queryParams.push(`price=${encodeURIComponent(price)}`);
  if (sku) queryParams.push(`sku=${encodeURIComponent(sku)}`);

  // Unir los parámetros con '&' para formar la cadena de consulta
  const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
  return axios
    .get(`${BASE_API_URL}/products/filter${queryString}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw new Error("Error al obtener la lista de productos desde el servidor");
    });
};