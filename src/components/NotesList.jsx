{/* Componente NotesList */}
import React from "react";
import { FaStar, FaCheck, FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";

const BASE_URL = "https://notesback-7rae.onrender.com/api";

function NotesList({ notes, fetchNotes, filters, setNoteToEdit, lang }) {
  const token = localStorage.getItem("token");

  const t = {
    es: { favorite: "Favorita", completed: "Completada", edit: "Editar", del: "Eliminar" },
    en: { favorite: "Favorite", completed: "Completed", edit: "Edit", del: "Delete" }
  }[lang];

  const filtered = notes.filter(note => {
    const kw = filters.keyword?.toLowerCase() || "";
    const matchesKeyword = note.title.toLowerCase().includes(kw) || note.content.toLowerCase().includes(kw);
    const matchesFavorite = filters.favorite ? note.favorite : true;
    const matchesCompleted = filters.completed ? note.completed : true;
    return matchesKeyword && matchesFavorite && matchesCompleted;
  });

  const handleDelete = async (id) => {
    if (!token) return;
    try { await axios.delete(`${BASE_URL}/notes/${id}`, { headers: { Authorization: `Bearer ${token}` } }); fetchNotes(); }
    catch (err) { console.error(err); }
  };

  const toggleFavorite = async (note) => {
    if (!token) return;
    try { await axios.put(`${BASE_URL}/notes/${note.id}`, { ...note, favorite: !note.favorite }, { headers: { Authorization: `Bearer ${token}` } }); fetchNotes(); }
    catch (err) { console.error(err); }
  };

  const toggleCompleted = async (note) => {
    if (!token) return;
    try { await axios.put(`${BASE_URL}/notes/${note.id}`, { ...note, completed: !note.completed }, { headers: { Authorization: `Bearer ${token}` } }); fetchNotes(); }
    catch (err) { console.error(err); }
  };

  return (
    <div className="flex flex-col gap-3">
      {filtered.length === 0 && <div className="text-center font-semibold text-gray-500">No hay notas</div>}
      {filtered.map(note => (
        <div key={note.id} className="p-4 bg-white dark:bg-gray-800 rounded shadow flex flex-col md:flex-row justify-between gap-3">
          <div>
            <h3 className="font-bold">{note.title}</h3>
            <p>{note.content}</p>
            <p className="text-sm text-gray-500 font-semibold dark:text-gray-400">{note.category}</p>
          </div>
          <div className="flex flex-row md:flex-col items-center gap-2">
            <button onClick={() => toggleFavorite(note)} className="flex items-center gap-1 cursor-pointer">{note.favorite ? <FaStar className="text-yellow-400" /> : <FaStar />} <span className="hidden md:inline">{t.favorite}</span></button>
            <button onClick={() => toggleCompleted(note)} className="flex items-center gap-1 cursor-pointer">{note.completed ? <FaCheck className="text-green-500" /> : <FaCheck />} <span className="hidden md:inline">{t.completed}</span></button>
            <button onClick={() => setNoteToEdit(note)} className="text-blue-500 cursor-pointer"><FaEdit /></button>
            <button onClick={() => handleDelete(note.id)} className="text-red-500 cursor-pointer"><FaTrash /></button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotesList;
