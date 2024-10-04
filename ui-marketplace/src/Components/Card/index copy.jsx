import { useContext } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";

export const Card = (product) => {
  const context = useContext(ShoppingCartContext);
  return (
    <div className="flex align-middle m-auto mb-5 bg-zinc-800 cursor-pointer w-[90%] h-28 rounded-lg">
      <figure className="w-40 m-auto">
        <img src="/gift.png" alt="" />
      </figure>
      <section className="w-[100%] flex text-center flex-col ml-4 justify-around">
        <h3 className="text-cyan-400 text-lg font-extrabold">
          {product.product.name}
        </h3>
        <p className="text-white">{product.product.price}</p>
        <p className="text-white">{product.product.sku}</p>
        <button className="bg-cyan-400 rounded-lg w-[50%] h-7 m-auto">
          <img
            title="Agregar al carrito"
            className="w-6 h-6 m-auto"
            src="/add-shoping.svg"
            alt="Agregar al carrito"
          />
        </button>
      </section>
    </div>
  );
};
