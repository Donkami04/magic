// React Importaciones
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Contexts
import { useAuth } from "../../Context/Auth";

// Componentes
import { ContentForm } from "../../Components/ContentForm";
import { Loading } from "../../Components/Loading";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { user, login, loading, setLoading } = useAuth();
  const { error, setError } = useAuth();

  useEffect(() => {
    try {
      if (user && user.rol === "vendedor") {
        console.log(user.rol);
        navigate("/dashboard");
        // setLoading(false);
      }
      if (user && user.rol === "admin") {
        console.log("admin");
        navigate("/admin");
        // setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        setError("Todos los campos son obligatorios");
        return;
      }

      const response = await login(email, password);
      console.log(response);
      if (response && response.statusCode !== 200) {
        setError(response.message);
      } else {
        setError(null);
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
