// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://notesback-7rae.onrender.com/api", // baseURL del backend + prefijo /api
});

export default api;