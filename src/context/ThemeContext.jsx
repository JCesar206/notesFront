import { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggleTheme = () => setDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ theme: dark ? "dark" : "light", toggleTheme }}>
        {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);