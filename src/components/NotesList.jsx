import React from "react";
import { FaTrash, FaEdit, FaStar, FaCheck } from "react-icons/fa";
import axios from "axios";

const BASE_URL = "https://notesback-7rae.onrender.com/api";

function NotesList({ notes, fetchNotes, filters, setNoteToEdit }) {
  const token = localStorage.getItem("token");

  // Borrar nota
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  // Marcar favorita
  const toggleFavorite = async (note) => {
    try {
      await axios.put(
        `${BASE_URL}/notes/${note._id}`,
        { ...note, favorite: !note.favorite },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  // Marcar completada
  const toggleCompleted = async (note) => {
    try {
      await axios.put(
        `${BASE_URL}/notes/${note._id}`,
        { ...note, completed: !note.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  // Filtros
  const filteredNotes = notes.filter((note) => {
    if (filters.keyword && !note.title.toLowerCase().includes(filters.keyword.toLowerCase()) && 
        !note.content.toLowerCase().includes(filters.keyword.toLowerCase())) {
      return false;
    }
    if (filters.favorite && !note.favorite) return false;
    if (filters.completed && !note.completed) return false;
    return true;
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredNotes.map((note) => (
        <div
          key={note._id}
          className="p-4 border rounded shadow bg-white dark:bg-gray-800 dark:text-white"
        >
          <div className="flex justify-between items-center mb-2">
            <span
              className={`font-bold text-lg ${
                note.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {note.title}
            </span>
            <div className="flex gap-2">
              <button onClick={() => toggleFavorite(note)}>
                <FaStar
                  className={`${
                    note.favorite ? "text-yellow-500 cursor-pointer" : "text-gray-400 cursor-pointer"
                  }`}
                />
              </button>
              <button onClick={() => toggleCompleted(note)}>
                <FaCheck
                  className={`${
                    note.completed ? "text-green-500 cursor-pointer" : "text-gray-400 cursor-pointer"
                  }`}
                />
              </button>
              <button onClick={() => setNoteToEdit(note)}>
                <FaEdit className="text-blue-500 cursor-pointer" />
              </button>
              <button onClick={() => handleDelete(note._id)}>
                <FaTrash className="text-red-500 cursor-pointer" />
              </button>
            </div>
          </div>
          <p
            className={`${
              note.completed ? "line-through text-gray-400 font-semibold" : ""
            }`}
          >
            {note.content}
          </p>
          <p className="text-sm text-gray-500 mt-1 font-semibold">
            📂 {note.category || "Sin categoría"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default NotesList;
