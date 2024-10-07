import React, { useEffect } from "react";

export const CheckGif = () => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-50 bg-black/70 text-red-600 flex items-center justify-center">
      <img src="./check.gif" alt="OK" />
    </div>
  );
};
