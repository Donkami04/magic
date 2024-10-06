import { createContext, useState, useEffect, useContext } from "react";
import { getProducts } from "../Services/Api/Products/products";
import { createProduct } from "../Services/Api/Products/createProduct";
import { deleteProduct } from "../Services/Api/Products/deleteProduct";
import { getProductsBySeller } from "../Services/Api/Products/sellerProducts";
// import { AuthContext, useAuth } from "./Auth";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const [countItems, setCountItems] = useState(0);
  const [products, setProducts] = useState([]);
  const [sellerProducts, setSellerProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(true);
  const token = localStorage.getItem("jwtToken");
  const [registerForm, setRegisterForm] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const [newProductForm, setNewProductForm] = useState(null);

  // const closeOtherMenus = () => {

  // }

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

  const handleSubmitDelete = async (product) => {
    try {
      const productId = product.product.product_id;
      const response = await deleteProduct(token, productId);
      const statusCode = response?.statusCode || 500;
      if (statusCode !== 200) {
        setError("Error al eliminar el producto");
      } else {
        const newSellerProducts = await getProductsBySeller(token);
        setSellerProducts(newSellerProducts);
        setError("Producto eliminado");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getDashboardProducts = async (token) => {
    setLoading(true);
    try {
      const { data } = await getProductsBySeller(token);
      const modifiedData = data.map((product) => ({
        ...product,
        formattedPrice: formatPrice(product.price),
      }));
      setSellerProducts(modifiedData);
    } catch (error) {
      setError("Error al obtener la lista de productos desde el servidor");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
        handleSubmitDelete,
        getDashboardProducts,
        sellerProducts,
        setRegisterForm,
        registerForm,
        setLoginForm,
        loginForm,
        setNewProductForm,
        newProductForm,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingContext = () => {
  return useContext(ShoppingCartContext);
};
