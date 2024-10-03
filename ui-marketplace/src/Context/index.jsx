import { createContext, useState } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const [countItems, setCountItems] = useState(0);

  return (
    <ShoppingCartContext.Provider
      value={{
        countItems,
        setCountItems,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
