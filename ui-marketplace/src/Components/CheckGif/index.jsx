import React, { useEffect } from "react";

export const CheckGif = () => {
  useEffect(() => {
    // Guarda el estilo original
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Bloquea el scroll
    document.body.style.overflow = "hidden";

    // Limpia el efecto cuando el componente se desmonta
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
