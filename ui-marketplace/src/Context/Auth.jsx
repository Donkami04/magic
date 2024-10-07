// React Importaciones
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Definición de constantes
const VITE_API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";
const API_BASE_URL = `${VITE_API_BASE}/api/v1/marketplace`;
const TOKEN_KEY = "jwtToken";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingUser, setloadingUser] = useState(null);

  // Verificamos si hay un token en el localstorage
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        try {
          const response = await axios.get(`${API_BASE_URL}/auth/decode/jwt`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.status === 200) {
            setUser({ token, ...response.data.data });
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error("Error al obtener el usuario:", error);
          setError("No se pudo obtener la información del usuario");
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  // Función de inicio de sesión
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      const { status, data } = response;

      if (status === 200) {
        const { token, user: userData } = data.data;
        localStorage.setItem(TOKEN_KEY, token);
        setUser({ token, ...userData });
        return { statusCode: status };
      } else {
        return { statusCode: status, message: data.message };
      }
    } catch (error) {
      const statusCode = error.response?.status || 500;
      const message = error.response?.data.message || "Error en el servidor";
      setError(message);
      return { statusCode, message };
    } finally {
      // setLoading(false);
    }
  };

  // Función de cierre de sesión
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  const contextValue = {
    user,
    loading,
    login,
    logout,
    setLoading,
    error,
    setError,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Hook personalizado para usar el context de autenticación
export const useAuth = () => useContext(AuthContext);
