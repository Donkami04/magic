import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginRequest = async () => {
    return axios
      .get(`http://localhost:3000/api/v1/marketplace/auth/login`)
      .then((response) => response.data)
      .catch((error) => {
        throw new Error("Error al iniciar sesión (API): ", error);
      });
  };

  useEffect(() => {
    // Verificar si hay un token almacenado al cargar la aplicación
    const token = localStorage.getItem("token");
    if (token) {
      // Aquí podrías decodificar el token o hacer una llamada a la API
      // para obtener la información del usuario
      setUser({ token });
    }
  }, []);

  const login = async (email, password) => {
    console.log(email, password);
    return axios
      .get(`http://localhost:3000/api/v1/marketplace/auth/login`)
      .then((response) => response.data)
      .catch((error) => {
        throw new Error("Error al iniciar sesión (API): ", error);
      });
    const response = { token: "fake_jwt_token" };

    localStorage.setItem("jwtToken", response.token);
    setUser({ token: response.token });
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
