// React Importaciones
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Contexts
import { useAuth } from "../../Context/Auth";
import { useShoppingContext } from "../../Context/ShoppingCart";

// Llamados a la API
import { getProductsBySellerId } from "../../Services/Api/Products/sellerProducts";
import { getProducts } from "../../Services/Api/Products/products";
import { getUsers } from "../../Services/Api/Users/users";

// Componentes
import { Card } from "../../Components/Card";
import { Loading } from "../../Components/Loading";
import { ErrorOverlay } from "../../Components/ErrorOverlay";

// Iconos
import { FaSearch } from "react-icons/fa";
import { PiBroomBold } from "react-icons/pi";

// Componente SelectUser para seleccionar vendedores
const SelectUser = ({ usersList, selectedUser, onUserChange }) => (
  <select
    onChange={onUserChange}
    value={selectedUser}
    className="w-40 md:mt-5 scrollbar text-center select:ring-cyan-500 bg-gray-800 text-white p-2 rounded-md border-2 border-blue-500 focus:ring-2 focus:ring-sky-500"
  >
    <option value="">Vendedores</option>
    {usersList.map((user) => (
      <option key={user.user_id} value={user.user_id}>
        {user.name.toUpperCase()}
      </option>
    ))}
  </select>
);

// Botón para ejecutar la búsqueda de productos por vendedor
const SearchButton = ({ onClick }) => (
  <button
    className="mt-4 p-2 bg-blue-magiclog text-white rounded w-20 grid place-content-center"
    onClick={onClick}
  >
    <FaSearch />
  </button>
);

// Botón para reiniciar la búsqueda y obtener todos los productos
const ResetButton = ({ onClick }) => (
  <button
    className="mt-4 p-2 bg-zinc-400 text-white rounded w-20 grid place-content-center"
    onClick={onClick}
  >
    <PiBroomBold />
  </button>
);

// Componente para listar los productos
const ProductList = ({ products }) => {
  if (products.length > 0) {
    return products.map((product) => (
      <div
        className="lg:ml-15 w-[100%] grid place-content-center"
        key={product.product_id}
      >
        <Card product={product} />
        <div className="border-b border-zinc-800"></div>
      </div>
    ));
  }
  return (
    <div className="text-white font-bold border-b border-white h-40 pl-5 pr-5 inset-0 flex items-center justify-center max-sm:relative">
      <p className="h-92 text-center">
        El vendedor no tiene productos registrados
      </p>
    </div>
  );
};

// Componente principal
export const Admin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [showMenuMobile, setShowMenuMobile] = useState(true);
  const { formatPrice, setLoginForm } = useShoppingContext();
  const [usersList, setUsersList] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { user, loading, setLoading } = useAuth();
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    setLoginForm(false);
    if (!user) {
      navigate("/");
    } else {
      setIsLoadingUser(false);
    }
  }, []);

  // Llama a la API para obtener los productos y los vendedores
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        if (user) {
          const prodResponse = await getProducts();
          const { data } = await getUsers(user.token);
          const modifiedData = prodResponse.data.map((product) => ({
            ...product,
            formattedPrice: formatPrice(product.price),
          }));
          setUsersList(data);
          setProducts(modifiedData);
          setFilteredProducts(modifiedData);
        }
      } catch (error) {
        setError(error.message);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, formatPrice, setLoading]);

  const handleUserSelect = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleRequest = async () => {
    if (selectedUser) {
      try {
        setLoading(true);
        const response = await getProductsBySellerId(user.token, selectedUser);
        if (response && response.statusCode === 200) {
          const modifiedData = response.data.map((product) => ({
            ...product,
            formattedPrice: formatPrice(product.price),
          }));
          setFilteredProducts(modifiedData);
        } else {
          console.error("Error al obtener productos del vendedor");
        }
      } catch (error) {
        console.error("Error al obtener productos del vendedor:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Función para resetear la búsqueda y mostrar todos los productos
  const handleReset = async () => {
    try {
      setLoading(true);
      setSelectedUser(""); // Resetear el select a "Vendedores"
      const prodResponse = await getProducts();
      const modifiedData = prodResponse.data.map((product) => ({
        ...product,
        formattedPrice: formatPrice(product.price),
      }));
      setFilteredProducts(modifiedData); // Mostrar todos los productos
    } catch (error) {
      console.error("Error al resetear los productos:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorOverlay message={error} onClose={() => setError(null)} />;
  }

  return (
    <main className="h-heighWithOutNav absolute max-sm:top-26 top-20 overflow-auto grid w-full pl-[10%] pr-[10%] bg-radial-custom max-sm:p-0">
      <div className="flex max-md:flex-col justify-center">
        <aside className="flex flex-col items-center w-full md:w-auto md:mt-0 mt-5">
          <SelectUser
            usersList={usersList}
            selectedUser={selectedUser}
            onUserChange={handleUserSelect}
          />
          {selectedUser && (
            <div className="flex w-72 justify-evenly">
              <SearchButton onClick={handleRequest} />
              <ResetButton onClick={handleReset} />
            </div>
          )}
        </aside>
        <div className="flex flex-col lg:w-128 max-sm:items-center max-sm:justify-center">
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </main>
  );
};
