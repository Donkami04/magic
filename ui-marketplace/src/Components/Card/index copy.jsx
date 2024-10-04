import { useContext } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context/ShoppingCart";

export const Card = (product) => {
  const context = useContext(ShoppingCartContext);
  return (
    <div className="flex flex-col m-auto items-center w-full rounded-lg pt-5 bg-zinc-950 max-sm:w-full">
      <img
        src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
        alt=""
        className="w-48 h-48 rounded-lg"
      />

      <section className="w-full flex flex-col justify-evenly max-sm:justify-center h-full items-center ">
        <h3 className="h-full text-cyan-500 text-lg font-extrabold">
          {product.product.name.toUpperCase()}
        </h3>
        <div className="flex w-full justify-between items-center pl-4 pr-4">
          <div className="flex flex-col">
            <p className="text-white">{product.product.price}</p>
            <p className="text-white">{product.product.sku}</p>
          </div>
          <button className="bg-cyan-600 rounded-full w-10 h-10 ">
            <img
              title="Agregar al carrito"
              className="w-6 h-6 m-auto"
              src="/add-shoping.svg"
              alt="Agregar al carrito"
            />
          </button>
        </div>
      </section>
    </div>
  );
};
