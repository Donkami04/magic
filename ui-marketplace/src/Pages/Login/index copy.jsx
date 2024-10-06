import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContentForm } from "../../Components/ContentForm";
import { useAuth } from "../../Context/Auth";
import { useShoppingContext } from "../../Context/ShoppingCart";
import { Loading } from "../../Components/Loading";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { user, login, loading, setLoading } = useAuth();
  const { loginForm, setLoginForm } = useShoppingContext();
  const { error, setError } = useAuth();

  useEffect(() => {
    try {
      if (user && user.rol === "vendedor") {
        console.log(user.rol);
        navigate("/dashboard");
        setLoading(false);
        // setLoginForm(false);
      }
      if (user && user.rol === "admin") {
        console.log("admin");
        navigate("/admin");
        setLoading(false);
        // setLoginForm(false);
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!email || !password) {
        setError("Todos los campos son obligatorios");
        return;
      }
      setError("");
      const response = await login(email, password); // Cambié `e` por `email` y `password`
      console.log(response);
      if (response && response.statusCode !== 200) {
        setError(response.message); // Configurando el error en caso de que no sea 200
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <ContentForm title={"Iniciar Sesión"}>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          // required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-white"
        >
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
        />
      </div>
      <button
        onClick={handleSubmit}
        type="submit"
        className="text-1xl w-full px-4 py-2 font-semibold text-white bg-darkblue-magiclog rounded-lg hover:bg-blue-magiclog focus:outline-none focus:ring-2 focus:ring-opacity-50"
      >
        Login
      </button>
    </ContentForm>
  );
};
