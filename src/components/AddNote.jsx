import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "https://notesback-7rae.onrender.com/api";

function AddNote({ fetchNotes, noteToEdit, setNoteToEdit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [favorite, setFavorite] = useState(false);

  const token = localStorage.getItem("token");

  // Si hay nota a editar, cargamos los datos
  React.useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setCategory(noteToEdit.category || "");
      setFavorite(noteToEdit.favorite || false);
    }
  }, [noteToEdit]);

  // Guardar o actualizar nota
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (noteToEdit) {
        await axios.put(
          `${BASE_URL}/notes/${noteToEdit._id}`,
          { title, content, category, favorite },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `${BASE_URL}/notes`,
          { title, content, category, favorite },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      fetchNotes();
      handleClear();
    } catch (err) {
      console.error(err);
    }
  };

  // Limpiar formulario
  const handleClear = () => {
    setTitle("");
    setContent("");
    setCategory("");
    setFavorite(false);
    setNoteToEdit(null);
  };

  // Insertar emoji al contenido
  const insertEmoji = (emoji) => {
    setContent(content + " " + emoji);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white dark:bg-gray-800 rounded shadow flex flex-col gap-3"
    >
      {/* Título */}
      <input
        className="border p-2 rounded dark:bg-gray-700 dark:text-white"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      {/* Contenido */}
      <textarea
        className="border p-2 rounded dark:bg-gray-700 dark:text-white"
        placeholder="Contenido..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="4"
        required
      />

      {/* Categoría */}
      <input
        className="border p-2 rounded dark:bg-gray-700 dark:text-white"
        placeholder="Categoría"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      {/* Favorito */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={favorite}
          onChange={(e) => setFavorite(e.target.checked)}
        />
        Favorito ⭐
      </label>

      {/* Emojis */}
      <div className="flex gap-2">
        {["😀", "🔥", "💡", "✅", "📌","😎","😱","👍","🐶","🐱","❤️","💯","🥺","🤯","😡","🙏","🤗","😍"].map((emoji) => (
          <button
            key={emoji}
            type="button"
            onClick={() => insertEmoji(emoji)}
            className="px-2 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {emoji}
          </button>
        ))}
      </div>

      {/* Botones */}
      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-violet-700 font-semibold cursor-pointer"
        >
          {noteToEdit ? "Actualizar 🔄" : "Agregar 🆕"}
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600 font-semibold cursor-pointer"
        >
          Limpiar 🧹
        </button>
      </div>
    </form>
  );
}

export default AddNote;
