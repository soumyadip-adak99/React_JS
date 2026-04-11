import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Code2, Sun, Moon, X, Menu } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    const navItems = [
        { label: "Home", id: "home" },
        { label: "Skills", id: "skills" },
        { label: "Work", id: "work" },
        { label: "About", id: "about" },
        { label: "Contact", id: "contact" },
    ];

    /* shrink navbar and apply glass effect on scroll */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* active section highlight observer */
    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActiveSection(e.target.id);
                });
            },
            { rootMargin: "-40% 0px -55% 0px" }
        );
        navItems.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) obs.observe(el);
        });
        return () => obs.disconnect();
    }, []);

    /* lock body scroll when mobile menu is open */
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    const goTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            window.scrollTo({
                top: el.getBoundingClientRect().top + window.scrollY - 80,
                behavior: "smooth",
            });
        }
        setIsMenuOpen(false);
    };

    const socialLinks = [
        { icon: FiGithub, href: "https://github.com/soumyadip-adak99", label: "GitHub" },
        { icon: FiLinkedin, href: "https://www.linkedin.com/in/soumyadip-adak-a19b03281/", label: "LinkedIn" },
    ];

    /* ── Mobile Menu Animation Variants (Clean & Premium) ── */
    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.3, ease: "easeInOut" },
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.2, ease: "easeInOut", delay: 0.2 },
        },
    };

    const listVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.08, delayChildren: 0.1 },
        },
        exit: {
            transition: { staggerChildren: 0.05, staggerDirection: -1 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
        },
        exit: {
            y: 10,
            opacity: 0,
            transition: { duration: 0.2 },
        },
    };

    return (
        <>
            {/* ─── Desktop / Main Navbar ──────────────────────────────────── */}
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-300
                    ${
                        scrolled
                            ? isDarkMode
                                ? "bg-black/80 backdrop-blur-xl shadow-lg shadow-black/40"
                                : "bg-white/90 backdrop-blur-xl shadow-sm"
                            : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <button
                        onClick={() => goTo("home")}
                        className="flex items-center gap-2 cursor-pointer select-none group focus:outline-none"
                    >
                        <div
                            className={`p-2 rounded-xl transition-all duration-300 group-hover:scale-105 ${
                                isDarkMode ? "bg-orange-500/10" : "bg-orange-50"
                            }`}
                        >
                            <Code2 size={24} className="text-orange-500" />
                        </div>
                        <span
                            className={`text-lg font-bold tracking-tight transition-colors duration-300 ${
                                isDarkMode ? "text-white group-hover:text-orange-400" : "text-gray-900 group-hover:text-orange-500"
                            }`}
                        >
                            Time to Code
                        </span>
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map(({ label, id }) => {
                            const isActive = activeSection === id;
                            return (
                                <button
                                    key={id}
                                    onClick={() => goTo(id)}
                                    className={`relative text-xs uppercase tracking-widest font-medium transition-all duration-300 cursor-pointer hover:scale-105 focus:outline-none py-2
                                        ${
                                            isActive
                                                ? "text-orange-500"
                                                : isDarkMode
                                                ? "text-gray-400 hover:text-white"
                                                : "text-gray-500 hover:text-gray-900"
                                        }`}
                                >
                                    {label}
                                    {isActive && (
                                        <motion.span
                                            layoutId="desktop-active-indicator"
                                            className="absolute -bottom-1 left-0 right-0 h-[2px] bg-orange-500 rounded-full"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </button>
                            );
                        })}

                        {/* Theme Toggle Desktop */}
                        <button
                            onClick={() => toggleDarkMode(isDarkMode ? "light" : "dark")}
                            className={`p-2.5 rounded-full transition-all duration-300 cursor-pointer hover:scale-110 focus:outline-none
                                ${
                                    isDarkMode
                                        ? "text-gray-400 hover:text-orange-400 hover:bg-orange-500/10"
                                        : "text-gray-500 hover:text-orange-500 hover:bg-orange-50"
                                }`}
                            aria-label="Toggle Theme"
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>

                    {/* Mobile Controls (Theme Toggle + Hamburger) */}
                    <div className="md:hidden flex items-center gap-3">
                        {/* Theme Toggle Mobile */}
                        <button
                            onClick={() => toggleDarkMode(isDarkMode ? "light" : "dark")}
                            className={`p-2 rounded-full transition-all duration-300 cursor-pointer hover:scale-110 focus:outline-none
                                ${
                                    isDarkMode
                                        ? "text-gray-400 hover:text-orange-400 hover:bg-orange-500/10"
                                        : "text-gray-500 hover:text-orange-500 hover:bg-orange-50"
                                }`}
                            aria-label="Toggle Theme"
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {/* Hamburger Open */}
                        {!isMenuOpen && (
                            <button
                                onClick={() => setIsMenuOpen(true)}
                                aria-label="Open menu"
                                className={`p-2 rounded-xl transition-all duration-300 cursor-pointer hover:scale-105 focus:outline-none
                                    ${
                                        isDarkMode
                                            ? "text-gray-300 hover:text-white hover:bg-white/10"
                                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                    }`}
                            >
                                <Menu size={24} />
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* ─── Full-Screen Mobile Menu Overlay ─────────────────────────────── */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={`fixed inset-0 z-[60] flex flex-col justify-between ${
                            isDarkMode ? "bg-black/95 backdrop-blur-md" : "bg-white/95 backdrop-blur-md"
                        }`}
                    >
                        {/* Top Right Close Button */}
                        <div className="flex justify-end p-6">
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className={`p-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-110 focus:outline-none
                                    ${
                                        isDarkMode
                                            ? "bg-white/10 text-gray-300 hover:text-white hover:bg-white/20"
                                            : "bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                                    }`}
                                aria-label="Close menu"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Centered Navigation Links */}
                        <motion.nav
                            variants={listVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex-1 flex flex-col items-center justify-center gap-10 bg-transparent"
                        >
                            {navItems.map(({ label, id }) => {
                                const isActive = activeSection === id;
                                return (
                                    <motion.button
                                        key={id}
                                        variants={itemVariants}
                                        onClick={() => goTo(id)}
                                        className={`text-3xl sm:text-4xl font-light tracking-wide transition-all duration-300 cursor-pointer hover:scale-110 focus:outline-none
                                            ${
                                                isActive
                                                    ? "text-orange-500 font-medium"
                                                    : isDarkMode
                                                    ? "text-gray-400 hover:text-white"
                                                    : "text-gray-500 hover:text-gray-900"
                                            }`}
                                    >
                                        {label}
                                    </motion.button>
                                );
                            })}
                        </motion.nav>

                        {/* Bottom Social Links */}
                        <motion.div
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="p-10 flex justify-center items-center gap-8"
                        >
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={label}
                                    className={`p-4 rounded-full transition-all duration-300 cursor-pointer hover:scale-110 focus:outline-none border
                                        ${
                                            isDarkMode
                                                ? "border-white/10 text-gray-400 hover:text-orange-400 hover:border-orange-500/50 hover:bg-orange-500/10"
                                                : "border-gray-200 text-gray-500 hover:text-orange-500 hover:border-orange-300 hover:bg-orange-50"
                                        }`}
                                >
                                    <Icon size={24} />
                                </a>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
