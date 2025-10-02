import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./AppRoutes";
import { LangProvider } from "./contexts/LangContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./index.css";
import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LangProvider>
      <ThemeProvider>
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </ThemeProvider>
    </LangProvider>
  </React.StrictMode>
);
