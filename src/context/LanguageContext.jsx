import { createContext, useContext, useState } from "react";
import { translations } from "../i18n/translations";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("es");

  const toggleLanguageuage = () => {
    setLanguage((prev) => (prev === "es" ? "en" : "es"));
  };

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguageuage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);