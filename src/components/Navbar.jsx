import React, { useContext } from "react";
import { LangContext, ThemeContext } from "../App";

function Navbar({ filters, setFilters, openAbout }) {
  const { lang, toggleLang } = useContext(LangContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"} shadow-md p-4 flex justify-between items-center`}>
      <h1 className="text-xl font-bold">
        {lang === "es" ? "Mis Notas" : "My Notes"}
      </h1>

      <div className="flex gap-3 items-center">
        <input
          type="text"
          placeholder={lang === "es" ? "Buscar..." : "Search..."}
          value={filters.keyword}
          onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
          className="p-1 rounded border dark:bg-gray-700"
        />

        <button onClick={() => setFilters({ ...filters, favorite: !filters.favorite })} className="text-sm cursor-pointer">
          {filters.favorite ? (lang === "es" ? "Fav ✓" : "Fav ✓") : (lang === "es" ? "Fav" : "Fav")}
        </button>

        <button onClick={() => setFilters({ ...filters, completed: !filters.completed })} className="text-sm">
          {filters.completed ? (lang === "es" ? "Hechas ✓" : "Done ✓") : (lang === "es" ? "Hechas" : "Done")}
        </button>

        <button onClick={toggleLang} className="px-2 py-1 border rounded cursor-pointer">
          {lang === "es" ? "EN" : "ES"}
        </button>

        <button onClick={toggleTheme} className="px-2 py-1 border rounded cursor-pointer">
          {darkMode ? "☀️" : "🌙"}
        </button>

        <button onClick={openAbout} className="px-2 py-1 border rounded">
          {lang === "es" ? "Acerca de" : "About"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;