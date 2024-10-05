import React from "react";

export const Modal = () => {
  //   if (!isOpen) return null;

  return (
    <div className="z-30 h-screen w-screen bg-black bg-opacity-40 grid place-content-center">
      <div className="w-80 h-96 bg-red-600">
        <form action="">
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
        </form>
      </div>
    </div>
  );
};
