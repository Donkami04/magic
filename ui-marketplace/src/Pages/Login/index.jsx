import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/Auth"; // Ajusta la ruta según tu estructura de archivos
import { ContentForm } from "../../Components/ContentForm";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await context.login(email, password);

      if (response.statusCode === 200) {
        navigate("/");
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error("Error de login:", error);
      // setError(error.message);
    }
  };

  return (
    <ContentForm title={"Iniciar Sesión"} handleSubmit={handleSubmit}>
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
