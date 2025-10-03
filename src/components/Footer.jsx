import React, { useContext } from "react";
import { LangContext } from "../contexts/LangContext"; // asegúrate que la ruta es correcta
import { FaGithub, FaLinkedin, FaEnvelope, FaHome } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

function Footer() {
  const { lang } = useContext(LangContext); // ya no debe ser undefined

  const t = {
    es: { copyright: "Mi App Notas Loka | Todos los derechos reservados." },
    en: { copyright: "My App Crazy Note | All right reserved." }
  }[lang];

  return (
    <footer className="bg-gray-200 dark:bg-gray-900 text-center p-4 flex justify-center gap-6 items-center">
      <a href="https://jcesar206.github.io/myPersonalBlog/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
        <FaHome size={24} className="hover:text-blue-500" title="Home Page"/>
      </a>
      <a href="https://github.com/jcesar206" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
        <FaGithub size={24} className="hover:text-yellow-500" title="Github"/>
      </a>
      <a href="https://www.linkedin.com/in/jcesar206/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
        <FaLinkedin size={24} className="hover:text-orange-500" title="Linkedin"/>
      </a>
      <a href="mailto:jcesar206@hotmail.com" className="flex items-center gap-1">
        <FaEnvelope size={24} className="hover:text-lime-500" title="Hotmail"/>
      </a>
      <a href="mailto:jcesar206@hotmail.com" className="flex items-center gap-1">
        <SiGmail size={24} className="hover:text-purple-500" title="Gmail"/>
      </a>
      <span className="text-sm font-semibold text-shadow-gray-800">&copy; {new Date().getFullYear()} | Juls 😎| {t.copyright}</span>
    </footer>
  );
}

export default Footer;
