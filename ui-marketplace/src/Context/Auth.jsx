import { useNavigate } from "react-router-dom"; // Asegúrate de tener el hook de navegación si lo necesitas
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:3000/api/v1/marketplace/auth/decode/jwt",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            setUser({ token, ...response.data.data });
          } else {
            // localStorage.removeItem("jwtToken");
            setUser(null);
          }
        } catch (error) {
          console.error("Error al obtener el usuario:", error);
          // Aquí puedes manejar el error si es necesario
        }
      }
      setLoading(false); // Cambiar estado de carga a false al final
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      if (!email || !password) {
        return {
          statusCode: 400,
          message: "El Email y el password son requeridos",
        };
      }
      if (password.length < 8) {
        return {
          statusCode: 400,
          message: "El password debe tener al menos 8 caracteres",
        };
      }
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/v1/marketplace/auth/login",
        { email, password }
      );
      console.log(response);
      const statusCode = response?.status;
      if (statusCode === 200) {
        const token = response.data.data.token;
        localStorage.setItem("jwtToken", token);
        setUser({ token, ...response.data.data.user });
        return { statusCode };
      } else {
        const message = response.data.message;
        setLoading(false);
        return { statusCode, message };
      }
    } catch (error) {
      // const statusCode = error.response?.status || 500; // Manejar error sin status
      // const message = error.response?.data.message || "Error en el servidor.";
      // setError(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
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
        loading, // Proporcionar el estado de carga
        login,
        logout,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};
