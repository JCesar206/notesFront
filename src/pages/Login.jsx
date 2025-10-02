import React, { useState, useContext } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LangContext } from "../contexts/LangContext";
import { useNavigate, Link } from "react-router-dom";

const BASE_URL = "https://notesback-7rae.onrender.com/api";

function Login({ setIsAuth }) {
  const { lang } = useContext(LangContext);
  const t = {
    es: { email: "Correo", password: "Contraseña", login: "Iniciar sesión", register: "Registrarse", forgot: "Olvidé password", error: "Error en login" },
    en: { email: "Email", password: "Password", login: "Login", register: "Register", forgot: "Forgot password", error: "Login error" }
  }[lang];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
      const token = res.data.token;
      if (!token) throw new Error("No token");
      localStorage.setItem("token", token);
      setIsAuth(true);
      navigate("/app");
    } catch (err) {
      setError(err.response?.data?.error || t.error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded shadow">
      <form onSubmit={submit} className="flex flex-col gap-3">
        {error && <div className="text-red-500 font-semibold">{error}</div>}
        <input type="email" placeholder={t.email} value={email} onChange={e=>setEmail(e.target.value)} className="p-2 rounded border dark:bg-gray-700 dark:text-white" required />
        <div className="relative">
          <input type={show ? "text" : "password"} placeholder={t.password} value={password} onChange={e=>setPassword(e.target.value)} className="p-2 rounded border dark:bg-gray-700 dark:text-white w-full" required />
          <button type="button" className="absolute right-2 top-2 text-gray-600 cursor-pointer" onClick={()=>setShow(!show)}>{show ? <FaEyeSlash/> : <FaEye/>}</button>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-800 text-white font-semibold p-2 rounded cursor-pointer">{t.login}</button>
        <div className="flex justify-between text-sm">
          <Link to="/register" className="underline font-semibold cursor-pointer">{t.register}</Link>
          <Link to="/forgot-password" className="underline font-semibold cursor-pointer">{t.forgot}</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
