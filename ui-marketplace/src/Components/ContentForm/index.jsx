import { IoMdCloseCircle } from "react-icons/io";
import { useShoppingContext } from "../../Context/ShoppingCart";

export const ContentForm = ({ title, children, handleSubmit }) => {
  const { setRegisterForm, setLoginForm } = useShoppingContext();

  return (
    <div className="flex flex-col item-center mt-20">
      <div className="h-heighWithOutNav bg-black/90 flex items-center justify-center relative z-10 w-full">
        <div className="w-full max-w-md p-8 rounded-lg bg-black shadow-md max-sm:w-72 animate-glow">
          <div className="flex items-center justify-between">
            <h2 className="text-white text-2xl font-bold text-center">
              {title}
            </h2>
            <span
              onClick={() => {
                setRegisterForm(false);
                setLoginForm(false);
              }}
              className="text-red-600 cursor-pointer"
            >
              <IoMdCloseCircle size="2rem" color="white" />
            </span>
          </div>
          <form onSubmit={handleSubmit} className="mt-6">
            {children}
          </form>
        </div>
      </div>
    </div>
  );
};
