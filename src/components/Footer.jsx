import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaHome } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

function Footer() {
  return (
    <footer className="bg-gray-200 dark:bg-gray-900 text-center p-4 flex justify-center gap-6 items-center flex-wrap">
      <a href="https://jcesar206.github.io/myPersonalBlog/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
        <FaHome size={24} title="Home Page" className="hover:text-green-500"/>
      </a>
      <a href="https://github.com/JCesar206" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
        <FaGithub size={24} title="Github" className="hover:text-sky-500"/>
      </a>
      <a href="https://www.linkedin.com/in/jcesar206" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
        <FaLinkedin size={24} title="Linkedin" className="hover:text-pink-500"/>
      </a>
      <a href="mailto:jcesar206@hotmail.com" className="flex items-center gap-1">
        <FaEnvelope size={24} title="Hotmail" className="hover:text-orange-500"/>
      </a>
      <a href="mailto:jcesary06@gmail.com" className="flex items-center gap-1">
        <SiGmail size={24} title="Gmail" className="hover:text-yellow-500"/>
      </a>
      <span className="w-full text-sm mt-2 font-semibold text-gray-600">&copy; {new Date().getFullYear()} 📝 Nota Loka. | Juls 😎 | All right reserved.</span>
    </footer>
  );
}

export default Footer;
