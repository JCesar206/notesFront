import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://notesback-7rae.onrender.com/api";

function Login({ setIsAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [lang, setLang] = useState("es"); // default language
  const navigate = useNavigate();

  const t = {
    es: { email: "Correo", password: "Contraseña", login: "Iniciar sesión", forgot: "Olvidé mi contraseña", toggleLang: "English" },
    en: { email: "Email", password: "Password", login: "Login", forgot: "Forgot password", toggleLang: "Español" }
  }[lang];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      setIsAuth(true);
      navigate("/app");
    } catch (err) {
      setError(err.response?.data?.error || "Error logging in");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-sm flex flex-col gap-4">
        <button type="button" onClick={() => setLang(lang === "es" ? "en" : "es")} className="self-end text-blue-500">{t.toggleLang}</button>
        <h2 className="text-xl font-bold">{t.login}</h2>
        {error && <div className="text-red-500">{error}</div>}
        <input type="email" placeholder={t.email} value={email} onChange={e => setEmail(e.target.value)} className="p-2 rounded border dark:bg-gray-700 dark:text-white" required />
        <div className="relative">
          <input type={showPassword ? "text" : "password"} placeholder={t.password} value={password} onChange={e => setPassword(e.target.value)} className="p-2 rounded border w-full dark:bg-gray-700 dark:text-white" required />
          <span onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2 cursor-pointer text-gray-500">{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">{t.login}</button>
        <button type="button" onClick={() => navigate("/forgot-password")} className="text-sm text-blue-500 hover:underline">{t.forgot}</button>
      </form>
    </div>
  );
}

export default Login;