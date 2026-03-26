import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./AppRoutes";
import { ThemeProvider } from "../context/ThemeContext";
import { LanguageProvider } from "../context/LanguageContext";
import { HashRouter } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </LanguageProvider>
    </ThemeProvider>   
  </React.StrictMode>
);
