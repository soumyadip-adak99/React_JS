import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Mail, Code2, ArrowUp } from 'lucide-react'
import { useTheme } from "../../context/ThemeContext"
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi"
import { containerVariants, itemVariants } from "../../utils/helper"

export default function Footer() {
    const { isDarkMode } = useTheme();
    const footerRef = useRef(null);
    const isInView = useInView(footerRef, { once: true, margin: "-50px" });
    const { scrollYProgress } = useScroll();
    const scrollY = useTransform(scrollYProgress, [0, 1], [0, -50]);

    const socialLinks = [
        { name: 'GitHub', icon: FiGithub, url: 'https://github.com/soumyadip-adak99', color: 'hover:text-gray-400' },
        { name: 'LinkedIn', icon: FiLinkedin, url: 'https://www.linkedin.com/in/soumyadip-adak-a19b03281/', color: 'hover:text-blue-400' },
        { name: 'Twitter', icon: FiTwitter, url: 'https://twitter.com', color: 'hover:text-sky-400' },
        { name: 'Email', icon: Mail, url: 'work.soumyadipadak@gmail.com', color: 'hover:text-green-400' }
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const AnimatedGradientLine = () => (
        <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
            <motion.div
                className={`h-px bg-gradient-to-r ${isDarkMode ? "from-transparent via-blue-500 to-transparent" : "from-transparent via-blue-600 to-transparent"}`}
                initial={{ width: '0%', opacity: 0 }}
                animate={isInView ? { width: '100%', opacity: 1 } : {}}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            <motion.div
                className={`absolute top-0 h-px w-32 bg-gradient-to-r 
                    ${isDarkMode ? "from-blue-400 via-purple-500 to-blue-400" : "from-blue-500 via-purple-600 to-blue-500"} blur-sm`}
                animate={{ x: ['-50%', 'calc(100vw + 50%)'] }}
                transition={{
                    x: { repeat: Infinity, repeatType: "loop", duration: 6, ease: "linear", delay: 1 }
                }}
            />
        </div>
    );

    return (
        <footer
            ref={footerRef}
            className={`relative ${isDarkMode ? "bg-gray-950 text-white" : "bg-white text-gray-900"} overflow-hidden `}
        >
            {/* Animated wave/gradient line */}
            <AnimatedGradientLine />

            {/* Background element */}
            <motion.div style={{ y: scrollY }} className='absolute inset-0 overflow pointer-events-none'>
                <div className={`absolute bottom-10 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-30 ${isDarkMode ? "bg-blue-500" : "bg-blue-400"}`} />
                <div className={`absolute top-10 right-1/4 w-48 h-48 rounded-full blur-3xl opacity-30 ${isDarkMode ? "bg-purple-500" : "bg-purple-400"}`} />
            </motion.div>

            <div className="relative z-10 px-6 py-16">
                <div className="max-w-6xl mx-auto">

                    {/* Main footer content */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={containerVariants}
                        className="text-center space-y-8"
                    >
                        {/* Logo/brand */}
                        <motion.div variants={itemVariants} className="space-y-4">
                            <motion.div
                                className="inline-flex items-center space-x-3"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="text-blue-500"
                                >
                                    <Code2 size={28} />
                                </motion.div>
                                <span className="text-2xl font-semibold">Soumyadip Adak</span>
                            </motion.div>

                            <motion.p
                                variants={itemVariants}
                                className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} max-w-md mx-auto`}
                            >
                                Crafting digital experiences with passion, precision, and a touch of magic.
                            </motion.p>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            variants={itemVariants}
                            className="flex justify-center space-x-6"
                        >
                            {socialLinks.map((link, idx) => (
                                <a
                                    key={idx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-xl transition-colors duration-200 ${link.color}`}
                                >
                                    <link.icon />
                                </a>
                            ))}
                        </motion.div>

                        {/* Back to top */}
                        <motion.button
                            variants={itemVariants}
                            onClick={scrollToTop}
                            whileHover={{ y: -3, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`mx-auto flex items-center space-x-2 text-sm font-medium border px-4 py-2 rounded-full transition-colors duration-200 ${isDarkMode ? "border-gray-700 hover:border-blue-500 hover:text-blue-400" : "border-gray-300 hover:border-blue-500 hover:text-blue-600"}`}
                        >
                            <ArrowUp size={16} />
                            <span>Back to Top</span>
                        </motion.button>

                        {/* Copyright */}
                        <motion.p
                            variants={itemVariants}
                            className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}
                        >
                            © {new Date().getFullYear()} Soumyadip Adak. All rights reserved.
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
}