import React, { useContext } from "react";
import { LangContext } from "../contexts/LangContext";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss, SiExpress, SiPostgresql } from "react-icons/si";

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
        <p className="mb-4 font-semibold">{t.text}</p>
        <div className="mb-4">
          <h3 className="font-semibold">{t.tech}:</h3>
          <div className="flex gap-2 justify-center mt-2">
            <FaReact size={24} title="React" className="text-sky-400 font-semibold hover:text-sky-700" />
            <SiTailwindcss size={24} title="Tailwind CSS" className="text-blue-500 font-semibold hover:text-blue-700" />
            <FaNodeJs size={24} title="Node.js" className="text-green-600 font-semibold hover:text-green-800" />
            <SiExpress size={24} title="Express" className="text-gray-600 font-semibold hover:text-gray-800" />
            <SiPostgresql size={24} title="Postgre SQL" className="text-indigo-600 font-semibold hover:text-indigo-800" />
          </div>
        </div>
        <button onClick={close} className="bg-blue-500 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded cursor-pointer">{t.close}</button>
      </div>
    </div>
  );
}

export default AboutModal;
