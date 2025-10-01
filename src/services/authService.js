// src/services/authService.js
import api from "../api";

// Registro
export const registerUser = async (email, password) => {
  const res = await api.post("/auth/register", { email, password });
  return res.data;
};

// Login
export const loginUser = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res.data;
};