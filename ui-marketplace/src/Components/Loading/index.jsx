import React from "react";

export const Loading = () => {
  return (
    <div className="flex flex-wrap justify-center -z-10 relative">
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center w-64 h-40 m-4 bg-white border rounded-lg shadow-lg animate-pulse "
        >
          <div className="w-[70%] h-14 bg-gray-300 rounded mb-2"></div>
          <div className="w-[85%] mb-2 h-5 bg-gray-300 rounded"></div>
          <div className="w-[85%] h-5 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );
};
