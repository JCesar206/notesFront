import React, { useState, useContext } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LangContext } from "../contexts/LangContext";

const BASE_URL = "https://notesback-7rae.onrender.com/api";

function ForgotPassword() {
  const { lang } = useContext(LangContext);
  const t = { es:{ email:"Correo", send:"Enviar", success:"Si existe te llegará un correo" }, en:{ email:"Email", send:"Send", success:"If exists you'll receive an email" } }[lang];

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");
    try {
      // Implementation depends on backend; here we call /auth/forgot (if implemented)
      await axios.post(`${BASE_URL}/auth/forgot-password`, { email });
      setMessage(t.success);
    } catch (err) {
      setError(err.response?.data?.error || "Error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded shadow">
      <form onSubmit={submit} className="flex flex-col gap-3">
        {message && <div className="text-green-500 font-semibold">{message}</div>}
        {error && <div className="text-red-500 font-semibold">{error}</div>}
        <input type="email" placeholder={t.email} value={email} onChange={e=>setEmail(e.target.value)} className="p-2 rounded border dark:bg-gray-700 dark:text-white" required />
        <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold p-2 rounded cursor-pointer">{t.send}</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
