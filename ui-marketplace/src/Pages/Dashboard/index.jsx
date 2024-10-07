// Dependencias
import axios from "axios";

// React Importaciones
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Definicion de constantes
const VITE_API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

const BASE_API_URL = `${VITE_API_BASE}/api/v1/marketplace`;
// Contexts
import { useShoppingContext } from "../../Context/ShoppingCart";
import { useAuth } from "../../Context/Auth";

// Llamados a la API
import { getProductsBySeller } from "../../Services/Api/Products/sellerProducts";
import { deleteProduct } from "../../Services/Api/Products/deleteProduct";

// Componentes
import { Card } from "../../Components/Card";
import { Loading } from "../../Components/Loading";
import { NewProductForm } from "../../Components/NewProductForm";
import { ConfirmationModal } from "../../Components/ConfirmationModal";

// Iconos
import { IoIosAdd } from "react-icons/io";
import BeatLoader from "react-spinners/BeatLoader";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [newProdForm, setNewProdForm] = useState(false);
  const { formatPrice, setLoginForm } = useShoppingContext();
  const { user, loading, setLoading } = useAuth();
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    price: "",
    quantity: "",
  });

  // Estado para el modal de confirmación
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    setLoginForm(false);
    if (!user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [user]);

  const handleSubmitDelete = async (productId) => {
    setLoading(true);
    try {
      const response = await deleteProduct(user.token, productId);

      if (response?.statusCode === 200) {
        const newProducts = await getProductsBySeller(user.token);

        const modifiedData = newProducts.data.map((product) => ({
          ...product,
          formattedPrice: formatPrice(product.price),
        }));

        setProducts(modifiedData);
        setFilteredProducts(modifiedData);
        setError(null);
      } else {
        setError("Error: Product deletion was not successful.");
      }
    } catch (error) {
      console.error("Error deleting product:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleConfirmDelete = () => {
    if (productToDelete) {
      handleSubmitDelete(productToDelete);
      setProductToDelete(null);
    }
    setIsModalVisible(false);
  };

  const openDeleteModal = (productId) => {
    setProductToDelete(productId);
    setIsModalVisible(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(<BeatLoader color="#13AFEF" size="1rem" />);
    try {
      const response = await axios.post(
        `${BASE_API_URL}/api/v1/marketplace/products/new`,
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response && response.status !== 201) {
        setSuccess(null);
        setError(response.message);
      } else {
        setSuccess(response.data.message);
        setNewProduct({ name: "", sku: "", quantity: "", price: "" });
        const { data } = await getProductsBySeller(user.token);
        const modifiedData = data.map((product) => ({
          ...product,
          formattedPrice: formatPrice(product.price),
        }));
        setProducts(modifiedData);
        setFilteredProducts(modifiedData);
      }
    } catch (error) {
      setSuccess(null);
      setError(error.response.data.message);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {newProdForm && (
        <NewProductForm
          onSubmit={handleSubmit}
          onClose={() => {
            setNewProdForm(false);
            setNewProduct({ name: "", sku: "", quantity: "", price: "" });
            setSuccess(null);
            setError(null);
          }}
          error={error}
          success={success}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
        />
      )}
      <main className=" h-heighWithOutNav absolute top-20 overflow-auto grid w-full pl-[10%] pr-[10%] bg-radial-custom max-sm:p-0">
        <div className="mt-5 flex justify-center md:w-full">
          <aside className="h-10 flex flex-col  items-center text-white w-72 bg-transparent max-md:hidden mt-5">
            <button
              onClick={() => setNewProdForm(true)}
              className="bg-black animate-glow w-52 h-10 grid place-content-center rounded-2xl"
            >
              Crear producto
            </button>
          </aside>
          <div className="flex flex-col lg:w-96 md:justify-start max-md:w-80 h-full items-center">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  className="lg:ml-15 max-md:w-60 place-content-center max-sm:w-full"
                  key={product.product_id}
                >
                  <Card
                    product={product}
                    handleSubmitDelete={openDeleteModal}
                  />
                  <div className="border-b border-zinc-800"></div>
                </div>
              ))
            ) : (
              <div className="text-white font-bold border-b border-white h-40 pl-5 pr-5 inset-0 flex items-center justify-center max-sm:relative">
                <p className="h-92 text-center">
                  No tienes productos registrados hasta el momento{" "}
                </p>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => setNewProdForm(true)}
          className="md:hidden fixed bottom-5 left-5 bg-black animate-glow rounded-full w-16 h-16 grid place-content-center"
        >
          <IoIosAdd size="3rem" color="white" />
        </button>
      </main>
      <ConfirmationModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};
