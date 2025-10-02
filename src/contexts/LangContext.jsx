import { createContext, useState } from "react";

export const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState("es");

  const toggleLang = () => setLang(lang === "es" ? "en" : "es");

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
};
