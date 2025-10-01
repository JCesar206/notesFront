import React from "react";
import { FaStar, FaCheck, FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";

const BASE_URL = "https://notesback-7rae.onrender.com/api";

function NotesList({ notes, fetchNotes, filters, setNoteToEdit, lang }) {
  const token = localStorage.getItem("token");

  const t = {
    es: { favorite: "Favorita", completed: "Completada" },
    en: { favorite: "Favorite", completed: "Completed" }
  }[lang];

  const filtered = notes.filter(note => {
    const matchesKeyword = note.title.toLowerCase().includes(filters.keyword.toLowerCase()) || note.content.toLowerCase().includes(filters.keyword.toLowerCase());
    const matchesFavorite = filters.favorite ? note.favorite : true;
    const matchesCompleted = filters.completed ? note.completed : true;
    return matchesKeyword && matchesFavorite && matchesCompleted;
  });

  const handleDelete = async (id) => { if (!token) return; try { await axios.delete(`${BASE_URL}/notes/${id}`, { headers: { Authorization: `Bearer ${token}` } }); fetchNotes(); } catch (err) { console.error(err); } };
  const toggleFavorite = async (note) => { if (!token) return; try { await axios.put(`${BASE_URL}/notes/${note.id}`, { ...note, favorite: !note.favorite }, { headers: { Authorization: `Bearer ${token}` } }); fetchNotes(); } catch (err) { console.error(err); } };
  const toggleCompleted = async (note) => { if (!token) return; try { await axios.put(`${BASE_URL}/notes/${note.id}`, { ...note, completed: !note.completed }, { headers: { Authorization: `Bearer ${token}` } }); fetchNotes(); } catch (err) { console.error(err); } };

  return (
    <div className="flex flex-col gap-2">
      {filtered.map(note => (
        <div key={note.id} className="p-4 bg-white dark:bg-gray-800 rounded shadow flex justify-between items-start">
          <div>
            <h3 className="font-bold">{note.title}</h3>
            <p>{note.content}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{note.category}</p>
          </div>
          <div className="flex flex-col gap-1">
            <button onClick={() => toggleFavorite(note)} className="flex items-center gap-1 cursor-pointer">{note.favorite ? <FaStar className="text-yellow-400" /> : <FaStar />} {t.favorite}</button>
            <button onClick={() => toggleCompleted(note)} className="flex items-center gap-1 cursor-pointer">{note.completed ? <FaCheck className="text-green-500" /> : <FaCheck />} {t.completed}</button>
            <button onClick={() => setNoteToEdit(note)} className="flex items-center gap-1 text-blue-500 cursor-pointer"><FaEdit /></button>
            <button onClick={() => handleDelete(note.id)} className="flex items-center gap-1 text-red-500 cursor-pointer"><FaTrash /></button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotesList;