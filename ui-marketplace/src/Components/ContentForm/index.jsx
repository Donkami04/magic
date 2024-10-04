import { Layout } from "../Layout";
import { useState } from "react";

export const ContentForm = ({ title, children, handleSubmit }) => {
  return (
    <Layout>
      <div className="h-heighWithOutNav flex items-center justify-center bg-radial-custom">
        <div className="w-full max-w-md p-8 rounded-lg shadow-md max-sm:w-72 animate-glow">
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

// max-sm:h-[calc(100vh-5rem)] sm:h-[calc(100vh-5rem)]
