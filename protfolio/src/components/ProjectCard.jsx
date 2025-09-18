import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FiGithub } from "react-icons/fi";

function ProjectCard({ project, index, isDarkMode }) {
    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.1,
            },
        },
    };

    return (
        <motion.div
            variants={cardVariants}
            whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeInOut" },
            }}
            className="group relative cursor-pointer"
        >
            <div
                className={`rounded-2xl overflow-hidden border transition-all duration-500 ${isDarkMode
                    ? "bg-gray-900/50 border-gray-800 hover:border-gray-700 hover:shadow-2xl hover:shadow-blue-500/10"
                    : "bg-white/80 border-gray-200 hover:border-gray-300 hover:shadow-2xl hover:shadow-blue-500/10"
                    } backdrop-blur-sm`}
            >
                {/* Project image */}
                <div className="relative overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover  transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Featured badge */}
                    {project.featured && (
                        <div className="absolute top-4 left-4">
                            <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                                Featured
                            </span>
                        </div>
                    )}

                    {/* Category badge */}
                    <div className="absolute top-4 right-4">
                        <span
                            className={`text-xs px-3 py-1 rounded-full font-medium ${isDarkMode
                                ? "bg-gray-800/80 text-gray-300"
                                : "bg-white/80 text-gray-700"
                                } backdrop-blur-sm`}
                        >
                            {project.category}
                        </span>
                    </div>

                    {/* Desktop Hover Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="hidden md:flex absolute inset-0 bg-black/60 backdrop-blur-sm items-center justify-center space-x-4 group-hover:opacity-100"
                    >

                        {project.liveUrl && (
                            <motion.a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 text-sm font-medium transition-colors"
                            >
                                <ExternalLink size={16} />
                                <span>Live Demo</span>
                            </motion.a>
                        )}

                        <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-4 py-2 rounded-full flex items-center space-x-2 text-sm font-medium transition-all cursor-pointer"
                        >
                            <FiGithub size={16} />
                            <span>GitHub</span>
                        </motion.a>
                    </motion.div>
                </div>

                {/* Project details */}
                <div className="p-6">
                    <h3 className="text-xl font-medium mb-2 group-hover:text-blue-500 transition-colors">
                        {project.title}
                    </h3>
                    <p
                        className={`text-sm leading-relaxed mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                    >
                        {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                            <span
                                key={tagIndex}
                                className={`text-xs px-3 py-1 rounded-full ${isDarkMode
                                    ? "bg-gray-800 text-gray-300"
                                    : "bg-gray-100 text-gray-700"
                                    }`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Mobile/Tablet always visible buttons */}
                    <div className="flex md:hidden space-x-3">

                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 text-sm font-medium"
                            >
                                <ExternalLink size={16} />
                                <span>Live Demo</span>
                            </a>
                        )}

                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 border-2 border-gray-300 ${isDarkMode ? "text-gray-400" : "text-gray-700"} hover:bg-gray-200 px-4 py-2 rounded-full flex items-center justify-center space-x-2 text-sm font-medium`}
                        >
                            <FiGithub size={16} />
                            <span>GitHub</span>
                        </a>
                    </div>
                </div>
            </div>
        </motion.div >
    );
}

export default ProjectCard;
