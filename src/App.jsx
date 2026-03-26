import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import AddNote from "./components/AddNote";
import NotesList from "./components/NotesList";
import AboutModal from "./components/AboutModal";
import Footer from "./components/Footer";

import { useLanguage } from "./context/LanguageContext";
import { useTheme } from "./context/ThemeContext";

import { FaWhatsapp } from "react-icons/fa";
import "./App.css";

import axios from "axios";

const BASE_URL = "https://notesback-7rae.onrender.com/api";

function App({ setIsAuth }) {
  // ✅ Usamos hooks custom (mejor práctica)
  const { language } = useLanguage();
  const { dark } = useTheme();

  const [notes, setNotes] = useState([]);
  const [filters, setFilters] = useState({
    keyword: "",
    favorite: false,
    completed: false,
  });
  const [aboutOpen, setAboutOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get(`${BASE_URL}/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err) {
      console.error("Error al traer notas:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div
      className={`${
        dark ? "dark bg-gray-900 text-white" : "bg-gray-100 text-black"
      } min-h-screen`}
    >
      <Navbar
        filters={filters}
        setFilters={setFilters}
        openAbout={() => setAboutOpen(true)}
        setIsAuth={setIsAuth}
      />

      <div className="container mx-auto p-4 flex flex-col gap-4">
        {/* Botón fijo de WhatsApp */}
        <a
          href="https://wa.me/5217221828896"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-10 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600"
        >
          <FaWhatsapp size={24} />
        </a>

        <AddNote
          fetchNotes={fetchNotes}
          noteToEdit={noteToEdit}
          setNoteToEdit={setNoteToEdit}
          lang={language}
        />

        <NotesList
          notes={notes}
          fetchNotes={fetchNotes}
          filters={filters}
          setNoteToEdit={setNoteToEdit}
          lang={language}
        />
      </div>

      {aboutOpen && <AboutModal close={() => setAboutOpen(false)} />}
      <Footer />
    </div>
  );
}

export default App;
