import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const BASE_URL = "https://notesback-7rae.onrender.com/api";

function Login({ setIsAuth, lang }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const t = {
    es: { email: "Correo", password: "Contraseña", login: "Iniciar Sesión", error: "Credenciales inválidas" },
    en: { email: "Email", password: "Password", login: "Login", error: "Invalid credentials" },
  }[lang];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      setIsAuth(true);
    } catch {
      setError(t.error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow w-80 flex flex-col gap-3">
        <h2 className="text-xl font-bold text-center">{t.login}</h2>
        {error && <div className="text-red-500">{error}</div>}
        <input type="email" placeholder={t.email} value={email} onChange={e => setEmail(e.target.value)} className="p-2 rounded border dark:bg-gray-700 dark:text-white" required />
        <div className="relative">
          <input type={showPassword ? "text" : "password"} placeholder={t.password} value={password} onChange={e => setPassword(e.target.value)} className="p-2 rounded border w-full dark:bg-gray-700 dark:text-white" required />
          <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded cursor-pointer">{t.login}</button>
      </form>
    </div>
  );
}

export default Login;