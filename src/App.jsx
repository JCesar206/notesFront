import React, { useState, useEffect, useContext } from "react";
import Navbar from "./components/Navbar";
import AddNote from "./components/AddNote";
import NotesList from "./components/NotesList";
import AboutModal from "./components/AboutModal";
import Footer from "./components/Footer";
import axios from "axios";
import { LangContext } from "./contexts/LangContext";
import { ThemeContext } from "./contexts/ThemeContext";
import "./App.css";

const BASE_URL = "https://notesback-7rae.onrender.com/api";

function App({ setIsAuth }) {
  // Consume context con seguridad
  const langContext = useContext(LangContext);
  const themeContext = useContext(ThemeContext);

  // Si por alguna razón los contextos no están, asignamos valores por defecto
  const lang = langContext?.lang || "es";
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
        <AddNote fetchNotes={fetchNotes} noteToEdit={noteToEdit} setNoteToEdit={setNoteToEdit} lang={lang} />
        <NotesList notes={notes} fetchNotes={fetchNotes} filters={filters} setNoteToEdit={setNoteToEdit} lang={lang} />
      </div>
      {aboutOpen && <AboutModal close={() => setAboutOpen(false)} />}
      <Footer />
    </div>
  );
}

export default App;
