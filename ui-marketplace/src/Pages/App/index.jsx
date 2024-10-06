import React from "react";
import { useRoutes, BrowserRouter } from "react-router-dom";
import { ShoppingCartProvider } from "../../Context/ShoppingCart";
import { AuthProvider } from "../../Context/Auth"; // Importa el AuthProvider
import { Navbar } from "../../Components/Navbar";
import { Home } from "../Home";
import { Login } from "../Login";
import { Register } from "../Register";
// import { NewProduct } from "../NewProduct";
import { Dashboard } from "../Dashboard";
import { Admin } from "../../Pages/Admin";
import { NotFound } from "../../Components/NotFound";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/admin", element: <Admin /> },
    { path: "/*", element: <NotFound /> },
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
