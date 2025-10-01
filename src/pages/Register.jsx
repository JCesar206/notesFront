import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const BASE_URL = "https://notesback-7rae.onrender.com/api";

function Register({ setIsAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, { email, password });
      localStorage.setItem("token", res.data.token);
      setIsAuth(true);
    } catch (err) {
      setError(err.response?.data?.error || "Error en registro");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white dark:bg-gray-800 rounded shadow flex flex-col gap-2">
      {error && <div className="text-red-500">{error}</div>}
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="p-2 rounded border dark:bg-gray-700 dark:text-white" required />
      <div className="relative">
        <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="p-2 rounded border dark:bg-gray-700 dark:text-white w-full" required />
        <button type="button" className="absolute right-2 top-2 text-gray-600 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded cursor-pointer">Register</button>
    </form>
  );
}

export default Register;