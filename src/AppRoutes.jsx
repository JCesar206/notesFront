import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

function AppRoutes() {
  const [isAuth, setIsAuth] = useState(false);

  // Verifica si hay token al cargar la app
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
  }, []);

  return (
    <Routes>
      {/* Redirección inicial según autenticación */}
      <Route path="/" element={<Navigate to={isAuth ? "/app" : "/login"} />} />

      {/* Rutas de autenticación */}
      <Route
        path="/login"
        element={isAuth ? <Navigate to="/app" /> : <Login setIsAuth={setIsAuth} />}
      />
      <Route
        path="/register"
        element={isAuth ? <Navigate to="/app" /> : <Register setIsAuth={setIsAuth} />}
      />
      <Route
        path="/forgot-password"
        element={isAuth ? <Navigate to="/app" /> : <ForgotPassword />}
      />

      {/* Ruta principal de la app */}
      <Route
        path="/app"
        element={
          isAuth ? (
            <App setIsAuth={setIsAuth} /> // Propagamos setIsAuth para logout
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Cualquier otra ruta redirige al inicio */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;