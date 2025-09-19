import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Code2, Sun, Moon, Menu, X } from "lucide-react"
import { useTheme } from "../context/ThemeContext"

export default function Navbar() {
    const { isDarkMode, toggleDarkMode } = useTheme()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
            const offset = 80
            const elementPosition = element.getBoundingClientRect().top + window.scrollY
            const offsetPosition = elementPosition - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            })
            setIsMenuOpen(false)
        }
    }

    const navElements = ["Home", "Skills", "Work", "About", "Contact"]

    return (
        <motion.nav
            style={{ opacity: 1 }}
            className={`fixed top-0 w-full z-50 px-6 py-4 backdrop-blur-md border-b transition-colors duration-300
            ${isDarkMode ? "bg-gray-950/80 border-gray-800" : "bg-gray-50/80 border-gray-200"}`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 cursor-pointer select-none"
                >
                    <Code2 size={24} className="text-blue-500" />
                    <span className={`text-lg ml-1 font-bold tracking-wide ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Time to Code</span>
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {navElements.map((item) => (
                        <motion.button
                            key={item}
                            whileHover={{ y: -2 }}
                            onClick={() => scrollToSection(item.toLowerCase())}
                            className={`text-sm uppercase tracking-wider transition-colors cursor-pointer font-medium
                                ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                            {item}
                        </motion.button>
                    ))}

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleDarkMode(isDarkMode ? "light" : "dark")}
                        className={`p-2 rounded-full transition-colors cursor-pointer shadow-sm
                            ${isDarkMode
                                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"}`}
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={18} />}
                    </motion.button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center space-x-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleDarkMode(isDarkMode ? "light" : "dark")}
                        className={`p-2 rounded-full transition-colors cursor-pointer shadow-sm
                             ${isDarkMode ? "text-gray-400 hover:text-white hover:bg-gray-800"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"}`}
                    >
                        {isDarkMode ? <Sun size={24} /> : <Moon size={25} />}
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`p-2 rounded-full transition-colors cursor-pointer shadow-sm
                            ${isDarkMode ? "text-gray-400 hover:text-white hover:bg-gray-800"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"}`}
                    >
                        {isMenuOpen ? <X size={22} /> : <Menu size={24} />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }}
                        exit={{ opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } }}
                        className={`md:hidden mt-4 rounded-xl shadow-lg backdrop-blur-md overflow-hidden
                            ${isDarkMode ? "bg-gray-900/90 border border-gray-800/50" : "bg-gray-200 border border-gray-200"}`}
                    >
                        <div className="flex flex-col">
                            {navElements.map((item) => (
                                <motion.button
                                    key={item}
                                    whileHover={{ x: 5 }}
                                    onClick={() => scrollToSection(item.toLowerCase())}
                                    className={`w-full text-left px-4 py-3 text-sm uppercase tracking-wider transition-colors font-medium
                                        ${isDarkMode ? "text-gray-300 hover:text-white hover:bg-gray-800/50" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"}`}
                                >
                                    {item}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav >
    )
}