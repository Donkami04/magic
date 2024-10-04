import { createContext, useState, useEffect } from "react";
import { getProducts } from "../Services/Api/products";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const [countItems, setCountItems] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(true);
  const jwtToken = localStorage.getItem("token");

  const formatPrice = (price) => {
    return (
      "$" +
      price.toLocaleString("es-CL", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    );
  };

  // Aplicar la función a un array de objetos
  const formatPricesInArray = (arr) => {
    return arr.map((obj) => ({
      ...obj,
      formattedPrice: formatPrice(obj.price),
    }));
  };

  const hideError = () => {
    setError(null);
    setShowError(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await getProducts();
      setProducts(data);
    } catch (error) {
      setError("Error al obtener la lista de productos desde el servidor");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ShoppingCartContext.Provider
      value={{
        countItems,
        setCountItems,
        hideError,
        products,
        loading,
        error,
        setError,
        formatPrice,
        formatPricesInArray,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
