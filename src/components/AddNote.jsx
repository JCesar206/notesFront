import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { LangContext } from "../contexts/LangContext";

const BASE_URL = "https://notesback-7rae.onrender.com/api";

function AddNote({ fetchNotes, noteToEdit, setNoteToEdit }) {
  const { lang } = useContext(LangContext) || { lang: "es" };

  const t = {
    es: { add: "Agregar", update: "Actualizar", cancel: "Cancelar", placeholder: "Escribe una nota..." },
    en: { add: "Add", update: "Update", cancel: "Cancel", placeholder: "Write a note..." }
  }[lang || "es"];

  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");

  // Si hay nota a editar, cargamos los datos
  React.useEffect(() => {
    if (noteToEdit) {
      setContent(noteToEdit.content);
    }
  }, [noteToEdit]);

  // Guardar o actualizar nota
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (noteToEdit) {
        await axios.put(
          `${BASE_URL}/notes/${noteToEdit._id}`,
          { content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNoteToEdit(null);
      } else {
        await axios.post(
          `${BASE_URL}/notes`,
          { content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setContent("");
      fetchNotes();
      handleClear();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder={t.placeholder}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
        required
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 font-semibold text-white rounded hover:bg-blue-800 cursor-pointer">
        {noteToEdit ? t.update : t.add}
      </button>
      {noteToEdit && (
        <button
          type="button"
          onClick={() => {
            setNoteToEdit(null);
            setContent("");
          }}
          className="px-4 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-700 cursor-pointer"
        >
          {t.cancel}
        </button>
      )}
    </form>
  );
}

export default AddNote;