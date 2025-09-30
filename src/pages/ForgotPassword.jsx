import React, { useState, useContext } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LangContext, ThemeContext } from "../App";

const baseURL = "https://notesback-7rae.onrender.com"; // backend en Render

function ForgotPassword() {
  const { lang } = useContext(LangContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const t = {
    es: {
      title: "Restablecer contraseña",
      email: "Email",
      newPassword: "Nueva contraseña",
      submit: "Enviar",
      success: "Se ha enviado un enlace para restablecer la contraseña",
      error: "Error al restablecer la contraseña",
    },
    en: {
      title: "Reset Password",
      email: "Email",
      newPassword: "New Password",
      submit: "Send",
      success: "Password reset link has been sent",
      error: "Error resetting password",
    },
  }[lang];

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Ingresa tu email");
      return;
    }

    try {
      // En este ejemplo se envía email y nueva contraseña opcional
      await axios.post(`${baseURL}/auth/forgot-password`, { email, newPassword });
      setMessage(t.success);
    } catch (err) {
      setError(err.response?.data?.error || t.error);
    }
  };

  return (
    <div className={`flex justify-center items-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <form
        onSubmit={handleSubmit}
        className={`p-6 rounded shadow-md flex flex-col gap-4 w-80 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
      >
        <h2 className="text-xl font-bold text-center">{t.title}</h2>

        {message && <div className="text-green-500 text-sm">{message}</div>}
        {error && <div className="text-red-500 text-sm">{error}</div>}

        <input
          type="email"
          placeholder={t.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`p-2 rounded border ${darkMode ? 'dark:bg-gray-700 dark:text-white' : ''}`}
        />

        {/* Nueva contraseña opcional */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder={t.newPassword}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`p-2 rounded border w-full ${darkMode ? 'dark:bg-gray-700 dark:text-white' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-gray-600 dark:text-gray-300 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded cursor-pointer"
        >
          {t.submit}
        </button>

        <div className="text-sm text-center">
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Volver al login
          </span>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;