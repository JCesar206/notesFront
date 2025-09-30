import React, { useState, useContext } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LangContext, ThemeContext } from "../App";

const baseURL = "https://notesback-7rae.onrender.com"; // tu backend en Render

function Register({ setIsAuth }) {
  const { lang } = useContext(LangContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const t = {
    es: {
      register: "Registro",
      email: "Email",
      password: "Contraseña",
      submit: "Registrarse",
      haveAccount: "¿Ya tienes cuenta?",
      login: "Inicia sesión",
      fillFields: "Por favor completa todos los campos",
      errorRegister: "Error al registrar usuario",
    },
    en: {
      register: "Register",
      email: "Email",
      password: "Password",
      submit: "Sign Up",
      haveAccount: "Already have an account?",
      login: "Login",
      fillFields: "Please fill in all fields",
      errorRegister: "Error registering user",
    },
  }[lang];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(t.fillFields);
      return;
    }

    try {
      await axios.post(`${baseURL}/auth/register`, { email, password });

      // Login automático después del registro
      const res = await axios.post(`${baseURL}/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      setIsAuth(true);
      navigate("/app");
    } catch (err) {
      setError(err.response?.data?.error || t.errorRegister);
    }
  };

  return (
    <div className={`flex justify-center items-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <form
        onSubmit={handleSubmit}
        className={`p-6 rounded shadow-md flex flex-col gap-4 w-80 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
      >
        <h2 className="text-xl font-bold text-center">{t.register}</h2>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <input
          type="email"
          placeholder={t.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`p-2 rounded border ${darkMode ? 'dark:bg-gray-700 dark:text-white' : ''}`}
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder={t.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`p-2 rounded border w-full ${darkMode ? 'dark:bg-gray-700 dark:text-white' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-gray-600 dark:text-gray-300 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded cursor-pointer"
        >
          {t.submit}
        </button>

        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} text-center`}>
          {t.haveAccount}{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            {t.login}
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;