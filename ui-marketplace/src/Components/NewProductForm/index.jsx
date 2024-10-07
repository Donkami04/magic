import { IoMdCloseCircle } from "react-icons/io";
import BeatLoader from "react-spinners/BeatLoader";

export const NewProductForm = ({
  onSubmit,
  onClose,
  error,
  success,
  newProduct,
  setNewProduct,
}) => {
  const handleChangeInput = (event) => {
    setNewProduct({ ...newProduct, [event.target.name]: event.target.value });
  };

  return (
    <div className="absolute w-full flex bg-black/70 h-heighWithOutNav items-center justify-center top-20 z-50">
      <form className="border-2 border-neutral-950 flex flex-col justify-around items-center max-sm:w-64 w-96  bg-black h-128 rounded-3xl">
        <h2 className="text-white text-lg blue-magiclog font-bold text-center">
          Registrar producto
          <span
            onClick={onClose}
            className="text-white relative left-56 bottom-6 cursor-pointer"
          >
            <IoMdCloseCircle size="1.5rem" />
          </span>
        </h2>
        {error && (
          <p className="text-red-600 min-h-15 text-center px-3 min-h-3 ">
            {error}
          </p>
        )}
        {success && (
          <p className="min-h-12  text-green-600 text-center px-3">{success}</p>
        )}
        {["name", "sku", "quantity", "price"].map((field) => (
          <div key={field} className="mb-4 md:w-72">
            <input
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              type={
                field === "quantity" || field === "price" ? "number" : "text"
              }
              id={field}
              name={field}
              value={newProduct[field]}
              onChange={handleChangeInput}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
        ))}
        <button
          onClick={onSubmit}
          type="submit"
          className="text-1xl w-24 px-4 py-2 font-semibold text-white bg-blue-magiclog rounded-lg focus:bg-darkblue-magiclog"
        >
          Crear
        </button>
      </form>
    </div>
  );
};
