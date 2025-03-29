import { FaCog } from "react-icons/fa";
import { BsMoon, BsSun } from "react-icons/bs";
import { themes } from "../../Data";
import ThemeItem from "./ThemeItem";
import "./themes.css";
import { useEffect, useState } from "react";

// Retrieve stored settings
const getStorageColor = () => localStorage.getItem("color") || "4";
const getStorageTheme = () => localStorage.getItem("theme") || "light-theme";

const Themes = () => {
    const [showSwitcher, setShowSwitcher] = useState(false);
    const [color, setColor] = useState(getStorageColor());
    const [theme, setTheme] = useState(getStorageTheme());

    const changeColor = (newColor) => {
        setColor(newColor);
    };

    const toggleTheme = () => {
        const newTheme = theme === "light-theme" ? "dark-theme" : "light-theme";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        document.documentElement.style.setProperty("--hue", color);
        localStorage.setItem("color", color);
    }, [color]);

    useEffect(() => {
        document.documentElement.className = theme;
    }, [theme]);

    return (
        <div className={`${showSwitcher ? "show-switcher" : ""} style-switcher`}>
            <div className="switcher-toggler" onClick={() => setShowSwitcher(!showSwitcher)}>
                <FaCog />
            </div>

            <div className="theme-toggler" onClick={toggleTheme}>
                {theme === "light-theme" ? <BsMoon /> : <BsSun />}
            </div>

            <h3 className="switcher-title">Style Switcher</h3>
            <div className="switcher-items grid">
                {themes.map((theme, index) => (
                    <ThemeItem key={index} {...theme} changeColor={changeColor} />
                ))}
            </div>

            <div className="switcher-close" onClick={() => setShowSwitcher(false)}>
                &times;
            </div>
        </div>
    );
};

export default Themes;
