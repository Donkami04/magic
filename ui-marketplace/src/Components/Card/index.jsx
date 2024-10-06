// React Importaciones
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Contexts
import { ShoppingCartContext } from "../../Context/ShoppingCart";

// Iconos
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

export const Card = ({ product, handleSubmitDelete }) => {
  const [adminButtons, setAdminButtons] = useState(null);
  const [noButtons, setNoButtons] = useState(null);
  const context = useContext(ShoppingCartContext);
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
    <div className="flex my-5 w-[90%] lg:pr-5 width-products ml-5 text-white">
      <img
        src="/teclado.webp"
        alt=""
        className="w-52 h-4w-52  max-sm:w-32 max-sm:h-32 rounded-lg"
      />

      <section className="w-full ml-3 flex flex-col justify-evenly items-center">
        <p className=" text-cyan-500 max-sm:text-xs font-bold text-center ">
          {product.name.toUpperCase()}
        </p>

        <p className="text-white">{product.formattedPrice}</p>
        <p className="text-white">{product.sku}</p>

        {!noButtons && !adminButtons && (
          <button
            onClick={() => context.setCountItems(context.countItems + 1)}
            className="bg-cyan-600 rounded-full w-10 h-10 "
          >
            <img
              title="Agregar al carrito"
              className="w-6 h-6 m-auto"
              src="/add-shoping.svg"
              alt="Agregar al carrito"
            />
          </button>
        )}
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
