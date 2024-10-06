import { Layout } from "../Layout";
import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useShoppingContext } from "../../Context/ShoppingCart";

export const ContentForm = ({ title, children, handleSubmit }) => {
  const { registerForm, setRegisterForm, loginForm, setLoginForm } =
    useShoppingContext();
  return (
    <Layout>
      <span
        onClick={() => {
          setRegisterForm(false);
          setLoginForm(false);
        }}
        className="text-red-600 absolute z-20 right-10"
      >
        <IoMdCloseCircle size="2rem" color="white" />
      </span>
      <div className="h-heighWithOutNav bg-black/90  flex items-center justify-center absolute z-10 w-full">
        <div className="w-full max-w-md p-8 rounded-lg bg-black shadow-md max-sm:w-72 animate-glow">
          <h2 className="text-white text-2xl font-bold text-center ">
            {title}
          </h2>
          <form onSubmit={handleSubmit} className="mt-6">
            {children}
          </form>
        </div>
      </div>
    </Layout>
  );
};
