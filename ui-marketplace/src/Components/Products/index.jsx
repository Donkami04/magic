import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../../Context";
import { getProducts } from "../../Services/Api/products";
import { Card } from "../../Components/Card";
import { Loading } from "../../Components/Loading";
import { Layout } from "../../Components/Layout";
import { ErrorOverlay } from "../../Components/ErrorOverlay";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const context = useContext(ShoppingCartContext);
  const [showError, setShowError] = useState(true);

  const hideError = () => {
    setError(null);
    setShowError(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await getProducts();
      setProducts(data);
    } catch (error) {
      setError("Error al obtener la lista de productos desde el servidor");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  if (error) {
    return (
      <ErrorOverlay
        message="Ha ocurrido un error del servidor."
        onClose={hideError}
      />
    );
  }

  return (
    <Layout>
      <div className="h-screen w-full bg-black grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.product_id} product={product} />
        ))}
      </div>
    </Layout>
  );
};
