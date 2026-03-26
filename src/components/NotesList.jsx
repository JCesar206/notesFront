/* jsx id="n0xg6o" */
import { useLanguage } from "../context/LanguageContext";
import { FaTrash, FaEdit, FaStar, FaCheck } from "react-icons/fa";
import axios from "axios";

const BASE_URL = "https://notesback-7rae.onrender.com/api";

function NotesList({ notes, fetchNotes, filters, setNoteToEdit }) {
  const { t } = useLanguage();
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
        `${BASE_URL}/notes/${note.id}`, // Fix
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
        `${BASE_URL}/notes/${note.id}`, // ✅ FIX
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
    return <p className="text-center text-gray-500">{t("noNotes")}</p>;
  }

  const getEmoji = (note) => {
    if (note.completed) return "✅";
    if (note.favorite) return "⭐";
    return "📌";
  };

  return (
    <div className="grid gap-3">
      {filteredNotes.map((note) => (
        <div
          key={note.id} // ✅ Fix
          className="p-3 border rounded shadow-sm flex justify-between items-center dark:bg-gray-800"
        >
          {/* Izquierda */}
          <div className="flex items-start gap-3 flex-1">
            <span className="text-2xl">{getEmoji(note)}</span>

            <div>
              <h3
                className={`font-semibold ${
                  note.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {note.title || t("noTitle")}
              </h3>

              <p
                className={`${
                  note.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {note.content}
              </p>

              <p className="text-sm text-gray-500 font-semibold mt-1">
                📂 {note.category || t("noCategory")}
              </p>
            </div>
          </div>

          {/* Derecha */}
          <div className="flex gap-3">
            <button onClick={() => handleToggleFavorite(note)} title={t("favorite")}>
              <FaStar
                className={
                  note.favorite
                    ? "text-yellow-500 cursor-pointer"
                    : "text-gray-400 cursor-pointer"
                }
              />
            </button>

            <button onClick={() => handleToggleCompleted(note)} title={t("completed")}>
              <FaCheck
                className={
                  note.completed
                    ? "text-green-500 font-semibold cursor-pointer"
                    : "text-gray-400 font-semibold cursor-pointer"
                }
              />
            </button>

            <button onClick={() => setNoteToEdit(note)} title={t("edit")}>
              <FaEdit className="text-blue-500 font-semibold cursor-pointer" />
            </button>

            <button onClick={() => handleDelete(note.id)} title={t("delete")}>
              <FaTrash className="text-red-500 font-semibold cursor-pointer" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotesList;