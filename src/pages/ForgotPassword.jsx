import React, { useState, useContext } from "react";
import { LangContext, ThemeContext } from "../App";

function ForgotPassword() {
  const { lang } = useContext(LangContext);
  const { darkMode } = useContext(ThemeContext);

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí solo simulamos el envío (en el backend real habría un endpoint)
    alert(lang === "es" ? "Si el correo existe recibirás instrucciones." : "If the email exists, you'll receive instructions.");
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} flex items-center justify-center min-h-screen`}>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 w-96"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          {lang === "es" ? "Recuperar Contraseña" : "Forgot Password"}
        </h2>

        <label className="block mb-2">{lang === "es" ? "Correo electrónico" : "Email"}</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 rounded border mb-4 dark:bg-gray-700"
        />

        <button
          type="submit"
          className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded p-2 cursor-pointer"
        >
          {lang === "es" ? "Enviar enlace" : "Send link"}
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;