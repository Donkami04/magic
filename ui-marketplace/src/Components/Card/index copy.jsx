import { useContext, useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context/ShoppingCart";
import { useLocation } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { createProduct } from "../../Services/Api/Products/createProduct";
import { deleteProduct } from "../../Services/Api/Products/deleteProduct";

export const Card = ({ product, handleSubmitDelete }) => {
  const [adminButtons, setAdminButtons] = useState(null);
  const context = useContext(ShoppingCartContext);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setAdminButtons(true);
    }
  }, []);

  return (
    <div className="flex my-5 lg:pr-5 width-products text-white">
      <img
        src="/teclado.webp"
        alt=""
        className="w-52 h-4w-52  max-sm:w-32 max-sm:h-32 rounded-lg"
      />

      <section className="w-full flex flex-col justify-evenly items-center max-sm:ml-5 max-md:ml-3">
        <p className=" text-cyan-500 max-sm:text-sm font-extrabold text-center">
          {product.name.toUpperCase()}
        </p>

        <p className="text-white">{product.formattedPrice}</p>
        <p className="text-white">{product.sku}</p>

        {!adminButtons && (
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
        {adminButtons && (
          <div className=" max-sm:ml-2 flex w-32 md:h-8 items-center justify-evenly">
            <div className="w-7 h-7 cursor-pointer bg-zinc-600 grid place-content-center rounded-2xl">
              <MdEdit size="1.4rem" />
            </div>
            <div className="w-7 h-7 cursor-pointer bg-blue-magiclog grid place-content-center rounded-2xl">
              <FaTrash onClick={() => handleSubmitDelete(product.product_id)} />
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
