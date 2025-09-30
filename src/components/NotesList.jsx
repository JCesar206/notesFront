import React, { useContext } from "react";
import axios from "axios";
import { LangContext, ThemeContext } from "../contexts";

const BASE_URL = "https://notesback-7rae.onrender.com/api";

function NotesList({ notes, fetchNotes, filters, setNoteToEdit }) {
  const { lang } = useContext(LangContext);
  const { darkMode } = useContext(ThemeContext);

  const translations = {
    es: { edit: "Editar", delete: "Eliminar", noNotes: "No hay notas" },
    en: { edit: "Edit", delete: "Delete", noNotes: "No notes" },
  };

  const token = localStorage.getItem("token");

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotes();
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  const filteredNotes = notes.filter((note) => {
    if (filters.keyword && !note.title.includes(filters.keyword)) return false;
    if (filters.favorite && !note.favorite) return false;
    if (filters.completed && !note.completed) return false;
    return true;
  });

  return (
    <div className="grid gap-4">
      {filteredNotes.length === 0 ? (
        <p>{translations[lang].noNotes}</p>
      ) : (
        filteredNotes.map((note) => (
          <div
            key={note.id}
            className={`p-4 rounded shadow ${
              darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
            }`}
          >
            <h2 className="font-bold">{note.title}</h2>
            <p className="mb-2">{note.content}</p>
            <div className="flex gap-2">
              <button
                onClick={() => setNoteToEdit(note)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-2 py-1 rounded cursor-pointer"
              >
                {translations[lang].edit}
              </button>
              <button
                onClick={() => handleDelete(note.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-2 py-1 rounded cursor-pointer"
              >
                {translations[lang].delete}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default NotesList;