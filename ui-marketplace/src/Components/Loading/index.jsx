import React from "react";

export const Loading = () => {
  return (
    <div className="h-heighWithOutNav overflow-auto absolute top-20 grid place-content-center w-full pl-[10%] pr-[10%] bg-radial-custom max-sm:p-0">
      {Array.from({ length: 4 }, (_, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center w-64 h-40 m-4 bg-zinc-800 opacity-90 border rounded-lg shadow-lg animate-pulse "
        >
          <div className="w-[70%] h-14 bg-gray-300 opacity-80 rounded mb-2"></div>
          <div className="w-[88%] mb-2 h-8 bg-gray-300 opacity-50 rounded"></div>
          <div className="w-[85%] h-5 bg-gray-300 opacity-50 rounded"></div>
        </div>
      ))}
    </div>
  );
};
