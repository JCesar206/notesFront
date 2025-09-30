import React, { useState, useContext } from 'react';
import { FaBars, FaTimes, FaSun, FaMoon, FaInfoCircle, FaStar, FaCheck, FaSignOutAlt } from 'react-icons/fa';
import { LangContext, ThemeContext } from '../App';

function Navbar({ filters, setFilters, openAbout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggleLang } = useContext(LangContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const t = {
    es: { add: 'Agregar nota', search: 'Buscar...', favorite: 'Favoritas', completed: 'Completadas', about: 'Acerca de', lang: 'Idioma', theme: 'Tema', logout: 'Cerrar sesión', titleApp: 'Nota Loka' },
    en: { add: 'Add note', search: 'Search...', favorite: 'Favorites', completed: 'Completed', about: 'About', lang: 'Language', theme: 'Theme', logout: 'Logout', titleApp: 'Crazy Notes' }
  }[lang];

  const handleSearch = e => setFilters({ ...filters, keyword: e.target.value });
  const toggleFavorite = () => setFilters({ ...filters, favorite: !filters.favorite });
  const toggleCompleted = () => setFilters({ ...filters, completed: !filters.completed });

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const menuItems = [
    { name: t.favorite, icon: <FaStar />, action: toggleFavorite, active: filters.favorite },
    { name: t.completed, icon: <FaCheck />, action: toggleCompleted, active: filters.completed },
    { name: t.lang, icon: <FaInfoCircle />, action: toggleLang },
    { name: t.theme, icon: darkMode ? <FaSun /> : <FaMoon />, action: toggleTheme },
    { name: t.about, icon: <FaInfoCircle />, action: openAbout },
    { name: t.logout, icon: <FaSignOutAlt />, action: handleLogout }
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">📝 {t.titleApp}</div>
        <div className="hidden md:flex gap-4 items-center">
          {menuItems.map((item, i) => (
            <button key={i} onClick={item.action} className={`flex items-center gap-1 hover:underline ${item.active ? 'text-blue-500' : ''}`}>{item.icon} {item.name}</button>
          ))}
        </div>
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}</button>
        </div>
      </div>
      {menuOpen && (
        <div className="flex flex-col gap-2 mt-2 md:hidden">
          {menuItems.map((item, i) => (
            <button key={i} onClick={() => { item.action(); setMenuOpen(false); }} className={`flex font-semibold items-center gap-2 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${item.active ? 'bg-blue-200 dark:bg-blue-600' : ''}`}>{item.icon} {item.name}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;