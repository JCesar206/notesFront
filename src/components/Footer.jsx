import React, { useContext } from "react";
import { LangContext } from "../App";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  const { lang } = useContext(LangContext);

  const t = {
    es: { copyright: "© 2025 Mi App", github: "GitHub", linkedin: "LinkedIn", email: "Correo" },
    en: { copyright: "© 2025 My App", github: "GitHub", linkedin: "LinkedIn", email: "Email" }
  }[lang];

  return (
    <footer className="fixed bottom-0 w-full p-4 bg-gray-200 dark:bg-gray-900 text-center flex justify-center gap-4 items-center">
      <a href="https://github.com/" target="_blank" rel="noreferrer" className="flex items-center gap-1">
        <FaGithub /> {t.github}
      </a>
      <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="flex items-center gap-1">
        <FaLinkedin /> {t.linkedin}
      </a>
      <a href="mailto:correo@ejemplo.com" className="flex items-center gap-1">
        <FaEnvelope /> {t.email}
      </a>
      <span>{t.copyright}</span>
    </footer>
  );
}

export default Footer;