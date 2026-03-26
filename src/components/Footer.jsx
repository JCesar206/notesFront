import { FaGithub, FaLinkedin, FaEnvelope, FaHome } from "react-icons/fa";
import { GoRocket } from "react-icons/go";
import { SiGmail } from "react-icons/si";
import { useLanguage } from "../context/LanguageContext";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="fixed bottom-2 bg-gray-200 dark:bg-gray-900 text-center p-4 flex justify-center gap-6 items-center flex-wrap">
      <a
        href="https://jcesar206.github.io/myPersonalBlog/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 hover:text-gray-500 dark:text-white"
      >
        <FaHome size={24} title={t("home")} />
      </a>

      <a
        href="https://github.com/JCesar206"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 hover:text-gray-500 dark:text-white"
      >
        <FaGithub size={24} title="Github" />
      </a>

      <a
        href="https://www.linkedin.com/in/jcesar206"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 hover:text-gray-500 dark:text-white"
      >
        <FaLinkedin size={24} title="Linkedin" />
      </a>

      <a
        href="mailto:jcesar206@hotmail.com"
        className="flex items-center gap-1 hover:text-gray-500 dark:text-white"
      >
        <FaEnvelope size={24} title="Hotmail" />
      </a>

      <a
        href="mailto:jcesary06@gmail.com"
        className="flex items-center gap-1 hover:text-gray-500 dark:text-white"
      >
        <SiGmail size={24} title="Gmail" />
      </a>

      <span className="w-full text-sm mt-2 font-semibold text-gray-500">
        &copy; {new Date().getFullYear()} {t("title")} | Juls Developer FullStack{" "}
        <GoRocket size={16} /> | {t("rights")}
      </span>
    </footer>
  );
}

export default Footer;