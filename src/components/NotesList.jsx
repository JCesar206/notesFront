import React, { useContext } from "react";
import axios from "axios";
import { LangContext, ThemeContext } from "../App";

const BASE_URL = "https://notesback-7rae.onrender.com/api";

function NotesList({ notes, fetchNotes, filters, setNoteToEdit }) {
  const { lang } = useContext(LangContext);
  const { darkMode } = useContext(ThemeContext);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.delete(`${BASE_URL}/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const filteredNotes = notes.filter((note) => {
    if (filters.keyword && !note.title.toLowerCase().includes(filters.keyword.toLowerCase())) return false;
    if (filters.favorite && !note.favorite) return false;
    if (filters.completed && !note.completed) return false;
    return true;
  });

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredNotes.length === 0 ? (
        <p>{lang === "es" ? "No hay notas disponibles." : "No notes available."}</p>
      ) : (
        filteredNotes.map((note) => (
          <div
            key={note.id}
            className={`${darkMode ? "bg-gray-800" : "bg-white"} p-4 rounded shadow-md`}
          >
            <h3 className="font-bold text-lg">{note.title}</h3>
            <p className="text-sm">{note.content}</p>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => setNoteToEdit(note)}
                className="text-blue-500 font-semibold cursor-pointer"
              >
                {lang === "es" ? "Editar" : "Edit"}
              </button>
              <button
                onClick={() => handleDelete(note.id)}
                className="text-red-500 font-semibold cursor-pointer"
              >
                {lang === "es" ? "Eliminar" : "Delete"}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default NotesList;