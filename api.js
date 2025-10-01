// src/api.js
import axios from "axios";

export const BASE_URL = "https://notesback-7rae.onrender.com/api";

// helper para token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// cliente de axios
const api = axios.create({
  baseURL: BASE_URL,
});

// intercepta cada request y añade token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;