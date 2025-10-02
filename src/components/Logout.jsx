{/* Componente de Logout */}
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Logout() {
  const { setToken, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.clear();
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded font-semibold cursor-pointer"
    >
      Cerrar sesión
    </button>
  );
}

export default Logout;