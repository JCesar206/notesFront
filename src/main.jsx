import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./AppRoutes";
import "./index.css";
import { LangContext, ThemeContext } from "./contexts";
// import { HashRouter } from "react-router-dom";

function Root() {
  const [lang, setLang] = useState("es");
  const [darkMode, setDarkMode] = useState(false);

  const toggleLang = () => setLang(lang === "es" ? "en" : "es");
  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
        {/* <HashRouter> */}
          <AppRoutes />
        {/* </HashRouter> */ }
      </ThemeContext.Provider>
    </LangContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);