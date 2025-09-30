import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { LangContext, ThemeContext } from "../App";

const BASE_URL = "https://notesback-7rae.onrender.com/api";

function AddNote({ fetchNotes, noteToEdit, setNoteToEdit }) {
  const { lang } = useContext(LangContext);
  const { darkMode } = useContext(ThemeContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const translations = {
    es: {
      add: "Agregar Nota",
      update: "Actualizar Nota",
      title: "Título",
      content: "Contenido",
    },
    en: {
      add: "Add Note",
      update: "Update Note",
      title: "Title",
      content: "Content",
    },
  };

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
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
          { title, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNoteToEdit(null);
      } else {
        await axios.post(
          `${BASE_URL}/notes`,
          { title, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setTitle("");
      setContent("");
      fetchNotes();
    } catch (err) {
      console.error("Error saving note:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-4 rounded shadow-md ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <input
        type="text"
        placeholder={translations[lang].title}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-2 p-2 border rounded cursor-text"
        required
      />
      <textarea
        placeholder={translations[lang].content}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full mb-2 p-2 border rounded cursor-text"
        rows="3"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded cursor-pointer"
      >
        {noteToEdit ? translations[lang].update : translations[lang].add}
      </button>
    </form>
  );
}

export default AddNote;