import React, { useContext } from "react";
import axios from "axios";
import { LangContext } from "../contexts/LangContext";
import { FaTrash, FaEdit, FaStar, FaCheck } from "react-icons/fa";

const BASE_URL = "https://notesback-7rae.onrender.com/api";

function NotesList({ notes, fetchNotes, filters, setNoteToEdit }) {
  const { lang } = useContext(LangContext) || { lang: "es" };

  const t = {
    es: { noNotes: "No hay notas", edit: "Editar", delete: "Eliminar" },
    en: { noNotes: "No notes", edit: "Edit", delete: "Delete" },
  }[lang || "es"];

  const token = localStorage.getItem("token");

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

  const handleToggleFavorite = async (note) => {
    try {
      await axios.put(
        `${BASE_URL}/notes/${note._id}`,
        { favorite: !note.favorite },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleCompleted = async (note) => {
    try {
      await axios.put(
        `${BASE_URL}/notes/${note._id}`,
        { completed: !note.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredNotes = notes.filter((note) => {
    return (
      (note.title?.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        note.content?.toLowerCase().includes(filters.keyword.toLowerCase())) &&
      (!filters.favorite || note.favorite) &&
      (!filters.completed || note.completed)
    );
  });

  if (filteredNotes.length === 0) {
    return <p className="text-center text-gray-500">{t.noNotes}</p>;
  }

  // Definimos emoji alusivo según estado
  const getEmoji = (note) => {
    if (note.completed) return "✅";
    if (note.favorite) return "⭐";
    return "📌";
  };

  return (
    <div className="grid gap-3">
      {filteredNotes.map((note) => (
        <div
          key={note._id}
          className="p-3 border rounded shadow-sm flex justify-between items-center dark:bg-gray-800"
        >
          {/* IZQUIERDA - emoji + texto */}
          <div className="flex items-start gap-3 flex-1">
            <span className="text-2xl">{getEmoji(note)}</span>
            <div>
              <h3
                className={`font-semibold ${
                  note.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {note.title || "Sin título"}
              </h3>
              <p
                className={`${
                  note.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {note.content}
              </p>
              <p className="text-sm text-gray-500 font-semibold mt-1">
                📂 {note.category || "Sin categoría"}
              </p>
            </div>
          </div>

          {/* DERECHA - acciones */}
          <div className="flex gap-3">
            <button onClick={() => handleToggleFavorite(note)} title="Favorito">
              <FaStar
                className={
                  note.favorite
                    ? "text-yellow-500 cursor-pointer"
                    : "text-gray-400 cursor-pointer"
                }
              />
            </button>
            <button
              onClick={() => handleToggleCompleted(note)}
              title="Completado"
            >
              <FaCheck
                className={
                  note.completed
                    ? "text-green-500 font-semibold cursor-pointer"
                    : "text-gray-400 font-semibold cursor-pointer"
                }
              />
            </button>
            <button onClick={() => setNoteToEdit(note)} title={t.edit}>
              <FaEdit className="text-blue-500 font-semibold cursor-pointer" />
            </button>
            <button onClick={() => handleDelete(note._id)} title={t.delete}>
              <FaTrash className="text-red-500 font-semibold cursor-pointer" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotesList;
