import React, { useContext } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaHome } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

function Footer() {
  const { lang } = useContext(LangContext);
  const t = {
    es: { home: "Página Principal", copyright: "Todos los derechos reservados." , github: "GitHub", linkedin: "LinkedIn", mail: "Hotmail" },
    en: { home: "Home Page", copyright: "All right reserved.", github: "GitHub", linkedin: "LinkedIn", mail: "Email" }
  }[lang];

  return (
    <footer className="bg-gray-200 dark:bg-gray-900 text-center p-4 flex justify-center gap-6 items-center flex-wrap">
      <a href="https://github.com/JCesar206" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
        <FaHome size={24} title="Home Page" className="hover:text-orange-500"/>
      </a>
      <a href="https://github.com/JCesar206" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
        <FaGithub size={24} title="Github" className="hover:text-sky-500"/>
      </a>
      <a href="https://www.linkedin.com/in/jcesar206" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
        <FaLinkedin size={24} title="Linkedin" className="hover:text-violet-500"/>
      </a>
      <a href="mailto:jcesar206@hotmail.com" className="flex items-center gap-1">
        <FaEnvelope size={24} title="Hotmail" className="hover:text-lime-500"/>
      </a>
      <a href="mailto:jcesary06@gmail.com" className="flex items-center gap-1">
        <FaGmail size={24} title="Hotmail" className="hover:text-yellow-500"/>
      </a>
      <span className="w-full text-sm mt-2">&copy; {new Date().getFullYear()} Nota Loka. | Juls |All right reserved.</span>
    </footer>
  );
}

export default Footer;
