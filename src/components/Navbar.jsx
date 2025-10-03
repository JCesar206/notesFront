import React, { useState, useContext } from "react";
import {
  FaMoon, FaSun, FaBars, FaTimes,
  FaStar, FaCheckCircle, FaInfoCircle, FaSignOutAlt, FaLanguage
} from "react-icons/fa";
import { LangContext, ThemeContext } from "../App";

function Navbar({ filters, setFilters, openAbout, setIsAuth }) {
  const { lang, toggleLang } = useContext(LangContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  const menuItems = [
    {
      label: lang === "es" ? "Favoritos" : "Favorites",
      icon: <FaStar />,
      action: () => setFilters({ ...filters, favorite: !filters.favorite }),
    },
    {
      label: lang === "es" ? "Completadas" : "Completed",
      icon: <FaCheckCircle />,
      action: () => setFilters({ ...filters, completed: !filters.completed }),
    },
    {
      label: darkMode ? "Light" : "Dark",
      icon: darkMode ? <FaSun /> : <FaMoon />,
      action: toggleTheme,
    },
    {
      label: lang === "es" ? "EN" : "ES",
      icon: <FaLanguage />,
      action: toggleLang,
    },
    {
      label: lang === "es" ? "Acerca" : "About",
      icon: <FaInfoCircle />,
      action: openAbout,
    },
    {
      label: lang === "es" ? "Cerrar sesión" : "Logout",
      icon: <FaSignOutAlt />,
      action: handleLogout,
    },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-bold text-xl">NotesApp</div>

        {/* Menú horizontal en pantallas grandes */}
        <ul className="hidden md:flex gap-6 items-center">
          {menuItems.map((item, i) => (
            <li key={i}>
              <button
                onClick={item.action}
                className="flex items-center gap-1 hover:underline cursor-pointer"
              >
                {item.icon} {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Menú hamburguesa en pantallas chicas */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="cursor-pointer">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Menú vertical para pantallas chicas */}
      {menuOpen && (
        <ul className="flex flex-col gap-2 mt-2 md:hidden p-2 bg-white dark:bg-gray-800">
          {menuItems.map((item, i) => (
            <li key={i}>
              <button
                onClick={() => { item.action(); setMenuOpen(false); }}
                className="w-full flex items-center gap-2 hover:underline cursor-pointer"
              >
                {item.icon} {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
