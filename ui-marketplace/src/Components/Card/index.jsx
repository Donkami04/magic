// React Importaciones
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Contexts
import { useShoppingContext } from "../../Context/ShoppingCart";

// Iconos
import { FaTrash } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

export const Card = ({ product, handleSubmitDelete }) => {
  const [adminButtons, setAdminButtons] = useState(null);
  const [noButtons, setNoButtons] = useState(null);
  const { setCountItems, countItems } = useShoppingContext();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setAdminButtons(true);
    }
    if (location.pathname === "/admin") {
      setNoButtons(true);
    }
  }, []);

  return (
    <div className="flex my-5 w-full max-md:w-80 lg:pr-5 width-products ml-5 text-white">
      <img
        src="/teclado.webp"
        alt=""
        className="w-40 h-40  max-sm:w-32 max-sm:h-32 rounded-lg"
      />

      <section className=" w-full flex flex-col justify-evenly items-center max-md:w-52">
        <div className="md:w-24 flex flex-col h-full justify-evenly items-center">
          <p className=" text-cyan-500 max-sm:text-xs font-bold text-center ">
            {product.name.toUpperCase()}
          </p>

          <p className="text-white">{product.formattedPrice}</p>
          <p className="text-white">{product.sku}</p>

          {!noButtons && !adminButtons && (
            <button
              onClick={() => setCountItems(countItems + 1)}
              className="bg-cyan-600 rounded-full w-14 h-5 grid place-content-center"
            >
              <FaShoppingCart size="1rem" />
            </button>
          )}
        </div>
        {!noButtons && adminButtons && (
          <div className=" max-sm:ml-2 flex w-32 md:h-8 items-center justify-evenly">
            <div className="w-7 h-7 cursor-pointer bg-blue-magiclog grid place-content-center rounded-2xl">
              <FaTrash onClick={() => handleSubmitDelete(product.product_id)} />
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
