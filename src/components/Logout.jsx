import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

function Logout() {
  const { setToken, setUser } = useContext(AuthContext);
  const { t } = useLanguage();

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
      {t("logout")}
    </button>
  );
}

export default Logout;