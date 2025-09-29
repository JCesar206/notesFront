import React from "react"; // Render principal...
import ReactDOM from "react-dom/client";
import AppRoutes from "./AppRoutes";
import "./index.css";
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter> {/* BrowserRouter */}
      <AppRoutes />
    </HashRouter>
  </React.StrictMode>
);