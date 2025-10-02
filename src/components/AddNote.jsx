import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegSmile } from "react-icons/fa";
import Picker from "emoji-picker-react";

const BASE_URL = "https://notesback-7rae.onrender.com/api";

function AddNote({ fetchNotes, noteToEdit, setNoteToEdit, lang }) {
  const [title, setTitle] = useState(noteToEdit?.title || "");
  const [content, setContent] = useState(noteToEdit?.content || "");
  const [category, setCategory] = useState(noteToEdit?.category || "");
  const [favorite, setFavorite] = useState(noteToEdit?.favorite || false);
  const [completed, setCompleted] = useState(noteToEdit?.completed || false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle(noteToEdit?.title || "");
    setContent(noteToEdit?.content || "");
    setCategory(noteToEdit?.category || "");
    setFavorite(noteToEdit?.favorite || false);
    setCompleted(noteToEdit?.completed || false);
  }, [noteToEdit]);

  const t = {
    es: { title: "Título", content: "Contenido", category: "Categoría", favorite: "Favorita", completed: "Completada", add: "Agregar", update: "Actualizar", clear: "Limpiar" },
    en: { title: "Title", content: "Content", category: "Category", favorite: "Favorite", completed: "Completed", add: "Add", update: "Update", clear: "Clear" }
  }[lang];

  const handleClear = () => {
    setTitle("");
    setContent("");
    setCategory("");
    setFavorite(false);
    setCompleted(false);
    setError("");
    setNoteToEdit(null);
    const el = document.getElementById("titleInput");
    if (el) el.focus();
  };

  const onEmojiClick = (event, emojiObject) => {
    setContent(prev => prev + emojiObject.emoji);
    setShowEmoji(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("token");
    if (!token) { setError(lang === "es" ? "Usuario no autenticado" : "User not authenticated"); return; }
    if (!title || !content) { setError(lang === "es" ? "Título y contenido requeridos" : "Title and content required"); return; }

    try {
      if (noteToEdit) {
        await axios.put(`${BASE_URL}/notes/${noteToEdit.id}`, { title, content, category, favorite, completed }, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await axios.post(`${BASE_URL}/notes`, { title, content, category, favorite, completed }, { headers: { Authorization: `Bearer ${token}` } });
      }
      handleClear();
      fetchNotes();
    } catch (err) {
      setError(err.response?.data?.error || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 rounded shadow flex flex-col gap-2">
      {error && <div className="text-red-500">{error}</div>}
      <input id="titleInput" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder={t.title} className="p-2 rounded border dark:bg-gray-700 dark:text-white font-semibold cursor-text" />
      <textarea value={content} onChange={(e)=>setContent(e.target.value)} placeholder={t.content} className="p-2 rounded border dark:bg-gray-700 dark:text-white font-semibold cursor-text" />
      <input value={category} onChange={(e)=>setCategory(e.target.value)} placeholder={t.category} className="p-2 rounded border dark:bg-gray-700 dark:text-white font-semibold cursor-text" />
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-1"><input type="checkbox" checked={favorite} onChange={()=>setFavorite(!favorite)} /> {t.favorite}</label>
        <label className="flex items-center gap-1"><input type="checkbox" checked={completed} onChange={()=>setCompleted(!completed)} /> {t.completed}</label>
        <button type="button" onClick={()=>setShowEmoji(!showEmoji)} className="text-yellow-400 cursor-pointer"><FaRegSmile /></button>
      </div>
      {showEmoji && <Picker onEmojiClick={onEmojiClick} />}
      <div className="flex gap-2">
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold p-2 rounded cursor-pointer">{noteToEdit ? t.update : t.add}</button>
        <button type="button" onClick={handleClear} className="bg-purple-600 hover:bg-purple-800 text-white font-semibold p-2 rounded cursor-pointer">{t.clear}</button>
      </div>
    </form>
  );
}

export default AddNote;
