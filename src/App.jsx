import React, { useState, useEffect, createContext } from "react";
import Navbar from "./components/Navbar";
import NotesList from "./components/NotesList";
import AddNote from "./components/AddNote";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChangePassword from "./pages/ChangePassword";
import api from "./api";
import Footer from "./components/Footer";
import "./App.css";

export const LangContext = createContext();
export const ThemeContext = createContext();

function App() {
  // Context states
  const [lang, setLang] = useState("es"); // "es" o "en"
  const [darkMode, setDarkMode] = useState(false);

  const toggleLang = () => setLang(prev => (prev === "es" ? "en" : "es"));
  const toggleTheme = () => setDarkMode(prev => !prev);

  // Authentication
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
  const [page, setPage] = useState("login"); // "login", "register", "changePassword", "app"

  useEffect(() => {
    if (isAuth) setPage("app");
    else setPage("login");
  }, [isAuth]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    setPage("login");
  };

  // Notes
  const [notes, setNotes] = useState([]);
  const [filters, setFilters] = useState({ keyword: "", favorite: false, completed: false });
  const [noteToEdit, setNoteToEdit] = useState(null);

  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await api.get("/notes", { headers: { Authorization: `Bearer ${token}` } });
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAuth) fetchNotes();
  }, [isAuth]);

  // Translation
  const t = {
    es: { login: "Iniciar sesión", register: "Registrar", changePassword: "Cambiar contraseña" },
    en: { login: "Login", register: "Register", changePassword: "Change Password" }
  }[lang];

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
        <div className={darkMode ? "dark bg-gray-900 min-h-screen text-white" : "bg-gray-100 min-h-screen text-black"}>
          <Navbar filters={filters} setFilters={setFilters} openAbout={() => {}} logout={handleLogout} />
          <div className="container mx-auto p-4">
            {!isAuth && page === "login" && <Login setIsAuth={setIsAuth} />}
            {!isAuth && page === "register" && <Register setIsAuth={setIsAuth} />}
            {!isAuth && page === "changePassword" && <ChangePassword />}
            {isAuth && page === "app" && (
              <>
                <AddNote fetchNotes={fetchNotes} noteToEdit={noteToEdit} setNoteToEdit={setNoteToEdit} lang={lang} />
                <NotesList notes={notes} fetchNotes={fetchNotes} filters={filters} setNoteToEdit={setNoteToEdit} />
              </>
            )}
          </div>
          <Footer />
        </div>
      </ThemeContext.Provider>
    </LangContext.Provider>
  );
}

export default App;