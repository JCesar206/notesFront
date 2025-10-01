import React, { useContext } from "react";
import { LangContext } from "../App";
import { FaGithub, FaLinkedin, FaEnvelope, FaHome } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

function Footer() {
  const { lang } = useContext(LangContext);

  const t = {
    es: { copyright: "Mi App", github: "GitHub", linkedin: "LinkedIn", email: "Correo" },
    en: { copyright: "My App", github: "GitHub", linkedin: "LinkedIn", email: "Email" }
  }[lang];

  return (
    <footer className="fixed bottom-0 w-full p-4 bg-gray-200 dark:bg-gray-900 text-center flex justify-center gap-4 items-center">
      <a href="https://jcesar206.github.io/myPersonalBlog/" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-purple-600">
        <FaHome size={20} />
      </a>
      <a href="https://github.com/JCesar206" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-purple-600">
        <FaGithub size={20}/> {t.github}
      </a>
      <a href="https://www.linkedin.com/in/jcesar206" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-purple-600">
        <FaLinkedin size={20}/> {t.linkedin}
      </a>
      <a href="mailto:jcesar206@hotmail.com" className="flex items-center gap-1 hover:text-purple-600">
        <FaEnvelope size={20}/> {t.email}
      </a>
      <a href="mailto:jcesary06@gmail.com" className="flex items-center gap-1 hover:text-purple-600">
        <SiGmail size={20}/> {t.email}
      </a>
      <span>&copy; {new Date().getFullYear()} | {t.copyright} | Juls </span>
    </footer>
  );
}

export default Footer;