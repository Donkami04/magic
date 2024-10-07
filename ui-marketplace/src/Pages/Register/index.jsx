// React Importaciones
import { useState, useEffect } from "react";

// Definicion de constantes

const VITE_API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

const BASE_API_URL = `${VITE_API_BASE}/api/v1/marketplace`;

// Contexts
import { useShoppingContext } from "../../Context/ShoppingCart";

// Dependencia
import axios from "axios";

// Componentes
import { ContentForm } from "../../Components/ContentForm";
import { Loading } from "../../Components/Loading";

// Iconos
import BeatLoader from "react-spinners/BeatLoader";
// import check from "../../../public/check,gif"

export const Register = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Nuevo estado para la confirmación de contraseña
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [colorEmailInput, setColorEmailInput] = useState("border-gray-300");
  const [shake, setShake] = useState(false);
  const [checkGif, setCheckGif] = useState(null);
  const { registerForm, setRegisterForm, setShowCheckGif } =
    useShoppingContext();

  const validatePassword = (password) => {
    setError(<BeatLoader color="#13AFEF" size="1rem" />);
    const minLength = 8;
    const maxLength = 30;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength || password.length > maxLength) {
      return `La contraseña debe tener entre ${minLength} y ${maxLength} caracteres.`;
    }
    if (!hasNumber.test(password)) {
      return "La contraseña debe contener al menos un número.";
    }
    if (!hasSpecialChar.test(password)) {
      return "La contraseña debe contener al menos un carácter especial.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(<BeatLoader color="#13AFEF" size="1rem" />);
    setColorEmailInput("border-gray-300");

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_API_URL}/users/new`, {
        name,
        email,
        password,
      });
      console.log(response);

      const statusCode = response?.status || 500;
      if (statusCode === 201) {
        setRegisterForm(false);
        setShowCheckGif(true);
        setTimeout(() => {
          setShowCheckGif(false);
        }, 1300);
        // setSuccess(response.data.message);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setName("");
      } else {
        const message = response?.data?.message || "Error desconocido";
        setError(message);
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setColorEmailInput("border border-red-700");
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
      const apiError = error?.response?.data?.message || "Error desconocido";
      setError(apiError);
    }
  };

  if (loading) return <Loading />;

  return (
    <ContentForm title={"Registrarse"}>
      {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <div className="mb-7">
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
        />
      </div>
      <div className="mb-7">
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className={`${colorEmailInput} mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 ${
            shake ? "animate-shake" : ""
          }`}
        />
      </div>
      <div className="mb-7">
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className={`mt-1 block w-full px-3 py-2 border ${
            password !== confirmPassword
              ? "border-2 border-red-700"
              : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500`}
        />
      </div>
      <div className="mb-7">
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmar Contraseña"
          className={`mt-1 block w-full px-3 py-2 border ${
            password !== confirmPassword
              ? "border-2 border-red-700"
              : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500`}
        />
      </div>
      <button
        onClick={handleSubmit}
        type="submit"
        className="text-1xl w-full px-4 py-2 font-semibold text-white bg-darkblue-magiclog rounded-lg hover:bg-blue-magiclog focus:outline-none focus:ring-2 focus:ring-opacity-50"
      >
        Registrarse
      </button>
    </ContentForm>
  );
};
