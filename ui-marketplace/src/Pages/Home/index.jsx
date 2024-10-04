import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../../Context/ShoppingCart";
import { getProducts } from "../../Services/Api/products";
import { Card } from "../../Components/Card";
import { Loading } from "../../Components/Loading";
import { Layout } from "../../Components/Layout";
import { ErrorOverlay } from "../../Components/ErrorOverlay";
import { Products } from "../../Components/Products";

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(true);
  const [filteredObjects, setFilteredObjects] = useState([]);
  const context = useContext(ShoppingCartContext);

  const products = context.products;

  const handleFilterName = (event) => {
    const result = products.filter((product) =>
      product.name.includes(event.target.value)
    );
    setFilteredObjects(result);
  };

  // const hideError = () => {
  //   setError(null);
  //   setShowError(false);
  // };

  // if (loading) {
  //   return (
  //     <div>
  //       <Loading />
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <ErrorOverlay
  //       message="Ha ocurrido un error del servidor."
  //       onClose={hideError}
  //     />
  //   );
  // }

  return (
    <Products>
      <div className="flex flex-col h-[50%] items-center justify-between mt-4 ">
        <div className="mb-4">
          <input
            type="email"
            id="email"
            placeholder="Ej. Bolso"
            // value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 "
          />
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white"
          >
            Buscar por nombre
          </label>
        </div>
        <div className="mb-4">
          <input
            type="email"
            id="email"
            placeholder="Ej. Bolso"
            // value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 "
          />
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white"
          >
            Buscar por SKU
          </label>
        </div>
        <div className="mb-4">
          <input
            type="email"
            id="email"
            placeholder="Ej. Bolso"
            // value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 "
          />
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white"
          >
            Filtrar por precio
          </label>
        </div>
      </div>
    </Products>
  );
};
