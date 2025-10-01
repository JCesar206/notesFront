import React, { useState, useContext } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LangContext } from "../App";

const BASE_URL = "https://notesback-7rae.onrender.com/api";

function Login({ setIsAuth }) {
  const { lang } = useContext(LangContext); // Para bilingüe
  const t = {
    es: { email: "Correo electrónico", password: "Contraseña", login: "Iniciar sesión", error: "Error en login" },
    en: { email: "Email", password: "Password", login: "Login", error: "Login error" },
  }[lang];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) return setError(t.error);

    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      setIsAuth(true);
    } catch (err) {
      setError(err.response?.data?.error || t.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white dark:bg-gray-800 rounded shadow flex flex-col gap-2">
      {error && <div className="text-red-500">{error}</div>}
      <input
        type="email"
        placeholder={t.email}
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="p-2 rounded border dark:bg-gray-700 dark:text-white"
        required
      />
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={t.password}
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="p-2 rounded border dark:bg-gray-700 dark:text-white w-full"
          required
        />
        <button
          type="button"
          className="absolute right-2 top-2 text-gray-600"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">{t.login}</button>
    </form>
  );
}

export default Login;