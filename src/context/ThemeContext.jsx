import { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
    document.documentElement.classList.toggle("dark");
    }
  }, [dark]);

  const toggleTheme = () => setDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ theme: dark ? "dark" : "light", toggleTheme }}>
        {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);