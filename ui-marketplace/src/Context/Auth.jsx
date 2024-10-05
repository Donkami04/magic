import { useNavigate } from "react-router-dom";
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const navigate = useNavigate();

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
    try {
      if (!email || !password)
        return {
          statusCode: 400,
          message: "El Email y el password son requeridos",
        };
      if (password.lenght < 8) {
        return {
          statusCode: 400,
          message: "El password debe tener al menos 8 caracteres",
        };
      }
      const response = await axios.post(
        "http://localhost:3000/api/v1/marketplace/auth/login",
        {
          email,
          password,
        }
      );
      const statusCode = response?.status;
      if (statusCode === 200) {
        const token = response.data.data.token;
        localStorage.setItem("jwtToken", token);
        return { statusCode };
      } else {
        const message = response.data.message;
        return { statusCode, message };
      }
    } catch (error) {
      const statusCode = error.status;
      const message = error.response.data.message;
      return { statusCode, message };
    }
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
