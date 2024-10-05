import { useContext, useEffect, useState, useRef } from "react";
import { ShoppingCartContext } from "../../Context/ShoppingCart";
import { getProducts } from "../../Services/Api/products";
import { Card } from "../../Components/Card";
import { Loading } from "../../Components/Loading";
import { ErrorOverlay } from "../../Components/ErrorOverlay";

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
  const filtersRef = useRef(null); // Crea un ref para el contenedor del menú

  const toggleMenuMobile = () => {
    // setShowMenuMobile(!showMenuMobile);
    setShowFiltersMobile(!showFiltersMobile);
  };

  const context = useContext(ShoppingCartContext);

  /**
   * Handles changes in the name filter input.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event
   */
  const handleFilterName = (event) => {
    const newNameValue = event.target.value;
    setSearchNameValue(newNameValue);
    filterProducts(newNameValue, searchSkuValue, maxPrice);
  };

  /**
   * Handles changes in the SKU filter input.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event
   */
  const handleFilterSku = (event) => {
    const newSkuValue = event.target.value;
    setSearchSkuValue(newSkuValue);
    filterProducts(searchNameValue, newSkuValue, maxPrice);
  };

  /**
   * Handles changes in the price filter input.
   * Formats the input as a price and updates both numeric and formatted states.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event
   */
  const handleFilterPrice = (event) => {
    const inputValue = event.target.value.replace(/[^0-9]/g, "");
    const numericValue = parseInt(inputValue, 10);

    if (!isNaN(numericValue)) {
      setMaxPrice(numericValue);
      setMaxPriceFormatted(context.formatPrice(numericValue));
      filterProducts(searchNameValue, searchSkuValue, numericValue);
    } else {
      setMaxPrice("");
      setMaxPriceFormatted("");
      filterProducts(searchNameValue, searchSkuValue, "");
    }
  };

  /**
   * Filters the products based on name, SKU, and price criteria.
   * @param {string} name - The name filter value
   * @param {string} sku - The SKU filter value
   * @param {number|string} price - The maximum price filter value
   */
  const filterProducts = (name, sku, price) => {
    let filtered = products;

    if (name) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (sku) {
      filtered = filtered.filter((product) =>
        product.sku.toLowerCase().includes(sku.toLowerCase())
      );
    }

    if (price) {
      filtered = filtered.filter((product) => {
        const productPrice = parseFloat(product.price);
        return !isNaN(productPrice) && productPrice <= price;
      });
    }

    setFilteredProducts(filtered);
  };

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

  // Fetch products data on component mount
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

  // Render loading state
  if (loading) {
    return <Loading />;
  }

  // Render error state
  if (error) {
    return <ErrorOverlay message={error} onClose={() => setError(null)} />;
  }

  // Main component render
  return (
    <main className="h-heighWithOutNav absolute top-20 overflow-auto grid w-full pl-[10%] pr-[10%] bg-radial-custom max-sm:p-0">
      <div className=" ml-auto mr-auto flex max-sm:flex-col">
        {/* Filtros pantallas grandes */}
        <aside className="sticky top-0 text-white w-72 bg-transparent max-sm:hidden bg-red-600">
          {/* <div className="flex flex-col h-[50%] items-center justify-between mt-4 "> */}
          {/* Name filter input */}
          <div className="mb-4">
            <input
              type="text"
              id="name"
              placeholder="Buscar producto"
              value={searchNameValue}
              onChange={handleFilterName}
              required
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 "
            />
          </div>
          {/* SKU filter input */}
          <div className="mb-4">
            <input
              type="text"
              id="sku"
              placeholder="Filtrar por SKU"
              value={searchSkuValue}
              onChange={handleFilterSku}
              required
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 "
            />
          </div>
          {/* Price filter input */}
          <div className="mb-4">
            <input
              type="text"
              id="maxPrice"
              placeholder="Precio maximo"
              value={maxPriceFormatted}
              onChange={handleFilterPrice}
              required
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 "
            />
          </div>
          {/* </div> */}
        </aside>
        {/* Filtro para mobile */}
        <div className="bg-blue-600 sm:hidden max-sm:flex max-sm:flex-col max-sm:items-center ">
          {/* <div
          ref={filtersRef}
          className="sm:hidden max-sm:flex max-sm:flex-col max-sm:items-center max-sm:w-full bg-black border-t border-b border-white"
        > */}
          {showFiltersMobile && (
            <div
              ref={filtersRef}
              className="pt-2 bg-black w-full flex flex-col items-center border-b border-white "
            >
              {/* Name filter input */}
              <div className="mb-4 w-56">
                <input
                  type="text"
                  id="name"
                  placeholder="Buscar producto"
                  value={searchNameValue}
                  onChange={handleFilterName}
                  required
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
                  id="sku"
                  placeholder="Filtrar por SKU"
                  value={searchSkuValue}
                  onChange={handleFilterSku}
                  required
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
                  id="maxPrice"
                  placeholder="Precio maximo"
                  value={maxPriceFormatted}
                  onChange={handleFilterPrice}
                  required
                  className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
            </div>
          )}
          <div className="flex sticky text-white w-full justify-center h-10 bg-black">
            <div
              className="cursor-pointer flex justify-evenly items-center h-full w-56"
              onClick={toggleMenuMobile}
            >
              <img className="w-6 h-6" src="/glass.svg" alt="Abrir filtros" />
              <p>Filtrar productos</p>
            </div>
          </div>

          {/* </div> */}
        </div>
        {/* Product list or "No products found" message */}
        <div className="flex flex-col w-128">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="ml-20" key={product.product_id}>
                <Card product={product} />
                <div className="border-b border-white"></div>
              </div>
            ))
          ) : (
            <div className=" text-white font-bold border-b border-white h-40   pl-5 ml-20 pr-5 inset-0 flex items-center justify-center max-sm:relative">
              <p className="h-92">
                No se encontraron productos con los filtros dados 😭
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
