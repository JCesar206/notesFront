import React, { useState, useContext } from "react";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { LangContext, ThemeContext } from "../App";

function Navbar({ filters, setFilters, openAbout, setIsAuth }) {
  const { lang, toggleLang } = useContext(LangContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  return (
    <nav className={`bg-white dark:bg-gray-800 shadow p-4`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Título */}
        <div className="font-bold text-xl shadow-purple-600 shadow-2xl">Nota Loka</div>

        {/* Menú horizontal en pantallas grandes */}
        <ul className="hidden md:flex gap-4 items-center">
          <li>
            <button
              onClick={() => setFilters({ ...filters, favorite: !filters.favorite })}
              className="hover:underline font-semibold cursor-pointer"
            >
              {lang === "es" ? "Favoritos" : "Favorites"}
            </button>
          </li>
          <li>
            <button
              onClick={() => setFilters({ ...filters, completed: !filters.completed })}
              className="hover:underline font-semibold cursor-pointer"
            >
              {lang === "es" ? "Completadas" : "Completed"}
            </button>
          </li>
          <li>
            <button onClick={toggleTheme} className="flex items-center gap-1 cursor-pointer">
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </li>
          <li>
            <button onClick={toggleLang} className="font-semibold hover:underline cursor-pointer">
              {lang === "es" ? "EN" : "ES"}
            </button>
          </li>
          <li>
            <button onClick={openAbout} className="font-semibold hover:underline cursor-pointer">
              {lang === "es" ? "Acerca" : "About"}
            </button>
          </li>
          <li>
            <button onClick={handleLogout} className="text-red-500 hover:underline cursor-pointer">
              {lang === "es" ? "Cerrar sesión" : "Logout"}
            </button>
          </li>
        </ul>

        {/* Menú hamburguesa en pantallas pequeñas */}
        <div className="md:hidden cursor-pointer">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Menú vertical desplegable */}
      {menuOpen && (
        <ul className="flex flex-col gap-2 mt-2 md:hidden p-2 bg-white dark:bg-gray-800">
          <li>
            <button
              onClick={() => { setFilters({ ...filters, favorite: !filters.favorite }); setMenuOpen(false); }}
              className="w-full text-left hover:underline font-semibold cursor-pointer"
            >
              {lang === "es" ? "Favoritos" : "Favorites"}
            </button>
          </li>
          <li>
            <button
              onClick={() => { setFilters({ ...filters, completed: !filters.completed }); setMenuOpen(false); }}
              className="w-full text-left hover:underline font-semibold cursor-pointer"
            >
              {lang === "es" ? "Completadas" : "Completed"}
            </button>
          </li>
          <li>
            <button onClick={() => { toggleTheme(); setMenuOpen(false); }} className="flex items-center gap-1 cursor-pointer">
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </li>
          <li>
            <button onClick={() => { toggleLang(); setMenuOpen(false); }} className="hover:underline font-semibold cursor-pointer">
              {lang === "es" ? "EN" : "ES"}
            </button>
          </li>
          <li>
            <button onClick={() => { openAbout(); setMenuOpen(false); }} className="flex items-center gap-1 hover:underline font-semibold cursor-pointer">
              {lang === "es" ? "Acerca" : "About"}
            </button>
          </li>
          <li>
            <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-red-500 hover:underline font-semibold cursor-pointer">
              {lang === "es" ? "Cerrar sesión" : "Logout"}
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
