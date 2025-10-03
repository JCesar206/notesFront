import React, { useState, useContext } from "react";
import {
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
  FaInfoCircle,
  FaSearch,
  FaSignOutAlt,
  FaStar,
  FaCheck,
  FaGlobe,
} from "react-icons/fa";
import { LangContext } from "../contexts/LangContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

function Navbar({ filters, setFilters, openAbout, setIsAuth }) {
  const { lang, toggleLang } = useContext(LangContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const t = {
    es: {
      search: "Buscar...",
      favorite: "Favoritas",
      completed: "Completadas",
      about: "Acerca de",
      lang: "EN",
      theme: "Tema",
      logout: "Cerrar sesión",
    },
    en: {
      search: "Search...",
      favorite: "Favorites",
      completed: "Completed",
      about: "About",
      lang: "ES",
      theme: "Theme",
      logout: "Logout",
    },
  }[lang];

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="font-bold text-xl">😃 Nota Loka</div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-2 top-2 text-gray-400" />
            <input
              className="pl-8 pr-3 py-1 rounded border dark:bg-gray-700 dark:text-white font-semibold"
              placeholder={t.search}
              value={filters.keyword}
              onChange={(e) =>
                setFilters({ ...filters, keyword: e.target.value })
              }
            />
          </div>

          {/* Favorite */}
          <button
            onClick={() =>
              setFilters((prev) => ({ ...prev, favorite: !prev.favorite }))
            }
            className="flex items-center gap-2 px-3 py-1 rounded hover:underline cursor-pointer"
          >
            <FaStar className={filters.favorite ? "text-yellow-500" : ""} />{" "}
            {t.favorite}
          </button>

          {/* Completed */}
          <button
            onClick={() =>
              setFilters((prev) => ({ ...prev, completed: !prev.completed }))
            }
            className="flex items-center gap-2 px-3 py-1 rounded hover:underline cursor-pointer"
          >
            <FaCheck className={filters.completed ? "text-green-500" : ""} />{" "}
            {t.completed}
          </button>

          {/* Theme */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-1 rounded hover:underline cursor-pointer"
          >
            {darkMode ? <FaSun /> : <FaMoon />} {t.theme}
          </button>

          {/* Language */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 px-3 py-1 rounded hover:underline cursor-pointer"
          >
            <FaGlobe /> {t.lang}
          </button>

          {/* About */}
          <button
            onClick={openAbout}
            className="flex items-center gap-2 px-3 py-1 rounded hover:underline cursor-pointer"
          >
            <FaInfoCircle /> {t.about}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1 rounded hover:underline text-red-500 cursor-pointer"
          >
            <FaSignOutAlt /> {t.logout}
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className={`md:hidden px-4 pb-4 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex flex-col gap-3">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-2 top-2 text-gray-400" />
              <input
                className="pl-8 pr-3 py-1 w-full rounded border dark:bg-gray-700 dark:text-white"
                placeholder={t.search}
                value={filters.keyword}
                onChange={(e) => {
                  setFilters({ ...filters, keyword: e.target.value });
                }}
              />
            </div>

            <button
              onClick={() =>
                setFilters((prev) => ({ ...prev, favorite: !prev.favorite }))
              }
              className="flex items-center gap-2 cursor-pointer"
            >
              <FaStar className={filters.favorite ? "text-yellow-500" : ""} />{" "}
              {t.favorite}
            </button>

            <button
              onClick={() =>
                setFilters((prev) => ({ ...prev, completed: !prev.completed }))
              }
              className="flex items-center gap-2 cursor-pointer"
            >
              <FaCheck className={filters.completed ? "text-green-500" : ""} />{" "}
              {t.completed}
            </button>

            <button
              onClick={() => {
                toggleTheme();
              }}
              className="flex items-center gap-2 cursor-pointer"
            >
              {darkMode ? <FaSun /> : <FaMoon />} {t.theme}
            </button>

            <button
              onClick={() => {
                toggleLang();
              }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <FaGlobe /> {t.lang}
            </button>

            <button
              onClick={() => {
                openAbout();
              }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <FaInfoCircle /> {t.about}
            </button>

            <button
              onClick={() => {
                handleLogout();
              }}
              className="flex items-center gap-2 text-red-500 cursor-pointer"
            >
              <FaSignOutAlt /> {t.logout}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
