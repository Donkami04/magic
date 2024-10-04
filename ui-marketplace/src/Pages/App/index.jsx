import { useRoutes, BrowserRouter } from "react-router-dom";
import { ShoppingCartProvider } from "../../Context";
import { Navbar } from "../../Components/Navbar";
import { Home } from "../Home";
import { Login } from "../Login";
import { Register } from "../Register";
import { NewProduct } from "../NewProduct";
import { Products } from "../../Components/Products";

import "./App.css";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Products /> },
    { path: "/login", element: <Login /> },
    { path: "/registrarse", element: <Register /> },
    { path: "/registrar/producto", element: <NewProduct /> },
  ]);

  return routes;
};

const App = () => {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </ShoppingCartProvider>
  );
};

export default App;
