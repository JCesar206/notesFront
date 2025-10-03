import React from "react";
import { FaStar, FaCheck, FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";

const BASE_URL = "https://notesback-7rae.onrender.com/api";

function NotesList({ notes, fetchNotes, filters, setNoteToEdit, lang }) {
  const token = localStorage.getItem("token");

  const t = {
    es: { noNotes: "No hay notas", favorite: "Favorita", completed: "Completada", edit: "Editar", delete: "Eliminar" },
    en: { noNotes: "No notes", favorite: "Favorite", completed: "Completed", edit: "Edit", delete: "Delete" }
  }[lang];

  const filtered = notes.filter(note => {
    const kw = filters.keyword?.toLowerCase() || "";
    return (note.title.toLowerCase().includes(kw) || note.content.toLowerCase().includes(kw)) &&
           (filters.favorite ? note.favorite : true) &&
           (filters.completed ? note.completed : true);
  });

  const handleDelete = async (id) => {
    if (!token) return;
    await axios.delete(`${BASE_URL}/notes/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchNotes();
  };

  const toggleField = async (note, field) => {
    if (!token) return;
    const payload = { ...note, [field]: !note[field] };
    await axios.put(`${BASE_URL}/notes/${note.id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
    fetchNotes();
  };

  return (
    <div className="flex flex-col gap-3">
      {filtered.length === 0 && <div className="text-center text-gray-500">{t.noNotes}</div>}
      {filtered.map(note => (
        <div key={note.id} className="p-4 bg-white dark:bg-gray-800 rounded shadow flex justify-between items-start md:items-center gap-3">
          <div>
            <h3 className="font-bold">{note.title}</h3>
            <p>{note.content}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{note.category}</p>
          </div>
          <div className="flex flex-row md:flex-col items-center gap-2">
            <button onClick={() => toggleField(note, "favorite")} className="flex items-center gap-1 font-semibold cursor-pointer">
              <FaStar className={note.favorite ? "text-yellow-400" : ""} /> <span className="hidden md:inline cursor-pointer">{t.favorite}</span>
            </button>
            <button onClick={() => toggleField(note, "completed")} className="flex items-center gap-1">
              <FaCheck className={note.completed ? "text-green-500 font-semibold cursor-pointer" : ""} /> <span className="hidden md:inline">{t.completed}</span>
            </button>
            <button onClick={() => setNoteToEdit(note)} className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"><FaEdit /></button>
            <button onClick={() => handleDelete(note.id)} className="text-red-500 hover:text-red-700 font-semibold cursor-pointer"><FaTrash /></button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotesList;
