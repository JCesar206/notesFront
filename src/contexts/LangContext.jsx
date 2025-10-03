import { createContext, useState } from "react";

export const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState("es");

  const toggleLang = () => setLang(prev => (prev === "es" ? "en" : "es"));

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}
