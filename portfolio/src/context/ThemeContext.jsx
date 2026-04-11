import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleDarkMode = (value) => {
        if (value === "dark" || value === "light") {
            setTheme(value);
        } else {
            setTheme((prev) => (prev === "dark" ? "light" : "dark"));
        }
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode: theme === "dark", toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
