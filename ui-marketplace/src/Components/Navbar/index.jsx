import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import { ShoppingCartContext } from "../../Context/ShoppingCart";
import { AuthContext } from "../../Context/Auth"; // Asegúrate de importar tu AuthContext
import { RiAdminFill } from "react-icons/ri";
import { useAuth } from "../../Context/Auth";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const context = useContext(ShoppingCartContext);
  const { user, logout } = useAuth();
  const [rol, setRol] = useState(null);
  const showSellerOptions = !!user;
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          setRol(user.data.rol);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, buttonRef]);

  return (
    <nav
      className="h-20 flex justify-between items-center bg-black p-2 pr-2 text-white fixed top-0 left-0 w-full z-10"
      aria-label="Main Navigation"
    >
      <h1 className="font-bold max-sm:text-2xl sm:text-3xl md:text-4xl lg:text-5xl ">
        <NavLink to="/">
          <span className="blue-magiclog">Market</span>
          <span className="text-zinc-300">Place</span>
        </NavLink>
      </h1>

      <div className="flex w-128 justify-between items-center max-md:w-80 max-md:justify-around max-sm:w-28">
        <NavLink to="/" className="hover:text-cyan-400 max-sm:hidden">
          Home
        </NavLink>
        <NavLink
          to="/registrarse"
          className="hover:text-cyan-400 max-sm:hidden"
        >
          Registrarse
        </NavLink>
        {showSellerOptions ? (
          <NavLink
            onClick={() => logout()}
            to="/login"
            className="hover:text-cyan-400 max-sm:hidden"
          >
            Logout
          </NavLink>
        ) : (
          <NavLink to="/login" className="hover:text-cyan-400 max-sm:hidden">
            Login
          </NavLink>
        )}
        {showSellerOptions && (
          <NavLink
            to={
              rol === "admin"
                ? "/admin"
                : rol === "vendedor"
                ? "/dashboard"
                : ""
            }
            className="hover:text-cyan-400 max-sm:hidden"
          >
            Dashboard
          </NavLink>
        )}
        <div>
          <figure>
            <img src="/bag.svg" alt="" className="w-10 h-10" />
          </figure>
          <p className="grid place-content-center text-sm absolute top-6 bg-red-500 rounded-full size-4">
            {context.countItems}
          </p>
        </div>
        <button
          ref={buttonRef}
          className="sm:hidden flex items-center"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <img
            className="fill-current text-cyan-500 w-10 h-10"
            src="/slide-menu.svg"
          />
        </button>
      </div>

      {isMenuOpen && (
        <aside
          ref={menuRef}
          className={`fixed top-20 right-0 h-screen w-56 bg-black transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } sm:hidden`}
        >
          <div className="pt-[20px] flex flex-col gap-4 h-[30%]">
            <NavLink
              onClick={toggleMenu}
              to="/"
              className="flex justify-evenly hover:text-cyan-400"
              end
            >
              <img className="fill-current w-6 h-6" src="/home.svg" />
              <span className="grid place-items-center w-[40%]">Home</span>
            </NavLink>
            <NavLink
              onClick={toggleMenu}
              to="/registrarse"
              className="flex justify-evenly relative hover:text-cyan-400"
            >
              <img className="fill-current w-6 h-6" src="/login.svg" />
              <span className="grid place-items-center w-[40%]">
                Registrarse
              </span>
            </NavLink>
            <NavLink
              onClick={toggleMenu}
              to="/login"
              className="flex justify-evenly relative hover:text-cyan-400"
            >
              <img className="fill-current w-6 h-6" src="/register.svg" />
              <span className="grid place-items-center w-[40%]">Login</span>
            </NavLink>
            {showSellerOptions && (
              <NavLink
                onClick={toggleMenu}
                to="/dashboard"
                className="flex justify-evenly relative hover:text-cyan-400"
              >
                <RiAdminFill color={"#22d3ee"} size="1.4rem" />
                <span className="grid place-items-center w-[40%]">
                  Dashboard
                </span>
              </NavLink>
            )}
          </div>
        </aside>
      )}
    </nav>
  );
};
