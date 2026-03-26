import React, { useState, useContext } from "react";
import { FaBars, FaTimes, FaSun, FaMoon, FaInfoCircle, FaSearch, FaSignOutAlt, FaStar, FaCheck} from "react-icons/fa";
import { IoLanguageSharp } from "react-icons/io5";
import { useLanguage } from "../src/context/LanguageContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

function Navbar({ filters, setFilters, openAbout, setIsAuth }) {
  const { darkMode, toggleTheme } = useContext(ThemeContext) || { darkMode: false, toggleTheme: () => {} };
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="font-semibold text-xl shadow-2xl shadow-violet-800">😃 {t.titleApp}</div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-2 top-2 text-gray-400 cursor-pointer" />
            <input
              className="pl-8 pr-3 py-1 rounded border dark:bg-gray-700 dark:text-white font-semibold"
              placeholder={t.search}
              value={filters.keyword}
              onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
            />
          </div>

          {/* Opciones */}
          <button onClick={toggleTheme} className="flex items-center gap-2 font-semibold hover:underline cursor-pointer">
            {darkMode ? <FaSun size={18}/> : <FaMoon size={18}/>}
          </button>

          <button onClick={toggleLang} className="flex items-center gap-2 hover:underline font-semibold cursor-pointer">
            <IoLanguageSharp size={18}/>
          </button>

          <button onClick={openAbout} className="flex items-center gap-2 hover:underline font-semibold cursor-pointer">
            <FaInfoCircle size={18}/> {t.about}
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 hover:underline text-red-500 font-semibold cursor-pointer"
          >
            <FaSignOutAlt size={18}/> {t.logout}
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="menu" className="cursor-pointer">
            {menuOpen ? <FaTimes size={22}/> : <FaBars size={22}/>}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={`md:hidden px-4 pb-4 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <div className="flex flex-col gap-2">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-2 top-2 text-gray-400"/>
              <input
                className="pl-8 pr-3 py-1 w-full rounded border dark:bg-gray-700 dark:text-white"
                placeholder={t.search}
                value={filters.keyword}
                onChange={(e) => {
                  setFilters({ ...filters, keyword: e.target.value });
                  setMenuOpen(false);
                }}
              />
            </div>

            {/* Botones */}
            <button onClick={() => { toggleTheme(); setMenuOpen(false); }} className="flex items-center gap-2 cursor-pointer">
              {darkMode ? <FaSun size={18}/> : <FaMoon size={18}/>} {t.theme}
            </button>

            <button onClick={() => { toggleLang(); setMenuOpen(false); }} className="flex items-center gap-2 font-semibold cursor-pointer">
              <IoLanguageSharp size={18}/>
            </button>

            <button onClick={() => { openAbout(); setMenuOpen(false); }} className="flex items-center gap-2 font-semibold cursor-pointer">
              <FaInfoCircle size={18}/>
            </button>

            <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="flex items-center gap-2 text-red-500 font-semibold cursor-pointer">
              <FaSignOutAlt size={18}/> {t.logout}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
