import React, { useState } from "react";
import { ContentForm } from "../../Components/ContentForm";

export const NewProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    quantity: 0,
    price: 0,
  });

  const handleChangeInput = (event) => {
    setNewProduct({
      ...newProduct,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <ContentForm title={"Registrar Producto"}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-white">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          value={newProduct.name}
          onChange={handleChangeInput}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 "
        />
      </div>
      <div className="mb-4">
        <label htmlFor="sku" className="block text-sm font-medium text-white">
          SKU
        </label>
        <input
          type="text"
          id="sku"
          value={newProduct.sku}
          onChange={handleChangeInput}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 "
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="quantity"
          className="block text-sm font-medium text-white"
        >
          Cantidad
        </label>
        <input
          type="number"
          id="quantity"
          value={newProduct.quantity}
          onChange={handleChangeInput}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 "
        />
      </div>
      <div className="mb-6">
        <label htmlFor="price" className="block text-sm font-medium text-white">
          Precio
        </label>
        <input
          type="number"
          id="price"
          value={newProduct.price}
          onChange={handleChangeInput}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 "
        />
      </div>
      <button
        type="submit"
        className="text-1xl w-full px-4 py-2 font-semibold text-white bg-darkblue-magiclog rounded-lg hover:bg-blue-magiclog focus:outline-none focus:ring-2 focus:ring-opacity-50"
      >
        Login
      </button>
    </ContentForm>
  );
};
