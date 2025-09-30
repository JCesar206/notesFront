import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { LangContext, ThemeContext } from "../App";

const BASE_URL = "https://notesback-7rae.onrender.com/api";

function AddNote({ fetchNotes, noteToEdit, setNoteToEdit }) {
  const { lang } = useContext(LangContext);
  const { darkMode } = useContext(ThemeContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setFavorite(noteToEdit.favorite);
    }
  }, [noteToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      if (noteToEdit) {
        await axios.put(
          `${BASE_URL}/notes/${noteToEdit.id}`,
          { title, content, favorite },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `${BASE_URL}/notes`,
          { title, content, favorite },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      fetchNotes();
      setTitle("");
      setContent("");
      setFavorite(false);
      setNoteToEdit(null);
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${darkMode ? "bg-gray-800" : "bg-white"} p-4 rounded shadow-md flex flex-col gap-3`}
    >
      <input
        type="text"
        placeholder={lang === "es" ? "Título" : "Title"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="p-2 rounded border dark:bg-gray-700 cursor-text"
      />

      <textarea
        placeholder={lang === "es" ? "Contenido" : "Content"}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="p-2 rounded border dark:bg-gray-700 cursor-text"
      />

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={favorite}
          onChange={(e) => setFavorite(e.target.checked)}
        />
        {lang === "es" ? "Favorito" : "Favorite"}
      </label>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded p-2 cursor-pointer"
      >
        {noteToEdit
          ? lang === "es"
            ? "Actualizar Nota"
            : "Update Note"
          : lang === "es"
            ? "Agregar Nota"
            : "Add Note"}
      </button>
    </form>
  );
}

export default AddNote;