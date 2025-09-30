import React, { useState } from "react";

function ForgotPassword({ lang }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const t = {
    es: { email: "Correo", send: "Enviar enlace", message: "Si existe, recibirás un correo para recuperar tu cuenta." },
    en: { email: "Email", send: "Send link", message: "If it exists, you’ll receive an email to recover your account." },
  }[lang];

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(t.message);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow w-80 flex flex-col gap-3">
        <h2 className="text-xl font-bold text-center">Forgot Password</h2>
        {message && <div className="text-green-500">{message}</div>}
        <input type="email" placeholder={t.email} value={email} onChange={e => setEmail(e.target.value)} className="p-2 rounded border dark:bg-gray-700 dark:text-white" required />
        <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded cursor-pointer">{t.send}</button>
      </form>
    </div>
  );
}

export default ForgotPassword;