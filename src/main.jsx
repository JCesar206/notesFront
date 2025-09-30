import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./AppRoutes"; // tus rutas
import "./index.css"; // estilos globales
// import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  </React.StrictMode>
);