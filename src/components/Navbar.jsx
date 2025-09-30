import React, { useContext } from "react";
import { LangContext, ThemeContext } from "../App";

function Navbar({ filters, setFilters, openAbout }) {
  const { lang, toggleLang } = useContext(LangContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const translations = {
    es: {
      title: "Notas",
      search: "Buscar...",
      favorite: "Favoritas",
      completed: "Completadas",
      about: "Acerca de",
    },
    en: {
      title: "Notes",
      search: "Search...",
      favorite: "Favorites",
      completed: "Completed",
      about: "About",
    },
  };

  return (
    <nav
      className={`p-4 flex justify-between items-center shadow-md ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-xl font-bold">{translations[lang].title}</h1>

      <div className="flex items-center gap-3">
        {/* Filtro de búsqueda */}
        <input
          type="text"
          placeholder={translations[lang].search}
          value={filters.keyword}
          onChange={(e) =>
            setFilters({ ...filters, keyword: e.target.value })
          }
          className="border rounded p-1 text-sm"
        />

        {/* Checkbox favoritos */}
        <label className="flex items-center gap-1 text-sm">
          <input
            type="checkbox"
            checked={filters.favorite}
            onChange={(e) =>
              setFilters({ ...filters, favorite: e.target.checked })
            }
          />
          {translations[lang].favorite}
        </label>

        {/* Checkbox completados */}
        <label className="flex items-center gap-1 text-sm">
          <input
            type="checkbox"
            checked={filters.completed}
            onChange={(e) =>
              setFilters({ ...filters, completed: e.target.checked })
            }
          />
          {translations[lang].completed}
        </label>

        {/* Botones */}
        <button onClick={toggleLang} className="px-2 py-1 border rounded cursor-pointer">
          {lang === "es" ? "EN" : "ES"}
        </button>

        <button onClick={toggleTheme} className="px-2 py-1 border rounded cursor-pointer">
          {darkMode ? "☀️" : "🌙"}
        </button>

        <button onClick={openAbout} className="px-2 py-1 border rounded cursor-pointer">
          {translations[lang].about}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;