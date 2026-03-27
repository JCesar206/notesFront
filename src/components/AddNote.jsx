import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RxUpdate } from "react-icons/rx";
import { MdOutlineCleaningServices } from "react-icons/md";
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
          `${BASE_URL}/notes/${noteToEdit.id}`, // ✅ FIX
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
    <form className="p-4 bg-white dark:bg-gray-800 rounded shadow flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        className="border p-2 rounded dark:bg-gray-700 dark:text-white"
        placeholder={t("titleNote")}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="border p-2 rounded dark:bg-gray-700 dark:text-white"
        placeholder={t("content")}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="4"
        required
      />

      <input
        className="border p-2 rounded dark:bg-gray-700 dark:text-white"
        placeholder={t("category")}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <div className="flex gap-4 items-center">
        <label className="flex items-center gap-1 dark:text-white font-semibold">
          <input type="checkbox" checked={favorite} onChange={() => setFavorite(!favorite)} />
          {t("favorite")} ⭐
        </label>

        <label className="flex items-center gap-1 dark:text-white font-semibold">
          <input type="checkbox" checked={completed} onChange={() => setCompleted(!completed)} />
          {t("completed")} ✅
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        {["😀","🔥","✅","😎","⭐","😱","👍","🐶","🐱","❤️","💯","🥺","🤯","😡","🙏","🤗","😍","🍺"].map(emoji => (
          <button
            key={emoji}
            type="button"
            onClick={() => insertEmoji(emoji)}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-300 cursor-pointer"
          >
            {emoji}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold cursor-pointer dark:bg-white dark:hover:bg-blue-300 dark:text-blue-700"
        >
          {noteToEdit 
          ? <><RxUpdate size={18}/>{t("update")}</>
          : <><IoIosAddCircleOutline size={18}/>{t("add")}</>}
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="inline-flex items-center justify-center gap-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 font-semibold cursor-pointer dark:bg-white dark:hover:bg-gray-300 dark:text-gray-700"
        >
          <MdOutlineCleaningServices size={18}/>{t("clear")}
        </button>
      </div>
    </form>
  );
}

export default AddNote;