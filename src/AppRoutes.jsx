import { Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import { useState, useEffect } from "react";

function AppRoutes() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuth ? "/app" : "/login"} />} />
      <Route path="/login" element={isAuth ? <Navigate to="/app" /> : <Login setIsAuth={setIsAuth} />} />
      <Route path="/register" element={isAuth ? <Navigate to="/app" /> : <Register />} />
      <Route path="/forgot-password" element={isAuth ? <Navigate to="/app" /> : <ForgotPassword />} />
      <Route path="/app" element={isAuth ? <App setIsAuth={setIsAuth} /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
