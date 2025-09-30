import React, { useState, useContext } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LangContext, ThemeContext } from "../App";

const baseURL = "https://notesback-7rae.onrender.com"; // tu backend en Render

function Login({ setIsAuth }) {
  const { lang } = useContext(LangContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const t = {
    es: {
      login: "Iniciar sesión",
      email: "Email",
      password: "Contraseña",
      submit: "Entrar",
      noAccount: "¿No tienes cuenta?",
      register: "Regístrate",
      fillFields: "Por favor completa todos los campos",
      errorLogin: "Error al iniciar sesión",
      forgotPassword: "Olvidé mi contraseña",
    },
    en: {
      login: "Login",
      email: "Email",
      password: "Password",
      submit: "Login",
      noAccount: "Don't have an account?",
      register: "Sign Up",
      fillFields: "Please fill in all fields",
      errorLogin: "Error logging in",
      forgotPassword: "Forgot password",
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
      const res = await axios.post(`${baseURL}/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      setIsAuth(true);
      navigate("/app");
    } catch (err) {
      setError(err.response?.data?.error || t.errorLogin);
    }
  };

  return (
    <div className={`flex justify-center items-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <form
        onSubmit={handleSubmit}
        className={`p-6 rounded shadow-md flex flex-col gap-4 w-80 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
      >
        <h2 className="text-xl font-bold text-center">{t.login}</h2>

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

        <div className="flex justify-between text-sm">
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            {t.noAccount} {t.register}
          </span>
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            {t.forgotPassword}
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;