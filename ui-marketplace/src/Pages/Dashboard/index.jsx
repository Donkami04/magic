import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../Context/Auth";
import { getProductsBySeller } from "../../Services/Api/Products/sellerProducts";
import { Card } from "../../Components/Card";
import { Loading } from "../../Components/Loading";
import { ErrorOverlay } from "../../Components/ErrorOverlay";
import { createProduct } from "../../Services/Api/Products/createProduct";
import { deleteProduct } from "../../Services/Api/Products/deleteProduct";
import HashLoader from "react-spinners/HashLoader";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { GiBroom } from "react-icons/gi";
import { IoIosAdd } from "react-icons/io";
import { useAuth } from "../../Context/Auth";
import { useShoppingContext } from "../../Context/ShoppingCart";
import { Modal } from "../../Components/Modal";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  // State variables
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchNameValue, setSearchNameValue] = useState("");
  const [searchSkuValue, setSearchSkuValue] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [maxPriceFormatted, setMaxPriceFormatted] = useState("");
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [showMenuMobile, setShowMenuMobile] = useState(true);
  const filtersRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { formatPrice } = useShoppingContext();
  const { user, loading, setLoading } = useAuth();
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        if (user) {
          const { data } = await getProductsBySeller(user.token); // Obtén los productos
          const modifiedData = data.map((product) => ({
            ...product,
            formattedPrice: formatPrice(product.price),
          }));
          setProducts(modifiedData);
          setFilteredProducts(modifiedData);
        }
      } catch (error) {
        setError(error.message);
        console.error(error);
      } finally {
        setLoading(null);
      }
    };
    fetchData();
  }, [user]);

  const toggleMenuMobile = () => {
    setShowFiltersMobile(!showFiltersMobile);
  };

  const handleSubmitDelete = async (productId) => {
    setLoading(true);
    try {
      const response = await deleteProduct(user.token, productId);
      const statusCode = response?.statusCode || 500;
      if (statusCode !== 200) {
        setError("Error al eliminar el producto");
      } else {
        const newSellerProducts = await getProductsBySeller(token);
        const modifiedData = newSellerProducts.map((product) => ({
          ...product,
          formattedPrice: formatPrice(product.price),
        }));
        setProducts(modifiedData);
        setFilteredProducts(modifiedData);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Si hace click fuera del menu mobile este se cierra
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filtersRef.current && !filtersRef.current.contains(event.target)) {
        setShowFiltersMobile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {}, [filteredProducts]);

  // Renderizamos componente de Carga...
  if (loading) {
    return (
      // <div className="h-heighWithOutNav absolute top-20 grid w-full pl-[10%] pr-[10%] bg-radial-custom max-sm:p-0">
      // </div>
      <Loading />
    );
  }

  // Renderizamos componente de error
  if (error) {
    return <ErrorOverlay message={error} onClose={() => setError(null)} />;
  }

  return (
    <main className="h-heighWithOutNav absolute top-20 overflow-auto grid w-full pl-[10%] pr-[10%] bg-radial-custom max-sm:p-0">
      <div className="mt-5 ml-auto mr-auto flex max-sm:flex-col">
        <aside className=" h-96  flex flex-col justify-evenly items-center text-white w-72 bg-transparent max-sm:hidden mt-5">
          <Link to={"/registrar/producto"}>
            <button className="bg-black animate-glow w-52 h-10 grid place-content-center rounded-2xl">
              Crear producto
            </button>
          </Link>
        </aside>
        <div className="flex flex-col lg:w-128 max-sm:items-center max-sm:justify-center">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="lg:ml-15" key={product.product_id}>
                <Card
                  product={product}
                  handleSubmitDelete={handleSubmitDelete}
                />
                <div className="border-b border-zinc-800"></div>
              </div>
            ))
          ) : (
            <div className=" text-white font-bold border-b border-white h-40   pl-5 ml-20 pr-5 inset-0 flex items-center justify-center max-sm:relative">
              <p className="h-92 text-center">
                No se encontraron productos <span className="text-2xl">😭</span>
              </p>
            </div>
          )}
        </div>
      </div>
      <button className=" sm:hidden fixed bottom-5 left-5 bg-black animate-glow rounded-full w-16 h-16 grid place-content-center ">
        <IoIosAdd size="3rem" color="white" />
      </button>
    </main>
  );
};
