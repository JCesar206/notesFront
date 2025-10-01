import React, { useContext } from "react";
import { LangContext, ThemeContext } from "../App";

function Navbar({ filters, setFilters }) {
  const { lang, toggleLang } = useContext(LangContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const t = {
    es: { search: "Buscar", dark: "Oscuro", light: "Claro", lang: "EN" },
    en: { search: "Search", dark: "Dark", light: "Light", lang: "ES" }
  }[lang];

  return (
    <nav className={`p-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} flex justify-between items-center`}>
      <input type="text" placeholder={t.search} value={filters.keyword} onChange={e => setFilters({ ...filters, keyword: e.target.value })} className="p-2 rounded border dark:bg-gray-700 dark:text-white" />
      <div className="flex gap-2">
        <button onClick={toggleTheme} className="p-2 border rounded cursor-pointer">{darkMode ? t.light : t.dark}</button>
        <button onClick={toggleLang} className="p-2 border rounded cursor-pointer">{t.lang}</button>
      </div>
    </nav>
  );
}

export default Navbar;