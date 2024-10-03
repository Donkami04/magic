import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../../Context";
import { getProducts } from "../../Services/Api/products";
import { Card } from "../../Components/Card";
import { Loading } from "../../Components/Loading";
import { Layout } from "../../Components/Layout";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const context = useContext(ShoppingCartContext);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await getProducts();
      setProducts(data);
    } catch (error) {
      setError("Error al obtener la lista de productos desde el servidor");
      console.error(error);
    } finally {
      // setLoading(false);
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
    ); // O un componente de carga más elegante
  }

  if (error) {
    return <div>{error}</div>; // O un componente de error más elegante
  }

  return (
    <Layout>
      <button
        className="animate-pulse"
        onClick={() => context.setCountItems(context.countItems + 1)}
      >
        Más
      </button>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div> */}
    </Layout>
  );
};
