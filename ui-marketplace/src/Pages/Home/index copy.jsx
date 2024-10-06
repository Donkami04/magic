import { useContext, useEffect, useState, useRef } from "react";
import { ShoppingCartContext } from "../../Context/ShoppingCart";
import { getProducts } from "../../Services/Api/Products/products";
import { Card } from "../../Components/Card";
import { Loading } from "../../Components/Loading";
import { ErrorOverlay } from "../../Components/ErrorOverlay";
import HashLoader from "react-spinners/HashLoader";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { GiBroom } from "react-icons/gi";
import { Register } from "../../Pages/Register";

/**
 * Products component for displaying and filtering a list of products.
 * @returns {JSX.Element} The rendered Products component
 */
export const Home = () => {
  // State variables
  const [loading, setLoading] = useState(true);
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
  const context = useContext(ShoppingCartContext);

  // Obtenemos los productos sin filtro
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await getProducts();
        const modifiedData = data.map((product) => ({
          ...product,
          formattedPrice: context.formatPrice(product.price),
        }));
        setProducts(modifiedData);
        setFilteredProducts(modifiedData);
      } catch (error) {
        setError("Error al obtener la lista de productos desde el servidor");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleMenuMobile = () => {
    setShowFiltersMobile(!showFiltersMobile);
  };

  // Procesamos el price para que tenga formato de dinero
  const handleFilterPrice = (event) => {
    const inputValue = event.target.value.replace(/[^0-9]/g, "");
    const numericValue = parseInt(inputValue, 10);

    if (!isNaN(numericValue)) {
      setMaxPrice(numericValue);
      setMaxPriceFormatted(context.formatPrice(numericValue));
    } else {
      setMaxPrice("");
      setMaxPriceFormatted("");
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

  //Peticion a la API para filtrar productos
  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    try {
      if (showFiltersMobile) setShowFiltersMobile(false);
      setLoading(true);
      const data = {
        name: searchNameValue,
        price: maxPrice,
        sku: searchSkuValue,
      };
      const response = await getProducts(data.name, data.price, data.sku);
      const statusCode = response?.statusCode || 500;
      if (statusCode !== 200) {
        setError("Error al obtener la lista de productos desde el servidor");
      } else {
        const modifiedData = response.data.map((product) => ({
          ...product,
          formattedPrice: context.formatPrice(product.price),
        }));
        setFilteredProducts(modifiedData);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = (e) => {
    e.preventDefault();
    setSearchNameValue("");
    setSearchSkuValue("");
    setMaxPrice("");
    setMaxPriceFormatted("");
    setFilteredProducts(products);
  };

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
    <>
      <main className="h-heighWithOutNav absolute top-20 overflow-auto grid w-full pl-[10%] pr-[10%] bg-radial-custom max-sm:p-0">
        <div className="mt-5 ml-auto mr-auto flex max-md:flex-col">
          {/* Filtros pantallas grandes */}
          <aside className=" text-white w-72 bg-transparent max-md:hidden mt-5">
            {/* <div className="flex flex-col h-[50%] items-center justify-between mt-4 "> */}
            {/* Name filter input */}
            <form
              className="flex flex-col items-center"
              onSubmit={handleSubmit}
            >
              <div className="mb-10">
                <input
                  type="text"
                  placeholder="Buscar producto"
                  value={searchNameValue}
                  onChange={(event) => setSearchNameValue(event.target.value)}
                  className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 "
                />
              </div>
              {/* SKU filter input */}
              <div className="mb-10">
                <input
                  type="text"
                  placeholder="Filtrar por SKU"
                  value={searchSkuValue}
                  onChange={(event) => setSearchSkuValue(event.target.value)}
                  className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 "
                />
              </div>
              {/* Price filter input */}
              <div className="mb-10">
                <input
                  type="text"
                  placeholder="Precio maximo"
                  value={maxPriceFormatted}
                  onChange={handleFilterPrice}
                  className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 "
                />
              </div>
              <div className="flex justify-between w-full">
                <button
                  type="submit"
                  className="grid place-content-center bg-white w-24 h-10 rounded-2xl m-auto hover:animate-glow hover:bg-white"
                >
                  <BsFillSearchHeartFill size="1.8rem" color="#0ea5e9" />
                </button>
                <button
                  onClick={(e) => clearFilters(e)}
                  className=" grid place-content-center bg-sky-500 w-24 h-10 rounded-2xl m-auto hover:bg-zinc-400"
                >
                  <GiBroom size="1.8rem" color="white" />
                </button>
              </div>
            </form>
          </aside>
          {/* Filtro para mobile */}
          <div className="md:hidden flex flex-col items-center bg-red-600">
            {showFiltersMobile && (
              <div
                ref={filtersRef}
                className="h-64 pt-3 z-10 absolute top-0 bg-black bg-opacity-90 w-full flex flex-col items-center border-b border-sky-500 "
              >
                {/* Name filter input */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-4 w-56">
                    <input
                      type="text"
                      placeholder="Buscar producto"
                      value={searchNameValue}
                      onChange={(event) =>
                        setSearchNameValue(event.target.value)
                      }
                      className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    />
                  </div>
                  {/* SKU filter input */}
                  <div className="mb-4 w-56">
                    {/* <label
                  htmlFor="sku"
                  className="block text-sm font-medium text-white"
                >
                  Buscar por SKU
                </label> */}
                    <input
                      type="text"
                      placeholder="Filtrar por SKU"
                      value={searchSkuValue}
                      onChange={(event) =>
                        setSearchSkuValue(event.target.value)
                      }
                      className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    />
                  </div>
                  {/* Price filter input */}
                  <div className="mb-4 w-56">
                    {/* <label
                  htmlFor="maxPrice"
                  className="block text-sm font-medium text-white"
                >
                  Filtrar por precio
                </label> */}
                    <input
                      type="text"
                      placeholder="Precio maximo"
                      value={maxPriceFormatted}
                      onChange={handleFilterPrice}
                      className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    />
                  </div>
                  <div className="flex justify-between w-full max-sm:justify-evenly">
                    <button
                      type="submit"
                      className="grid place-content-center bg-white w-24 h-10 rounded-2xl m-auto hover:animate-glow hover:bg-white"
                    >
                      <BsFillSearchHeartFill size="1.8rem" color="#0ea5e9" />
                    </button>
                    <button className=" grid place-content-center bg-sky-500 w-24 h-10 rounded-2xl m-auto hover:bg-zinc-400">
                      <GiBroom
                        size="1.8rem"
                        color="white"
                        onClick={(e) => clearFilters(e)}
                      />
                    </button>
                  </div>
                </form>
              </div>
            )}
            <div className="flex text-white w-full justify-center h-5 bg-black border-b border-white pb-5">
              <div
                className="cursor-pointer flex justify-evenly items-center h-full w-56"
                onClick={toggleMenuMobile}
              >
                <img className="w-6" src="/glass.svg" alt="Abrir filtros" />
                <p>Filtrar productos</p>
              </div>
            </div>
          </div>
          {/* Product list or "No products found" message */}
          <div className="flex flex-col lg:w-128 max-sm:items-center max-sm:justify-center">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  className="lg:ml-15 max-sm:w-[100%]"
                  key={product.product_id}
                >
                  <Card product={product} />
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
      </main>
    </>
  );
};
