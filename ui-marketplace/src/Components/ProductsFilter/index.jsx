import React from "react";

export const ProductsFilter = () => {
  return (
    <div className="flex flex-col h-[50%] items-center justify-between mt-4 ">
      <div className="mb-4">
        <input
          type="email"
          id="email"
          placeholder="Ej. Bolso"
          // value={email}
          //   onChange={(e) => setEmail(e.target.value)}
          required
          className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 "
        />
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Buscar por nombre
        </label>
      </div>
      <div className="mb-4">
        <input
          type="email"
          id="email"
          placeholder="Ej. Bolso"
          // value={email}
          //   onChange={(e) => setEmail(e.target.value)}
          required
          className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 "
        />
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Buscar por SKU
        </label>
      </div>
      <div className="mb-4">
        <input
          type="email"
          id="email"
          placeholder="Ej. Bolso"
          // value={email}
          //   onChange={(e) => setEmail(e.target.value)}
          required
          className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 "
        />
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Filtrar por precio
        </label>
      </div>
    </div>
  );
};
