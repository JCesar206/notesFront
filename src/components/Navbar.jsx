import { useState } from "react";
import { FaBars, FaTimes, FaSun, FaMoon, FaInfoCircle, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { IoLanguageSharp } from "react-icons/io5";

import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

function Navbar({ filters, setFilters, openAbout, setIsAuth }) {
  // ✅ hooks correctos
  const { language, toggleLanguage, t } = useLanguage();
  const { dark, toggleTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="font-semibold text-xl shadow-2xl shadow-violet-800">
          😃 {t("titleApp")}
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-2 top-2 text-gray-400" />
            <input placeholder={t("search")} value={filters.keyword}
              onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
              className="pl-8 pr-3 py-1 rounded border dark:bg-gray-700 dark:text-white font-semibold"/>
          </div>

          {/* Theme */}
          <button onClick={toggleTheme}
            className="flex items-center gap-2 font-semibold hover:underline cursor-pointer">
            {dark ? <FaSun size={18}/> : <FaMoon size={18}/>}
          </button>

          {/* Language */}
          <button onClick={toggleLanguage}
            className="flex items-center gap-2 hover:underline font-semibold cursor-pointer">
            <IoLanguageSharp size={18} />
          </button>

          {/* About */}
          <button onClick={openAbout}
            className="flex items-center gap-2 hover:underline font-semibold cursor-pointer">
            <FaInfoCircle size={18}/>
          </button>

          {/* Logout */}
          <button onClick={handleLogout}
            className="flex items-center gap-2 hover:underline text-red-500 font-semibold cursor-pointer">
            <FaSignOutAlt size={18}/> {t("logout")}
          </button>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="menu"
            className="cursor-pointer">
            {menuOpen ? <FaTimes size={22}/> : <FaBars size={22}/>}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={`md:hidden px-4 pb-4 ${dark ? "bg-gray-800" : "bg-white"}`}>
          <div className="flex flex-col gap-2">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-2 top-2 text-gray-400" />
              <input
                className="pl-8 pr-3 py-1 w-full rounded border dark:bg-gray-700 dark:text-white"
                placeholder={t("search")}
                value={filters.keyword}
                onChange={(e) => {
                  setFilters({ ...filters, keyword: e.target.value });
                  setMenuOpen(false);
                }}
              />
            </div>

            <button onClick={() => { toggleTheme(); setMenuOpen(false);}}
              className="flex items-center gap-2 cursor-pointer">
              {dark ? <FaSun size={18}/> : <FaMoon size={18}/>} {t("theme")}
            </button>

            <button onClick={() => {toggleLanguage(); setMenuOpen(false); }}
              className="flex items-center gap-2 font-semibold cursor-pointer">
              <IoLanguageSharp size={18} />
            </button>

            <button onClick={() => { openAbout(); setMenuOpen(false); }}
              className="flex items-center gap-2 font-semibold cursor-pointer">
              <FaInfoCircle size={18} />
            </button>

            <button onClick={() => { handleLogout(); setMenuOpen(false); }}
              className="flex items-center gap-2 text-red-500 font-semibold cursor-pointer">
              <FaSignOutAlt size={18} /> {t("logout")}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;