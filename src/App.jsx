import React, { useState, createContext, useEffect } from 'react';
import Navbar from './components/Navbar';
import AddNote from './components/AddNote';
import NotesList from './components/NotesList';
import AboutModal from './components/AboutModal';
import Footer from './components/Footer';
import axios from 'axios';
import './App.css';

export const LangContext = createContext();
export const ThemeContext = createContext();

const BASE_URL = "https://notesback-7rae.onrender.com/api";

function App({ setIsAuth }) {
  const [lang, setLang] = useState('es');
  const [darkMode, setDarkMode] = useState(false);
  const [notes, setNotes] = useState([]);
  const [filters, setFilters] = useState({
    keyword: '',
    favorite: false,
    completed: false
  });
  const [aboutOpen, setAboutOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

  const toggleLang = () => setLang(lang === 'es' ? 'en' : 'es');
  const toggleTheme = () => setDarkMode(!darkMode);

  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get(`${BASE_URL}/notes`, { headers: { Authorization: `Bearer ${token}` } });
      setNotes(res.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
        <div className={`${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-black'} min-h-screen`}>
          <Navbar
            filters={filters}
            setFilters={setFilters}
            openAbout={() => setAboutOpen(true)}
          />

          <div className="container mx-auto p-4 flex flex-col gap-4">
            <AddNote fetchNotes={fetchNotes} noteToEdit={noteToEdit} setNoteToEdit={setNoteToEdit} lang={lang} />
            <NotesList notes={notes} fetchNotes={fetchNotes} filters={filters} setNoteToEdit={setNoteToEdit} lang={lang} />
          </div>

          {aboutOpen && <AboutModal close={() => setAboutOpen(false)} />}
        </div>
        <Footer />
      </ThemeContext.Provider>
    </LangContext.Provider>
  );
}

export default App;