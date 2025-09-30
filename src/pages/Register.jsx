import React, { useState, useContext } from "react";
import axios from "axios";
import { LangContext, ThemeContext } from "../App";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const BASE_URL = "https://notesback-7rae.onrender.com/api";

function Register({ setIsAuth }) {
  const { lang } = useContext(LangContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const translations = {
    es: {
      title: "Registrarse",
      email: "Correo electrónico",
      password: "Contraseña",
      register: "Crear cuenta",
      login: "¿Ya tienes cuenta? Inicia sesión",
    },
    en: {
      title: "Register",
      email: "Email",
      password: "Password",
      register: "Sign Up",
      login: "Already have an account? Login",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/auth/register`, { email, password });
      alert("✅ Usuario registrado correctamente");
      navigate("/login");
    } catch (err) {
      alert("❌ Error en el registro");
      console.error(err);
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <form
        onSubmit={handleSubmit}
        className={`p-6 rounded shadow-md w-full max-w-sm ${darkMode ? "bg-gray-800" : "bg-white"}`}
      >
        <h2 className="text-xl font-bold mb-4">{translations[lang].title}</h2>

        <input
          type="email"
          placeholder={translations[lang].email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        <div className="relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            placeholder={translations[lang].password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded pr-10"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 cursor-pointer"
          >
            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
          </span>
        </div>

        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold w-full py-2 rounded mb-3 cursor-pointer">
          {translations[lang].register}
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-blue-500 hover:underline text-sm font-semibold"
        >
          {translations[lang].login}
        </button>
      </form>
    </div>
  );
}

export default Register;