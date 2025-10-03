import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://notesback-7rae.onrender.com/api";

function AddNote({ fetchNotes, noteToEdit, setNoteToEdit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title || "");
      setContent(noteToEdit.content || "");
      setCategory(noteToEdit.category || "");
      setFavorite(noteToEdit.favorite || false);
      setCompleted(noteToEdit.completed || false);
    }
  }, [noteToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const noteData = { title, content, category, favorite, completed };

      if (noteToEdit) {
        await axios.put(`${BASE_URL}/notes/${noteToEdit._id}`, noteData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNoteToEdit(null);
      } else {
        await axios.post(`${BASE_URL}/notes`, noteData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      // Reset fields
      handleClear();
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleClear = () => {
    setTitle("");
    setContent("");
    setCategory("");
    setFavorite(false);
    setCompleted(false);
    setNoteToEdit(null);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 border rounded dark:bg-gray-800">
      {/* Título */}
      <input
        type="text"
        placeholder="📌 Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
        required
      />

      {/* Contenido */}
      <textarea
        placeholder="📝 Contenido"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
        rows={3}
        required
      />

      {/* Categoría */}
      <input
        type="text"
        placeholder="🏷️ Categoría"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
      />

      {/* Opciones */}
      <div className="flex gap-4 items-center">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={favorite}
            onChange={() => setFavorite(!favorite)}
          />
          ⭐ Favorito
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => setCompleted(!completed)}
          />
          ✅ Completada
        </label>
      </div>

      {/* Botones */}
      <div className="flex gap-3">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 font-black cursor-pointer"
        >
          {noteToEdit ? "Actualizar ✏️" : "Agregar ➕"}
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-700 cursor-pointer"
        >
          Limpiar 🧹
        </button>
      </div>
    </form>
  );
}

export default AddNote;
