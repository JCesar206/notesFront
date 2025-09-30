import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://notesback-7rae.onrender.com/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [lang, setLang] = useState("es");
  const navigate = useNavigate();

  const t = {
    es: { email: "Correo", newPassword: "Nueva Contraseña", submit: "Actualizar contraseña", toggleLang: "English", login: "Regresar al login" },
    en: { email: "Email", newPassword: "New Password", submit: "Update password", toggleLang: "Español", login: "Back to login" }
  }[lang];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");
    try {
      await axios.put(`${BASE_URL}/auth/change-password`, { email, newPassword });
      setMessage(lang === "es" ? "Contraseña actualizada exitosamente" : "Password updated successfully");
    } catch (err) {
      setError(err.response?.data?.error || "Error updating password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-sm flex flex-col gap-4">
        <button type="button" onClick={() => setLang(lang === "es" ? "en" : "es")} className="self-end text-blue-500">{t.toggleLang}</button>
        <h2 className="text-xl font-bold">{t.submit}</h2>
        {message && <div className="text-green-500">{message}</div>}
        {error && <div className="text-red-500">{error}</div>}
        <input type="email" placeholder={t.email} value={email} onChange={e => setEmail(e.target.value)} className="p-2 rounded border dark:bg-gray-700 dark:text-white" required />
        <div className="relative">
          <input type={showPassword ? "text" : "password"} placeholder={t.newPassword} value={newPassword} onChange={e => setNewPassword(e.target.value)} className="p-2 rounded border w-full dark:bg-gray-700 dark:text-white" required />
          <span onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2 cursor-pointer text-gray-500">{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">{t.submit}</button>
        <button type="button" onClick={() => navigate("/login")} className="text-sm text-blue-500 hover:underline">{t.login}</button>
      </form>
    </div>
  );
}

export default ForgotPassword;