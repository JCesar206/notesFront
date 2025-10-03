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
    es: { search: "Buscar...", about: "Acerca de", lang: "EN", theme: "Tema", logout: "Cerrar sesión" },
    en: { search: "Search...", about: "About", lang: "ES", theme: "Theme", logout: "Logout" }
  }[lang];

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-bold text-xl">😃 Nota Loka</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <FaSearch className="absolute left-2 top-2 text-gray-400" />
            <input
              className="pl-8 pr-3 py-1 rounded border dark:bg-gray-700 dark:text-white"
              placeholder={t.search}
              value={filters.keyword}
              onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
            />
          </div>

          <button onClick={toggleTheme} className="flex items-center gap-2 px-3 py-1 rounded hover:underline cursor-pointer">
            {darkMode ? <FaSun /> : <FaMoon />} {t.theme}
          </button>
          <button onClick={toggleLang} className="flex items-center gap-2 px-3 py-1 rounded hover:underline cursor-pointer">
            {t.lang}
          </button>
          <button onClick={openAbout} className="flex items-center gap-2 px-3 py-1 rounded hover:underline cursor-pointer">
            <FaInfoCircle /> {t.about}
          </button>
          <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-1 rounded hover:underline text-red-500 cursor-pointer">
            <FaSignOutAlt /> {t.logout}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="cursor-pointer">
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={`md:hidden px-4 pb-4 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <div className="flex flex-col gap-2">
            <div className="relative">
              <FaSearch className="absolute left-2 top-2 text-gray-400" />
              <input
                className="pl-8 pr-3 py-1 w-full rounded border dark:bg-gray-700 dark:text-white"
                placeholder={t.search}
                value={filters.keyword}
                onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
              />
            </div>
            <button onClick={() => toggleTheme()} className="text-left cursor-pointer">{darkMode ? "Light" : "Dark"}</button>
            <button onClick={() => toggleLang()} className="text-left cursor-pointer">{t.lang}</button>
            <button onClick={openAbout} className="text-left cursor-pointer">{t.about}</button>
            <button onClick={handleLogout} className="text-left text-red-500 cursor-pointer">{t.logout}</button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
