import React, { useState } from "react";
import api from "../api";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    const token = localStorage.getItem("token");
    if (!token) { setError("Usuario no autenticado"); return; }

    try {
      await api.put("/auth/change-password", { oldPassword, newPassword }, { headers: { Authorization: `Bearer ${token}` } });
      setSuccess("Contraseña actualizada");
      setOldPassword(""); setNewPassword("");
    } catch (err) {
      setError(err.response?.data?.error || "Error al actualizar contraseña");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4 bg-white dark:bg-gray-800 rounded shadow">
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">{success}</div>}
      <div className="relative">
        <input type={showOld ? "text" : "password"} placeholder="Old Password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} className="p-2 rounded border dark:bg-gray-700 dark:text-white w-full" />
        <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setShowOld(!showOld)}>
          {showOld ? "🙈" : "👁️"}
        </button>
      </div>
      <div className="relative">
        <input type={showNew ? "text" : "password"} placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="p-2 rounded border dark:bg-gray-700 dark:text-white w-full" />
        <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setShowNew(!showNew)}>
          {showNew ? "🙈" : "👁️"}
        </button>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded cursor-pointer">Change Password</button>
    </form>
  );
}

export default ChangePassword;