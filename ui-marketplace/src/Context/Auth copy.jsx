import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verificar si hay un token almacenado al cargar la aplicación
    const token = localStorage.getItem("token");
    if (token) {
      // Aquí podrías decodificar el token o hacer una llamada a la API
      // para obtener la información del usuario
      setUser({ token });
    }
  }, []);

  const login = async (credentials) => {
    console.log(credentials);
    // Aquí iría la lógica para hacer la petición de login a tu API
    // Por ahora, simularemos una respuesta exitosa
    const response = { token: "fake_jwt_token" };

    localStorage.setItem("jwtToken", response.token);
    setUser({ token: response.token });
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={{ value }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
