// import React, { useState, useEffect } from "react";
// import { ContentForm } from "../../Components/ContentForm";
// import { createProduct } from "../../Services/Api/Products/createProduct";
// import { useAuth } from "../../Context/Auth";
// import axios from "axios";

// export const NewProduct = () => {
//   const { user } = useAuth();
//   const [error, setError] = useState(null);
//   const [success, setsuccess] = useState(null);
//   const [token, setToken] = useState(null);
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     sku: "",
//     quantity: "",
//     price: "",
//   });

//   useEffect(() => {
//     if (user) {
//       setToken(user.token);
//     }
//   }, [user]);

//   const handleChangeInput = (event) => {
//     setsuccess(null);
//     setNewProduct({
//       ...newProduct,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/v1/marketplace/products/new",
//         newProduct, // Este es el cuerpo de la solicitud
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Este es el encabezado con el token
//           },
//         }
//       );

//       if (response.status === 201) {
//         setsuccess(response.data.message);
//         setError(null);
//       } else {
//         setError(response.data.message);
//       }

//       setNewProduct({
//         name: "",
//         sku: "",
//         quantity: "",
//         price: "",
//       });
//     } catch (error) {
//       console.error(error);
//       setError(error.response.data.message);
//     }
//   };

//   return (
//     <ContentForm title={"Registrar Producto"} handleSubmit={handleSubmit}>
//       {error && <p className="text-red-600 text-center">{error}</p>}
//       {success && <p className="text-green-600 text-center">{success}</p>}
//       <div className="mb-4">
//         <label htmlFor="name" className="block text-sm font-medium text-white">
//           Nombre
//         </label>
//         <input
//           type="text"
//           id="name"
//           name="name" // Asegúrate de que el atributo name esté presente
//           value={newProduct.name}
//           onChange={handleChangeInput}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 "
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="sku" className="block text-sm font-medium text-white">
//           SKU
//         </label>
//         <input
//           type="text"
//           id="sku"
//           name="sku" // Asegúrate de que el atributo name esté presente
//           value={newProduct.sku}
//           onChange={handleChangeInput}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 "
//         />
//       </div>
//       <div className="mb-6">
//         <label
//           htmlFor="quantity"
//           className="block text-sm font-medium text-white"
//         >
//           Cantidad
//         </label>
//         <input
//           type="number"
//           id="quantity"
//           name="quantity" // Asegúrate de que el atributo name esté presente
//           value={newProduct.quantity}
//           onChange={handleChangeInput}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 "
//         />
//       </div>
//       <div className="mb-6">
//         <label htmlFor="price" className="block text-sm font-medium text-white">
//           Precio
//         </label>
//         <input
//           type="number"
//           id="price"
//           name="price" // Asegúrate de que el atributo name esté presente
//           value={newProduct.price}
//           onChange={handleChangeInput}
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 "
//         />
//       </div>
//       <button
//         type="submit"
//         className="text-1xl w-full px-4 py-2 font-semibold text-white bg-darkblue-magiclog rounded-lg hover:bg-blue-magiclog focus:outline-none focus:ring-2 focus:ring-opacity-50"
//       >
//         Registrar
//       </button>
//     </ContentForm>
//   );
// };
