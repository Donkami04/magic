// React Importaciones
import { createContext, useState, useContext } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const [countItems, setCountItems] = useState(0);
  const [loginForm, setLoginForm] = useState(false);
  const [registerForm, setRegisterForm] = useState(null);
  const [newProductForm, setNewProductForm] = useState(true);
  const [showCheckGif, setShowCheckGif] = useState(false);

  // Funciones auxiliares
  const formatPrice = (price) => {
    return (
      "$" +
      price.toLocaleString("es-CL", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    );
  };

  // Cambia el formato de un numero a dinero
  const formatPricesInArray = (arr) => {
    return arr.map((obj) => ({
      ...obj,
      formattedPrice: formatPrice(obj.price),
    }));
  };

  const contextValue = {
    countItems,
    setCountItems,
    formatPrice,
    formatPricesInArray,
    setLoginForm,
    loginForm,
    setRegisterForm,
    registerForm,
    setShowCheckGif,
    showCheckGif,
  };

  return (
    <ShoppingCartContext.Provider value={contextValue}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

// Hook personalizado para usar el contexto del carrito de compras
export const useShoppingContext = () => useContext(ShoppingCartContext);
