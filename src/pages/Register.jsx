import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LangContext, ThemeContext } from "../App";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const BASE_URL = "https://notesback-7rae.onrender.com/api";

function Register({ setIsAuth }) {
  const { lang } = useContext(LangContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/auth/register`, { email, password });
      const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      setIsAuth(true);
      navigate("/app");
    } catch (err) {
      setError(lang === "es" ? "Error al registrar usuario" : "Registration failed");
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} flex items-center justify-center min-h-screen`}>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 w-96"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          {lang === "es" ? "Crear Cuenta" : "Register"}
        </h2>

        {error && <p className="text-red-500 text-sm font-semibold mb-2">{error}</p>}

        <label className="block mb-2">{lang === "es" ? "Correo electrónico" : "Email"}</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 rounded border mb-4 dark:bg-gray-700"
        />

        <label className="block mb-2">{lang === "es" ? "Contraseña" : "Password"}</label>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 rounded border dark:bg-gray-700"
          />
          <button
            type="button"
            className="absolute right-2 top-2 text-gray-600 dark:text-gray-300 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white rounded p-2 mb-2 cursor-pointer"
        >
          {lang === "es" ? "Registrarse" : "Register"}
        </button>

        <p
          onClick={() => navigate("/login")}
          className="text-blue-500 cursor-pointer text-sm"
        >
          {lang === "es" ? "¿Ya tienes cuenta? Inicia sesión" : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
}

export default Register;