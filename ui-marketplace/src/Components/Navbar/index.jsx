import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import { ShoppingCartContext } from "../../Context/ShoppingCart";
import { AuthContext } from "../../Context/Auth"; // Asegúrate de importar tu AuthContext
import { RiAdminFill } from "react-icons/ri";
import { useAuth } from "../../Context/Auth";
import { IoLogOut } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { HiMenuAlt3 } from "react-icons/hi";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const context = useContext(ShoppingCartContext);
  const { user, logout } = useAuth();
  const [rol, setRol] = useState(null);
  const [showSellerOptions, setShowSellerOptions] = useState(null);
  const [classNavSeller, setClassNavSeller] = useState("w-20");
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          setRol(user.rol);
          setShowSellerOptions(true);
          setClassNavSeller("w-18");
        } else {
          setShowSellerOptions(false);
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
    <nav className="h-20 flex justify-between items-center bg-black p-2 pr-2 text-white fixed top-0 left-0 w-full z-10">
      <h1 className="font-bold max-sm:text-2xl sm:text-3xl md:text-4xl lg:text-5xl ">
        <NavLink to="/">
          <span className="blue-magiclog">Market</span>
          <span className="text-zinc-300">Place</span>
        </NavLink>
      </h1>

      <div
        className={`flex justify-between items-center sm:w-80 md:justify-evenly`}
      >
        {!showSellerOptions && (
          <NavLink to="/" className="hover:blue-magiclog max-sm:hidden">
            Home
          </NavLink>
        )}
        {!showSellerOptions && (
          <NavLink
            to="/registrarse"
            className="hover:blue-magiclog max-sm:hidden"
          >
            Registrarse
          </NavLink>
        )}
        {user && user.rol === "admin" ? (
          <NavLink className="hover:text-sky-500 max-sm:hidden" to={"/admin"}>
            Admin
          </NavLink>
        ) : (
          ""
        )}

        {user && user.rol === "vendedor" ? (
          <NavLink className="max-sm:hidden" to={"/dashboard"}>
            Dashboard
          </NavLink>
        ) : (
          ""
        )}

        {showSellerOptions ? (
          <NavLink
            onClick={() => logout()}
            to="/login"
            className="hover:blue-magiclog max-sm:hidden"
          >
            Logout
          </NavLink>
        ) : (
          <NavLink to="/login" className="hover:blue-magiclog max-sm:hidden">
            Login
          </NavLink>
        )}

        {!showSellerOptions && (
          <div>
            <figure>
              <HiMiniShoppingBag size="2.2rem" color={"#13AFEF"} />
            </figure>

            <p className="grid place-content-center text-sm absolute top-6 bg-red-500 rounded-full size-4">
              {context.countItems}
            </p>
          </div>
        )}
        <button
          ref={buttonRef}
          className="sm:hidden flex items-center"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <HiMenuAlt3 size="2.2rem" color={"#13AFEF"} />
        </button>
      </div>

      {isMenuOpen && (
        <aside
          ref={menuRef}
          className={`border-l items-center border-sky-500 fixed top-20 right-0 h-screen w-56 bg-black ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } sm:hidden`}
        >
          <div className="pt-[20px] flex flex-col gap-4 h-[30%]">
            {!showSellerOptions && (
              <NavLink
                onClick={toggleMenu}
                to="/"
                className="  flex justify-evenly blue-magiclog"
                end
              >
                <IoMdHome color="bg-blue-magiclog" size="1.8rem" />
                <span className="grid place-items-center w-[40%]">Home</span>
              </NavLink>
            )}
            {!showSellerOptions && (
              <NavLink
                onClick={toggleMenu}
                to="/registrarse"
                className="flex justify-evenly relative blue-magiclog"
              >
                <img className="fill-current w-6 h-6" src="/login.svg" />
                <span className="grid place-items-center w-[40%]">
                  Registrarse
                </span>
              </NavLink>
            )}
            {/* {user && user.rol === "admin" ? (
              <NavLink
                className="hover:text-sky-500 max-sm:hidden"
                to={"/admin"}
              >
                Admin
              </NavLink>
            ) : (
              ""
            )}
            {user && user.rol === "vendedor" ? (
              <NavLink
                className="hover:text-sky-500 max-sm:hidden"
                to={"/dashboard"}
              >
                Dashboard
              </NavLink>
            ) : (
              ""
            )} */}
            {/* {!user && (
              <NavLink
                className="hover:text-sky-500 max-sm:hidden"
                to={"/admin"}
              >
                Dashboard
              </NavLink>
            )} 
              <NavLink className="max-sm:hidden" to={"/dashboard"}>
                Dashboard
              </NavLink> */}

            {user && user.rol === "vendedor" ? (
              <NavLink
                onClick={toggleMenu}
                to="/dashboard"
                className="flex justify-evenly relative blue-magiclog"
              >
                <RiAdminFill color={"#13AFEF"} size="1.8rem" />
                <span className="grid place-items-center w-[40%]">
                  Dashboard
                </span>
              </NavLink>
            ) : (
              ""
            )}
            {user && user.rol === "admin" ? (
              <NavLink
                onClick={toggleMenu}
                to="/admin"
                className="flex justify-evenly relative blue-magiclog"
              >
                <RiAdminFill color={"#13AFEF"} size="1.8rem" />
                <span className="grid place-items-center w-[40%]">Admin</span>
              </NavLink>
            ) : (
              ""
            )}
            {showSellerOptions ? (
              <NavLink
                onClick={() => {
                  toggleMenu(); // Ejecuta toggleMenu
                  logout(); // Ejecuta logout
                }}
                to="/login"
                className="flex justify-evenly relative blue-magiclog"
              >
                <IoLogOut color={"#13AFEF"} size="1.8rem" />
                <span className="grid place-items-center w-[40%]">Logout</span>
              </NavLink>
            ) : (
              <NavLink
                onClick={toggleMenu}
                to="/login"
                className="flex justify-evenly relative blue-magiclog"
              >
                <IoLogOut color={"#13AFEF"} size="1.8rem" />
                <span className="grid place-items-center w-[40%]">Login</span>
              </NavLink>
            )}
          </div>
        </aside>
      )}
    </nav>
  );
};
