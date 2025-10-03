import React, { useState, useContext } from "react";
import { FaBars, FaTimes, FaSun, FaMoon, FaInfoCircle, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { LangContext } from "../contexts/LangContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

function Navbar({ filters, setFilters, openAbout, setIsAuth }) {
  const { lang, toggleLang } = useContext(LangContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const t = {
    es: { search: "Buscar...", theme: "Tema", lang: "EN", about: "Acerca de", logout: "Cerrar sesión" },
    en: { search: "Search...", theme: "Theme", lang: "ES", about: "About", logout: "Logout" }
  }[lang];

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    navigate("/login");
  };

  return (
    <nav className={`bg-white dark:bg-gray-800 shadow p-4`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="font-bold text-xl">😃 Nota Loka</div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <FaSearch className="absolute left-2 top-2 text-gray-400" />
            <input
              type="text"
              placeholder={t.search}
              value={filters.keyword}
              onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
              className="pl-8 pr-3 py-1 rounded border dark:bg-gray-700 dark:text-white font-semibold"
            />
          </div>

          <button onClick={toggleTheme} className="flex items-center gap-1 px-3 py-1 rounded hover:underline">
            {darkMode ? <FaSun /> : <FaMoon />} {t.theme}
          </button>

          <button onClick={toggleLang} className="flex items-center gap-1 px-3 py-1 rounded hover:underline">
            {t.lang}
          </button>

          <button onClick={openAbout} className="flex items-center gap-1 px-3 py-1 rounded hover:underline">
            <FaInfoCircle /> {t.about}
          </button>

          <button onClick={handleLogout} className="flex items-center gap-1 px-3 py-1 rounded hover:underline text-red-500">
            <FaSignOutAlt /> {t.logout}
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={`md:hidden px-4 pb-4 flex flex-col gap-2 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <div className="relative">
            <FaSearch className="absolute left-2 top-2 text-gray-400" />
            <input
              type="text"
              placeholder={t.search}
              value={filters.keyword}
              onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
              className="pl-8 pr-3 py-1 w-full rounded border dark:bg-gray-700 dark:text-white font-semibold"
            />
          </div>

          <button onClick={() => { toggleTheme(); setMenuOpen(false); }} className="text-left cursor-pointer">
            {darkMode ? "Light" : "Dark"} {t.theme}
          </button>
          <button onClick={() => { toggleLang(); setMenuOpen(false); }} className="text-left cursor-pointer">
            {t.lang}
          </button>
          <button onClick={() => { openAbout(); setMenuOpen(false); }} className="text-left cursor-pointer">
            {t.about}
          </button>
          <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-left text-red-500 cursor-pointer">
            {t.logout}
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
