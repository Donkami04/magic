// React Importaciones
import { useEffect, useState, useRef } from "react";

// Contexts
import { useShoppingContext } from "../../Context/ShoppingCart";

// Llamados a la API
import { getProducts } from "../../Services/Api/Products/products";

// Componentes
import { Card } from "../../Components/Card";
import { Loading } from "../../Components/Loading";
import { ErrorOverlay } from "../../Components/ErrorOverlay";
import { FilterInput } from "../../Components/FilterInput";

// Iconos
import { BsFillSearchHeartFill } from "react-icons/bs";
import { GiBroom } from "react-icons/gi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoClose } from "react-icons/io5"; // Importa el icono de cierre

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchParams, setSearchParams] = useState({
    name: "",
    sku: "",
    price: "",
  });
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const { formatPrice } = useShoppingContext();
  const filtersRef = useRef(null);

  // Fetch products on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await getProducts();
        const modifiedData = data.map((product) => ({
          ...product,
          formattedPrice: formatPrice(product.price),
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

  const handleFilterPrice = (event) => {
    const inputValue = event.target.value.replace(/[^0-9]/g, "");
    const numericValue = parseInt(inputValue, 10);

    if (!isNaN(numericValue)) {
      setSearchParams((prev) => ({ ...prev, price: numericValue }));
    } else {
      setSearchParams((prev) => ({ ...prev, price: "" }));
    }
  };

  const toggleMenuMobile = () => setShowFiltersMobile(!showFiltersMobile);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await getProducts(
        searchParams.name,
        searchParams.price,
        searchParams.sku
      );
      const statusCode = response?.statusCode || 500;
      if (statusCode === 200) {
        setShowFiltersMobile(false);
        const modifiedData = response.data.map((product) => ({
          ...product,
          formattedPrice: formatPrice(product.price),
        }));
        setFilteredProducts(modifiedData);
      } else {
        setError("Error al obtener la lista de productos desde el servidor");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = (e) => {
    e.preventDefault();
    setSearchParams({ name: "", sku: "", price: "" });
    setFilteredProducts(products);
  };

  const closeFiltersMobile = () => {
    setShowFiltersMobile(false);
  };

  if (loading) return <Loading />;
  if (error)
    return <ErrorOverlay message={error} onClose={() => setError(null)} />;

  const renderFilterInputs = () => (
    <>
      <FilterInput
        placeholder="Buscar producto"
        value={searchParams.name}
        onChange={(event) =>
          setSearchParams((prev) => ({ ...prev, name: event.target.value }))
        }
      />
      <FilterInput
        placeholder="Filtrar por SKU"
        value={searchParams.sku}
        onChange={(event) =>
          setSearchParams((prev) => ({ ...prev, sku: event.target.value }))
        }
      />
      <FilterInput
        placeholder="Precio máximo"
        value={searchParams.price}
        onChange={handleFilterPrice}
      />
    </>
  );

  return (
    <main className="h-heighWithOutNav absolute top-20 overflow-auto grid w-full pl-[10%] pr-[10%] bg-radial-custom max-sm:p-0">
      <div className="mt-5 flex max-md:flex-col">
        {/* Filters for larger screens */}
        <aside className="text-white w-72 bg-transparent max-md:hidden mt-5">
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            {renderFilterInputs()}
            <div className="flex justify-between w-full">
              <button
                type="submit"
                className="grid place-content-center bg-white w-24 h-10 rounded-2xl m-auto hover:animate-glow hover:bg-white"
              >
                <BsFillSearchHeartFill size="1.8rem" color="#0ea5e9" />
              </button>
              <button
                onClick={clearFilters}
                className="grid place-content-center bg-sky-500 w-24 h-10 rounded-2xl m-auto hover:bg-zinc-400"
              >
                <GiBroom size="1.8rem" color="white" />
              </button>
            </div>
          </form>
        </aside>

        {/* Mobile filters */}
        <div className="md:hidden flex flex-col items-center bg-red-600">
          {showFiltersMobile && (
            <div
              ref={filtersRef}
              className="h-96 pt-3 z-10 absolute top-0 bg-black bg-opacity-90 w-full flex flex-col items-center border-b border-sky-500"
            >
              <button
                onClick={closeFiltersMobile}
                className="self-end p-2 text-white"
              >
                <IoClose size="1.5rem" />
              </button>
              <form onSubmit={handleSubmit}>
                {renderFilterInputs()}
                <div className="flex justify-between w-full max-sm:justify-evenly">
                  <button
                    type="submit"
                    className="grid place-content-center bg-white w-24 h-10 rounded-2xl m-auto hover:animate-glow hover:bg-white"
                  >
                    <BsFillSearchHeartFill size="1.8rem" color="#0ea5e9" />
                  </button>
                  <button
                    onClick={clearFilters}
                    className="grid place-content-center bg-sky-500 w-24 h-10 rounded-2xl m-auto hover:bg-zinc-400"
                  >
                    <GiBroom size="1.8rem" color="white" />
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
              <FaMagnifyingGlass />
              <p>Filtrar productos</p>
            </div>
          </div>
        </div>

        {/* Product list */}
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
            <div className="text-white font-bold border-b border-white h-40 pl-5 pr-5 inset-0 flex items-center justify-center">
              No hay productos para mostrar 😭
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
