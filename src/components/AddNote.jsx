import { useState, useEffect, useContext } from "react";
import { useLanguage } from "../context/LanguageContext";
import axios from "axios";

const BASE_URL = "https://notesback-7rae.onrender.com/api";

function AddNote({ fetchNotes, noteToEdit, setNoteToEdit }) {
  const { t } = useLanguage();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [completed, setCompleted] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setCategory(noteToEdit.category || "");
      setFavorite(noteToEdit.favorite || false);
      setCompleted(noteToEdit.completed || false);
    }
  }, [noteToEdit]);

  const handleClear = () => {
    setTitle("");
    setContent("");
    setCategory("");
    setFavorite(false);
    setCompleted(false);
    setNoteToEdit(null);
  };

  const insertEmoji = (emoji) => setContent(prev => prev + emoji);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;
    try {
      if (noteToEdit) {
        await axios.put(
          `${BASE_URL}/notes/${noteToEdit._id}`,
          { title, content, category, favorite, completed },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `${BASE_URL}/notes`,
          { title, content, category, favorite, completed },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      fetchNotes();
      handleClear();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-800 rounded shadow flex flex-col gap-3">
      <input className="border p-2 rounded dark:bg-gray-700 dark:text-white" placeholder={t.titleNote}
        value={title} onChange={(e) => setTitle(e.target.value)} required/>
      <textarea className="border p-2 rounded dark:bg-gray-700 dark:text-white" placeholder={t.content}
        value={content} onChange={(e) => setContent(e.target.value)} rows="4" required/>
      <input className="border p-2 rounded dark:bg-gray-700 dark:text-white"
        placeholder={t.category} value={category} onChange={(e) => setCategory(e.target.value)}/>

      <div className="flex gap-4 items-center">
        <label className="flex items-center gap-1">
          <input type="checkbox" checked={favorite} onChange={() => setFavorite(!favorite)} />
          {t.favorite} ⭐
        </label>
        <label className="flex items-center gap-1">
          <input type="checkbox" checked={completed} onChange={() => setCompleted(!completed)} />
          {t.completed} ✅
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        {["😀","🔥","✅","😎","⭐","😱","👍","🐶","🐱","❤️","💯","🥺","🤯","😡","🙏","🤗","😍","🍺"].map(emoji => (
          <button key={emoji} type="button" onClick={() => insertEmoji(emoji)}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer"
          >
            {emoji}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button type="submit"
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700 font-semibold cursor-pointer">
          {noteToEdit ? t.update : t.add}
        </button>
        <button type="button" onClick={handleClear}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 font-semibold cursor-pointer">
          {t.clear}
        </button>
      </div>
    </form>
  );
}

export default AddNote;

