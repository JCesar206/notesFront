import React, { useState, useContext } from "react";
import { LangContext, ThemeContext } from "../App";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const { lang } = useContext(LangContext);
  const { darkMode } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const translations = {
    es: {
      title: "Recuperar Contraseña",
      email: "Correo electrónico",
      send: "Enviar enlace",
      back: "Volver al login",
    },
    en: {
      title: "Forgot Password",
      email: "Email",
      send: "Send link",
      back: "Back to login",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("📧 " + (lang === "es" ? "Enlace enviado (demo)" : "Link sent (demo)"));
    navigate("/login");
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <form
        onSubmit={handleSubmit}
        className={`p-6 rounded shadow-md w-full max-w-sm ${darkMode ? "bg-gray-800" : "bg-white"}`}
      >
        <h2 className="text-xl font-bold mb-4">{translations[lang].title}</h2>

        <input
          type="email"
          placeholder={translations[lang].email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        <button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white font-semibold w-full py-2 rounded mb-3 cursor-pointer">
          {translations[lang].send}
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-blue-500 hover:underline font-semibold text-sm cursor-pointer"
        >
          {translations[lang].back}
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;