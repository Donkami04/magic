import React, { useState } from "react";
import { ContentForm } from "../../Components/ContentForm";
import axios from "axios";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [succes, setSucces] = useState(null);

  const handleSubmit = async (e) => {
    setError(null);
    setSucces(null);
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/marketplace/users/new",
        {
          name,
          email,
          password,
        }
      );

      const statusCode = response?.status || 500;
      console.log(statusCode);
      if (statusCode === 201) {
        setSucces(response.data.message);
        setEmail("");
        setPassword("");
        setName("");
      } else {
        const message = response?.data?.message || "Error desconocido";
        setError(message);
      }
    } catch (error) {
      const apiError = error?.response?.data?.message || "Error desconocido";
      console.log(error);
      setError(apiError);
    }
  };

  return (
    <ContentForm title={"Registrarse"}>
      {succes && <p className="text-green-500 mb-4 text-center">{succes}</p>}
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-white">
          Nombre
        </label>
        <input
          type="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 "
        />
      </div>
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
          // required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 "
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
