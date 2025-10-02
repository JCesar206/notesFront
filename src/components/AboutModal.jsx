import React, { useContext } from "react";
import { LangContext } from "../contexts/LangContext";

function AboutModal({ close }) {
  const { lang } = useContext(LangContext);

  const t = {
    es: { title: "Acerca de", text: "Desarrollador: Julio César Yañez M. Esta app usa React, Tailwind, Node, PostgreSQL.", close: "Cerrar", tech: "Tecnologías usadas" },
    en: { title: "About", text: "Developer: Julio César Yañez M. This app uses React, Tailwind, Node, PostgreSQL.", close: "Close", tech: "Technologies used" }
  }[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 rounded">
      <div className="bg-white dark:bg-gray-800 rounded border-0 border-b-purple-400 shadow max-w-md w-full p-6 text-center">
        <img src="./myPhoto.jpg" alt="Foto Profesional" className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">{t.title}</h2>
        <p className="mb-4">{t.text}</p>
        <div className="mb-4">
          <h3 className="font-semibold">{t.tech}:</h3>
          <div className="flex gap-2 justify-center mt-2">
            <span className="px-2 py-1 border rounded">React</span>
            <span className="px-2 py-1 border rounded">Tailwind</span>
            <span className="px-2 py-1 border rounded">Node</span>
            <span className="px-2 py-1 border rounded">Postgres</span>
          </div>
        </div>
        <button onClick={close} className="bg-blue-500 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded cursor-pointer">{t.close}</button>
      </div>
    </div>
  );
}

export default AboutModal;
