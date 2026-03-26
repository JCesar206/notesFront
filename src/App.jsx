import React, { useState, useEffect, useContext } from "react";
import Navbar from "./components/Navbar";
import AddNote from "./components/AddNote";
import NotesList from "./components/NotesList";
import AboutModal from "./components/AboutModal";
import Footer from "./components/Footer";
import axios from "axios";
import { LanguageContext } from "../contexts/LangContext";
import { ThemeContext } from "../contexts/ThemeContext";
import "./App.css";
import { FaWhatsapp } from "react-icons/fa";

const BASE_URL = "https://notesback-7rae.onrender.com/api";

function App({ setIsAuth }) {
  // Consume context con seguridad
  const languageContext = useContext(LanguageContext);
  const themeContext = useContext(ThemeContext);

  // Si por alguna razón los contextos no están, asignamos valores por defecto
  const lang = languageContext?.lang || "es";
  const darkMode = themeContext?.darkMode || false;

  const [notes, setNotes] = useState([]);
  const [filters, setFilters] = useState({ keyword: "", favorite: false, completed: false });
  const [aboutOpen, setAboutOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await axios.get(`${BASE_URL}/notes`, { headers: { Authorization: `Bearer ${token}` } });
      setNotes(res.data);
    } catch (err) {
      console.error("Error al traer notas:", err);
    }
  };

  useEffect(() => { fetchNotes(); }, []);

  return (
    <div className={`${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen`}>
      <Navbar
        filters={filters}
        setFilters={setFilters}
        openAbout={() => setAboutOpen(true)}
        setIsAuth={setIsAuth}
      />
      <div className="container mx-auto p-4 flex flex-col gap-4">
        {/* Botón fijo de whatsapp */}
        <a href="https://wa.me/5217221828896" target="_blank" className="fixed bottom-10 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600"><FaWhatsapp size={24}/></a>
        <AddNote fetchNotes={fetchNotes} noteToEdit={noteToEdit} setNoteToEdit={setNoteToEdit} lang={lang} />
        <NotesList notes={notes} fetchNotes={fetchNotes} filters={filters} setNoteToEdit={setNoteToEdit} lang={lang} />
      </div>
      {aboutOpen && <AboutModal close={() => setAboutOpen(false)} />}
      <Footer />
    </div>
  );
}

export default App;