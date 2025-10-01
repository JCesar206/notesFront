import React, { useContext } from "react";
import { LangContext } from "../App";

function AboutModal({ close }) {
  const { lang } = useContext(LangContext);

  const t = {
    es: { title: "Acerca de", content: "Esta es una aplicación de notas de ejemplo.", close: "Cerrar" },
    en: { title: "About", content: "This is a sample notes application.", close: "Close" }
  }[lang];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{t.title}</h2>
        <p className="mb-4">{t.content}</p>
        <button onClick={close} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">{t.close}</button>
      </div>
    </div>
  );
}

export default AboutModal;