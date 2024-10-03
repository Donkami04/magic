import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import { ShoppingCartContext } from "../../Context";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Referencia para el menú desplegable
  const buttonRef = useRef(null);
  const context = useContext(ShoppingCartContext);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) && // Click fuera del menú
        buttonRef.current &&
        !buttonRef.current.contains(event.target) // Click fuera del botón
      ) {
        setIsMenuOpen(false);
      }
    };

    // Agregar el listener
    document.addEventListener("mousedown", handleClickOutside);

    // Limpiar el listener al desmontar el componente
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, buttonRef]);

  return (
    <nav
      className="flex justify-between items-center bg-black p-2 text-white"
      aria-label="Main Navigation"
    >
      <h1 className="text-2xl font-bold">
        <NavLink to="/" className="hover:text-cyan-400">
          <span className="text-cyan-400">Market</span>
          <span className="text-zinc-300">Place</span>
        </NavLink>
      </h1>

      {/* Botón de menú hamburguesa */}
      <div className="flex w-16 justify-between">
        <div className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
              clipRule="evenodd"
            />
          </svg>
          <p className="grid place-content-center text-sm absolute top-6 bg-red-500 rounded-full size-4">
            {context.countItems}
          </p>
        </div>
        <button
          ref={buttonRef}
          className="md:hidden flex items-center"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <img
            className="fill-current text-cyan-500 w-6 h-6"
            src="/slide-menu.svg"
          />
        </button>
      </div>

      {/* Menú desplegable */}
      <aside
        ref={menuRef}
        className={`${
          isMenuOpen ? "-translate-x-0" : "translate-x-full z-50"
        } h-[calc(100vh-20px)] transition-transform duration-500 transform absolute top-12 w-[50%] right-0 bg-black md:flex md:items-center md:gap-4 md:static md:bg-transparent text-right`}
      >
        <div className="pt-[20px] flex flex-col gap-4 h-[30%] bg-red">
          <NavLink
            to="/"
            className="flex justify-evenly hover:text-cyan-400"
            end
          >
            <img className="fill-current w-6 h-6" src="/home.svg" />
            <span className="grid place-items-center w-[40%]">Home</span>
          </NavLink>
          <NavLink
            to="/login"
            className="flex justify-evenly relative hover:text-cyan-400"
          >
            <img className="fill-current w-6 h-6" src="/login.svg" />
            <span className="grid place-items-center w-[40%]">Login</span>
          </NavLink>
          <NavLink
            to="/register"
            className="flex justify-evenly relative hover:text-cyan-400"
          >
            <img className="fill-current w-6 h-6" src="/register.svg" />
            <span className="grid place-items-center w-[40%]">Register</span>
          </NavLink>
        </div>
      </aside>
    </nav>
  );
};
