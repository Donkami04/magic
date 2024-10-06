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
import { Link } from "react-router-dom";
import { ContentForm } from "../../Components/ContentForm";
import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Dashboard = () => {
  // State variables
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
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
  const { formatPrice, setLoginForm } = useShoppingContext();
  const { user, loading, setLoading } = useAuth();
  const [newProdForm, setNewProdForm] = useState(null);
  // const { setLoginForm } = useAuth();
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    setLoginForm(false);
    if (!user) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        if (user) {
          const { data } = await getProductsBySeller(user.token);
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

  const handleChangeInput = (event) => {
    setSuccess(null);
    setNewProduct({
      ...newProduct,
      [event.target.name]: event.target.value,
    });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(null);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/marketplace/products/new",
        newProduct, // Este es el cuerpo de la solicitud
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Este es el encabezado con el token
          },
        }
      );
      console.log(response);
      if (response && response.status !== 201) {
        setError(response.message); // Configurando el error en caso de que no sea 200
      } else {
        setSuccess(response.data.message);
      }

      setNewProduct({
        name: "",
        sku: "",
        quantity: "",
        price: "",
      });
      const { data } = await getProductsBySeller(user.token); // Obtén los productos
      const modifiedData = data.map((product) => ({
        ...product,
        formattedPrice: formatPrice(product.price),
      }));
      setProducts(modifiedData);
      setFilteredProducts(modifiedData);
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  };

  const clearForm = () => {
    setNewProduct({
      name: "",
      sku: "",
      quantity: "",
      price: "",
    });
    setError(null);
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

  // Renderizamos componente de Carga...
  if (loading) {
    return <Loading />;
  }

  // // Renderizamos componente de error
  // if (error) {
  //   return <ErrorOverlay message={error} onClose={() => setError(null)} />;
  // }

  return (
    <>
      {newProdForm && (
        <div className="absolute w-full flex bg-black/70 h-heighWithOutNav items-center justify-center top-20 z-50">
          <form className="border-2 border-neutral-950 flex flex-col justify-around items-center md:w-96 max-sm:w-72 bg-black h-128 rounded-3xl">
            <h2 className="text-white text-lg blue-magiclog font-bold text-center ">
              Registrar producto{" "}
              <span
                onClick={() => {
                  setNewProdForm(false);
                  clearForm();
                  setSuccess(null);
                  setError(null);
                }}
                className="text-white relative left-56 bottom-6 cursor-pointer "
              >
                <IoMdCloseCircle size="1.5rem" />
              </span>
            </h2>
            {error && <p className="text-red-600 text-center px-3">{error}</p>}
            {success && (
              <p className="text-green-600 text-center px-3">{success}</p>
            )}
            <div className="mb-4 md:w-72">
              <input
                placeholder="Nombre"
                type="text"
                id="name"
                name="name" // Asegúrate de que el atributo name esté presente
                value={newProduct.name}
                onChange={handleChangeInput}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <div className="mb-4 md:w-72">
              <input
                placeholder="SKU"
                type="text"
                id="sku"
                name="sku" // Asegúrate de que el atributo name esté presente
                value={newProduct.sku}
                onChange={handleChangeInput}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <div className="mb-4 md:w-72">
              <input
                placeholder="Cantidad"
                type="number"
                id="quantity"
                name="quantity" // Asegúrate de que el atributo name esté presente
                value={newProduct.quantity}
                onChange={handleChangeInput}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <div className="mb-4 md:w-72">
              <input
                placeholder="Precio"
                type="number"
                id="price"
                name="price" // Asegúrate de que el atributo name esté presente
                value={newProduct.price}
                onChange={handleChangeInput}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="text-1xl w-24 px-4 py-2 font-semibold text-white bg-blue-magiclog rounded-lg focus:bg-darkblue-magiclog"
            >
              Crear
            </button>
          </form>
        </div>
      )}
      <main className="h-heighWithOutNav absolute top-20 overflow-auto grid w-full pl-[10%] pr-[10%] bg-radial-custom max-sm:p-0">
        <div className="mt-5 ml-auto mr-auto flex max-sm:flex-col">
          <aside className=" h-96  flex flex-col justify-evenly items-center text-white w-72 bg-transparent max-sm:hidden mt-5">
            <button
              onClick={() => setNewProdForm(true)}
              className="bg-black animate-glow w-52 h-10 grid place-content-center rounded-2xl"
            >
              Crear producto
            </button>
          </aside>
          <div className="flex flex-col lg:w-128 max-sm:items-center max-sm:justify-center">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  className="lg:ml-15 max-sm:w-[100%]"
                  key={product.product_id}
                >
                  <Card
                    product={product}
                    handleSubmitDelete={handleSubmitDelete}
                  />
                  <div className="border-b border-zinc-800"></div>
                </div>
              ))
            ) : (
              <div className=" text-white font-bold border-b border-white h-40 pl-5 pr-5 inset-0 flex items-center justify-center max-sm:relative">
                <p className="h-92 text-center">
                  No se encontraron productos{" "}
                  <span className="text-2xl">😭</span>
                </p>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => setNewProdForm(true)}
          className=" sm:hidden fixed bottom-5 left-5 bg-black animate-glow rounded-full w-16 h-16 grid place-content-center "
        >
          <IoIosAdd size="3rem" color="white" />
        </button>
      </main>
    </>
  );
};
