import { Layout } from "../../Components/Layout";
import React, { useState } from "react";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de inicio de sesión
    console.log("Email:", email);
    console.log("Password:", password);
  };
  return (
    <Layout>
      <div className="flex items-center justify-center h-heighWithOutNav bg-radial-custom">
        <div className="w-full max-w-md p-8 rounded-lg shadow-md max-sm:w-72 animate-glow">
          <h2 className="text-white text-2xl font-bold text-center ">
            Iniciar sesión
          </h2>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 "
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
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 "
              />
            </div>
            <button
              type="submit"
              className="text-1xl w-full px-4 py-2 font-semibold text-white bg-darkblue-magiclog rounded-lg hover:bg-blue-magiclog focus:outline-none focus:ring-2 focus:ring-opacity-50"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};
