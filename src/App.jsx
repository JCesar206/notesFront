import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import AddNote from "./components/AddNote";
import NotesList from "./components/NotesList";
import AboutModal from "./components/AboutModal";
import Footer from "./components/Footer";

export const LangContext = createContext();
export const ThemeContext = createContext();

const BASE_URL = "https://notesback-7rae.onrender.com/api";

function App() {
  const [lang, setLang] = useState("es");
  const [darkMode, setDarkMode] = useState(false);
  const [notes, setNotes] = useState([]);
  const [filters, setFilters] = useState({
    keyword: "",
    favorite: false,
    completed: false,
  });
  const [aboutOpen, setAboutOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

  const toggleLang = () => setLang((prev) => (prev === "es" ? "en" : "es"));
  const toggleTheme = () => setDarkMode((prev) => !prev);

  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await axios.get(`${BASE_URL}/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
        <div
          className={`${
            darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-black"
          } min-h-screen flex flex-col`}
        >
          <Navbar
            filters={filters}
            setFilters={setFilters}
            openAbout={() => setAboutOpen(true)}
          />

          <main className="container mx-auto p-4 flex flex-col gap-4 flex-grow">
            <AddNote
              fetchNotes={fetchNotes}
              noteToEdit={noteToEdit}
              setNoteToEdit={setNoteToEdit}
            />
            <NotesList
              notes={notes}
              fetchNotes={fetchNotes}
              filters={filters}
              setNoteToEdit={setNoteToEdit}
            />
          </main>

          {aboutOpen && <AboutModal close={() => setAboutOpen(false)} />}
          <Footer />
        </div>
      </ThemeContext.Provider>
    </LangContext.Provider>
  );
}

export default App;