import React, { useState, useContext } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LangContext } from "../contexts/LangContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://notesback-7rae.onrender.com/api";

function Register() {
  const { lang } = useContext(LangContext);
  const t = { es:{ email:"Correo", password:"Contraseña", register:"Registrarse", success:"Registro exitoso" }, en:{ email:"Email", password:"Password", register:"Register", success:"Registered" } }[lang];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(`${BASE_URL}/auth/register`, { email, password });
      // optional: auto-login
      const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/app");
    } catch (err) {
      setError(err.response?.data?.error || "Error");
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
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold p-2 rounded cursor-pointer">{t.register}</button>
      </form>
    </div>
  );
}

export default Register;
