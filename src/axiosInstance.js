import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://notesback-7rae.onrender.com/api"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token && token !== "undefined") req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;