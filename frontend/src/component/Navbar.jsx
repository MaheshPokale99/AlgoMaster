import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import ThemeToggle from "../component/ThemeToggle";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("token");
    setIsLoggedIn(!!user);
  }, [navigate]);

  return (
    <nav className="bg-white dark:bg-[#15171c] text-black dark:text-white fixed top-0 left-0 w-full z-50 shadow-md transition-colors duration-300">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <NavLink to="/home">
        <div className="w-48 xl:w-48 lg:w-44 md:w-40 sm:w-40 flex justify-center items-center">
          <h1 className="text-3xl xl:text-4xl lg:text-4xl md:text-2xl sm:text-2xl lexend-bold ml-2">
            <span className="text-orange-500">{`{`}</span>
            <span className="text-indigo-500">Algo</span>
            <span className="text-orange-500">Masters</span>
            <span className="text-orange-500">{`}`}</span>
          </h1>
        </div>
      </NavLink>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {!isLoggedIn ? (
            <button
              type="button"
              className="text-white bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 focus:ring-4 dark:focus:ring-red-900 font-medium text-lg px-4 py-2 text-center w-28 h-12 rounded-2xl transition-all duration-300"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Sidebar />
            </div>
          )}
        </div>
        {isLoggedIn && (
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 text-xl">
              {["Home", "LeetCode", "CodeChef", "CodeForces"].map((item) => (
                <li key={item}>
                  <NavLink
                    to={`/${item.toLowerCase()}`}
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 md:p-0 bg-blue-700 text-white  dark:text-black rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-400"
                        : "block py-2 px-3 md:p-0 text-black dark:text-white rounded md:hover:text-blue-700 md:dark:hover:text-blue-400 transition-colors duration-300"
                    }
                    aria-current={item === "Home" ? "page" : undefined}
                  >
                    {item}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
