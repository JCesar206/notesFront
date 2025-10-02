import React, { useContext } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaHome } from "react-icons/fa";
import { LangContext } from "../contexts/LangContext";
import { SiGmail } from "react-icons/si";

function Footer() {
  const { lang } = useContext(LangContext);
  const t = {
    es: { home: "Página Principal", copyright: "Todos los derechos reservados." , github: "GitHub", linkedin: "LinkedIn", mail: "Hotmail", gmail: "Gmail" },
    en: { home: "Home Page", copyright: "All right reserved.", github: "GitHub", linkedin: "LinkedIn", mail: "Email", gmail: "Gmail" }
  }[lang];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-6 mt-8">
      <div className="container mx-auto text-center flex flex-col md:flex-row items-center justify-center gap-4">
        <a href="https://jcesar206.github.io/myPersonalBlog/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-purple-600">
          <FaHome size={20} title={t.home}/>
        </a>
        <a href="https://github.com/JCesar206" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-purple-600">
          <FaGithub size={20} title={t.github} />
        </a>
        <a href="https://www.linkedin.com/in/jcesar206" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-purple-600">
          <FaLinkedin size={20} title={t.linkedin} />
        </a>
        <a href="mailto:jcesar206@hotmail.com" className="flex items-center gap-2 hover:text-purple-600">
          <FaEnvelope size={20} title={t.mail} />
        </a>
        <a href="mailto:jcesary06@gmail.com" className="flex items-center gap-2 hover:text-purple-600">
          <SiGmail size={20} title={t.gmail} />
        </a>
      </div>
      <div className="text-center mt-3 text-sm font-semibold text-gray-900 dark:text-gray-400">&copy; {new Date().getFullYear()} | Juls 😎 Be Happy |{t.copyright}</div>
    </footer>
  );
}

export default Footer;
