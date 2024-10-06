// React Importaciones
import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";

// Contexts
import { useShoppingContext } from "../../Context/ShoppingCart";

// Componentes
import { Register } from "../../Pages/Register";
import { Login } from "../../Pages/Login";

// Iconos
import { RiAdminFill } from "react-icons/ri";
import { useAuth } from "../../Context/Auth";
import { IoLogOut } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { HiMenuAlt3 } from "react-icons/hi";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const { registerForm, setRegisterForm, loginForm, setLoginForm, countItems } =
    useShoppingContext();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef, buttonRef]);

  const renderNavLink = (to, onClick, text, Icon = null) => (
    <NavLink
      onClick={onClick}
      to={to}
      className="flex justify-evenly relative blue-magiclog max-sm:hidden"
    >
      {Icon && <Icon color="#13AFEF" size="1.8rem" />}
      <span className="grid place-items-center w-[40%]">{text}</span>
    </NavLink>
  );

  return (
    <>
      {registerForm && <Register />}
      {loginForm && <Login />}
      <nav className="h-20 flex justify-between items-center bg-black p-2 pr-2 text-white fixed top-0 left-0 w-full z-10">
        <h1 className="font-bold max-sm:text-2xl sm:text-3xl md:text-4xl lg:text-5xl ">
          <NavLink to="/">
            <span className="blue-magiclog">Market</span>
            <span className="text-zinc-300">Place</span>
          </NavLink>
        </h1>

        <div className="flex justify-between items-center sm:w-80 ">
          {!user &&
            renderNavLink(
              "/",
              () => {
                setRegisterForm(false);
                setLoginForm(false);
              },
              "Home"
            )}
          {!user &&
            renderNavLink(
              "",
              () => {
                setRegisterForm(true);
                setLoginForm(false);
              },
              "Registrarse"
            )}
          {user?.rol === "admin" &&
            renderNavLink(
              "/admin",
              () => {
                setRegisterForm(false);
                setLoginForm(false);
              },
              "Admin"
            )}
          {user?.rol === "vendedor" &&
            renderNavLink(
              "/dashboard",
              () => {
                setRegisterForm(false);
                setLoginForm(false);
              },
              "Dashboard"
            )}
          {user
            ? renderNavLink("", logout, "Logout", IoLogOut)
            : renderNavLink(
                "",
                () => {
                  setLoginForm(true);
                  setRegisterForm(false);
                },
                "Login",
                IoLogOut
              )}

          {!user && (
            <div>
              <figure>
                <HiMiniShoppingBag size="2.2rem" color="#13AFEF" />
              </figure>
              <p className="grid place-content-center text-sm absolute top-6 bg-red-500 rounded-full size-4">
                {countItems}
              </p>
            </div>
          )}
          <button
            ref={buttonRef}
            className="sm:hidden flex items-center"
            onClick={() => {
              toggleMenu();
              setRegisterForm(false);
              setLoginForm(false);
            }}
            aria-label="Toggle Menu"
          >
            <HiMenuAlt3 size="2.2rem" color="#13AFEF" />
          </button>
        </div>

        {isMenuOpen && (
          <aside
            ref={menuRef}
            className="border-l items-center border-sky-500 z-50 fixed top-20 right-0 h-screen w-56 bg-black translate-x-0 sm:hidden"
          >
            <div className="pt-[20px] flex flex-col gap-4 h-[30%]">
              {!user && renderNavLink("/", toggleMenu, "Home", IoMdHome)}
              {!user &&
                renderNavLink(
                  "",
                  () => {
                    toggleMenu();
                    setRegisterForm(!registerForm);
                    setLoginForm(false);
                  },
                  "Registrarse"
                )}
              {user?.rol === "vendedor" &&
                renderNavLink(
                  "/dashboard",
                  toggleMenu,
                  "Dashboard",
                  RiAdminFill
                )}
              {user?.rol === "admin" &&
                renderNavLink("/admin", toggleMenu, "Admin", RiAdminFill)}
              {user
                ? renderNavLink(
                    "",
                    () => {
                      toggleMenu();
                      logout();
                    },
                    "Logout",
                    IoLogOut
                  )
                : renderNavLink(
                    "",
                    () => {
                      toggleMenu();
                      setLoginForm(!loginForm);
                      setRegisterForm(false);
                    },
                    "Login",
                    IoLogOut
                  )}
            </div>
          </aside>
        )}
      </nav>
    </>
  );
};
