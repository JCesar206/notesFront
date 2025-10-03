import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaHome } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

function Footer() {
  return (
    <footer className="bg-gray-200 dark:bg-gray-900 text-center p-4 flex justify-center gap-6 items-center">
      <a href="https://jcesar206.github.io/myPersonalBlog/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-violet-500">
        <FaHome size={24} title="Home Page" />
      </a>
      <a href="https://github.com/jcesar206" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-lime-500">
        <FaGithub size={24} title="Github"/></a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-orange-500">
        <FaLinkedin size={24} title="Linkedin"/></a>
      <a href="mailto:jcesar206@hotmail.com" className="flex items-center gap-1 hover:text-pink-500">
        <FaEnvelope size={24} title="Hotmail"/>
      </a>
      <a href="mailto:jcesary06@gmail.com" className="flex items-center gap-1 hover:text-yellow-500">
        <SiGmail size={24} title="Gmail"/>
      </a>
      <span className="ml-4 text-sm font-semibold text-shadow-gray-800">&copy; | {new Date().getFullYear()} | Juls 😎 | Nota Loka V 1.0</span>
    </footer>
  );
}

export default Footer;
