import React from "react";
import { useRoutes, BrowserRouter } from "react-router-dom";
import { ShoppingCartProvider } from "../../Context/ShoppingCart";
import { AuthProvider } from "../../Context/Auth"; // Importa el AuthProvider
import { Navbar } from "../../Components/Navbar";
import { Home } from "../Home";
import { Login } from "../Login";
import { Register } from "../Register";
import { NewProduct } from "../NewProduct";
import { Dashboard } from "../Dashboard";
import { Modal } from "../../Components/Modal";
import { Admin } from "../../Pages/Admin";
// import { Products } from "../../Components/Products";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/modal", element: <Modal /> },
    { path: "/login", element: <Login /> },
    { path: "/registrarse", element: <Register /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/registrar/producto", element: <NewProduct /> },
    { path: "/admin", element: <Admin /> },
  ]);

  return routes;
};

const App = () => {
  return (
    <AuthProvider>
      <ShoppingCartProvider>
        <BrowserRouter>
          <Navbar />
          <AppRoutes />
        </BrowserRouter>
      </ShoppingCartProvider>
    </AuthProvider>
  );
};

export default App;
