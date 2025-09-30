import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

function AppRoutes() {
  const [isAuth, setIsAuth] = useState(false);
  const [lang, setLang] = useState("es");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to={isAuth ? "/app" : "/login"} />} />

        <Route path="/login" element={isAuth ? <Navigate to="/app" /> : <Login setIsAuth={setIsAuth} lang={lang} />} />
        <Route path="/register" element={isAuth ? <Navigate to="/app" /> : <Register setIsAuth={setIsAuth} lang={lang} />} />
        <Route path="/forgot-password" element={isAuth ? <Navigate to="/app" /> : <ForgotPassword lang={lang} />} />

        <Route path="/app" element={isAuth ? <App setIsAuth={setIsAuth} /> : <Navigate to="/login" />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
}

export default AppRoutes;