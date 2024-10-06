import { IoMdCloseCircle } from "react-icons/io";
import { useShoppingContext } from "../../Context/ShoppingCart";

export const ContentForm = ({ title, children }) => {
  const { setRegisterForm, setLoginForm } = useShoppingContext();

  return (
    <div className="flex flex-col item-center mt-20">
      <div className="h-heighWithOutNav bg-black/90 flex items-center justify-center relative z-10 w-full">
        <div className="w-full max-w-md p-8 rounded-lg bg-black shadow-md max-sm:w-72 animate-glow relative">
          <span
            onClick={() => {
              setRegisterForm(false);
              setLoginForm(false);
            }}
            className="text-red-600 absolute z-20 right-4 top-4"
          >
            <IoMdCloseCircle size="2rem" color="white" />
          </span>
          <h2 className="text-white text-2xl font-bold text-center ">
            {title}
          </h2>
          <form className="mt-6">{children}</form>
        </div>
      </div>
    </div>
  );
};
