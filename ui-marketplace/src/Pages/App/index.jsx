// React Importaciones
import { useRoutes, BrowserRouter } from "react-router-dom";

// Contexts
import { ShoppingCartProvider } from "../../Context/ShoppingCart";
import { AuthProvider } from "../../Context/Auth";

// Componentes
import { Navbar } from "../../Components/Navbar";
import { Home } from "../Home";
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
