import React, { useState } from "react";
import api from "../api";

function Login({ setIsAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setIsAuth(true);
    } catch (err) {
      setError(err.response?.data?.error || "Error al iniciar sesión");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4 bg-white dark:bg-gray-800 rounded shadow">
      {error && <div className="text-red-500">{error}</div>}
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="p-2 rounded border dark:bg-gray-700 dark:text-white" />
      <div className="relative">
        <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="p-2 rounded border dark:bg-gray-700 dark:text-white w-full" />
        <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded cursor-pointer">Login</button>
    </form>
  );
}

export default Login;