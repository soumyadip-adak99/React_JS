import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { SKILLS_CATEGORY, STATS, TECH_STACK } from "../../utils/data";
import { containerVariants, itemVariants } from "../../utils/helper";

export default function SkillsSection() {
    const { isDarkMode } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-10px" });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    const skillBarVariants = {
        hidden: { width: 8, opacity: 0 },
        visible: (level) => ({
            width: `${level}%`,
            opacity: 1,
            transition: {
                duration: 1.2,
                ease: "easeOut",
                delay: 0.3,
            },
        }),
    };

    return (
        <section
            ref={sectionRef}
            id="skills"
            className={`scroll-mt-24 py-4 px-10 ${
                isDarkMode ? "bg-black text-white" : "bg-gray-50 text-gray-900"
            } relative overflow-hidden`}
        >
            {/* Background elements */}
            <motion.div style={{ y }} className="absolute inset-0 overflow-hidden">
                <div
                    className={`absolute top-40 right-1/4 w-full h-64 rounded-full blur-3xl ${
                        isDarkMode ? "opacity-8 bg-orange-500" : "opacity-5 bg-orange-400"
                    }`}
                />

                <div
                    className={`absolute bottom-40 left-1/4 w-64 h-64 rounded-full blur-3xl ${
                        isDarkMode ? "opacity-5 bg-amber-500" : "opacity-5 bg-amber-400"
                    }`}
                />
            </motion.div>

            <div className="max-w-6xl mx-auto relative z-10 ">
                {/* Section header */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="text-center mb-20"
                >
                    <motion.div
                        variants={itemVariants}
                        className={`text-sm uppercase tracking-widest ${
                            isDarkMode ? "text-gray-500" : "text-gray-600"
                        }`}
                    >
                        Technical Expertise
                    </motion.div>

                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-5xl font-light mb-6"
                    >
                        Skills & <span className="text-orange-500 font-medium">Technologies</span>
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className={`text-lg ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                        } max-w-2xl mx-auto font-light`}
                    >
                        A comprehensive toolkit for building modern, scalable web applications from
                        concept to deployment.
                    </motion.p>
                </motion.div>

                {/* Skills grid */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="grid md:grid-cols-2 gap-8 lg:gap-12"
                >
                    {SKILLS_CATEGORY.map((category) => (
                        <motion.div
                            key={category.title}
                            variants={itemVariants}
                            className={`p-8 rounded-2xl border ${
                                isDarkMode
                                    ? "bg-zinc-900/60 border-white/5 backdrop-blur-sm"
                                    : "bg-white/80 border-gray-200 backdrop-blur-sm"
                            }`}
                        >
                            <div className="flex items-center mb-6">
                                <div
                                    className={`p-3 rounded-xl ${
                                        isDarkMode ? "bg-zinc-800" : "bg-gray-100"
                                    } mr-4`}
                                >
                                    <category.icon size={20} className="text-orange-500" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-medium mb-1">{category.title}</h3>
                                    <p
                                        className={`text-sm ${
                                            isDarkMode ? "text-gray-400" : "text-gray-600"
                                        }`}
                                    >
                                        {category.description}
                                    </p>
                                </div>
                            </div>

                            {/* Skills list */}
                            <div className="space-y-4">
                                {category.skills.map((skill) => (
                                    <div key={skill.name} className="group">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium">
                                                {skill.name}
                                            </span>
                                            <span
                                                className={`text-xs ${
                                                    isDarkMode ? "text-gray-500" : "text-gray-600"
                                                }`}
                                            >
                                                {skill.level}%
                                            </span>
                                        </div>

                                        <div
                                            className={`h-2 rounded-full overflow-hidden ${
                                                isDarkMode ? "bg-zinc-800" : "bg-gray-200"
                                            }`}
                                        >
                                            <motion.div
                                                variants={skillBarVariants}
                                                initial="hidden"
                                                animate={isInView ? "visible" : "hidden"}
                                                custom={skill.level}
                                                className={`h-full ${skill.color} rounded-full relative`}
                                            >
                                                <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </motion.div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Additional Skills */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="mt-16"
                >
                    <motion.div variants={itemVariants} className="text-center mb-8">
                        <h3 className="text-xl font-medium mb-4">Also Working With</h3>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="relative w-full overflow-x-hidden"
                        style={{
                            maskImage:
                                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                            WebkitMaskImage:
                                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                        }}
                    >
                        <motion.div
                            className="flex gap-3"
                            animate={{
                                translateX: ["0%", "-50%"],
                            }}
                            transition={{
                                ease: "linear",
                                duration: 25,
                                repeat: Infinity,
                                repeatType: "loop",
                            }}
                            whileHover={{ paused: true }}
                        >
                            {[...TECH_STACK, ...TECH_STACK].map((tech, index) => (
                                <span
                                    key={`${tech}-${index}`}
                                    className={`px-4 py-2 text-sm rounded-full border whitespace-nowrap transition-colors duration-300 ${
                                        isDarkMode
                                            ? "bg-zinc-900 border-white/10 text-gray-300 hover:border-orange-500/40 hover:text-orange-400"
                                            : "bg-white border-gray-200 text-gray-700 hover:border-orange-300 hover:text-orange-500"
                                    }`}
                                >
                                    {tech}
                                </span>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* stats */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center items-center text-center"
                >
                    {STATS.map((stat) => (
                        <motion.div
                            key={stat.label}
                            variants={itemVariants}
                            className="flex flex-col items-center justify-center"
                        >
                            <div className="text-2xl md:text-3xl font-light text-orange-500 mb-2">
                                {stat.number}
                            </div>

                            <div
                                className={`text-sm ${
                                    isDarkMode ? "text-gray-400" : "text-gray-600"
                                }`}
                            >
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
