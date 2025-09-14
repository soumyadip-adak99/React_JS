import {
    Code2,
    GraduationCap,
    Briefcase,
    Award,
    Rocket,
    Heart,
    Coffee,
    BookOpen,
    Zap,
    Database,
    Server,
    Cloud,
    Mail,
    MapPin,
    Phone,
} from "lucide-react";

import {
    FiGithub,
    FiLinkedin,
    FiTwitter,
    FiFacebook,
    FiInstagram
} from "react-icons/fi";

import PROJECT_IMG_1 from '../assets/project-1.png'
import PROJECT_IMG_2 from '../assets/project-2.png'
import PROJECT_IMG_3 from '../assets/project-3.png'
import PROJECT_IMG_4 from '../assets/project-4.png'


export const SKILLS_CATEGORY = [
    {
        title: "Frontend",
        icon: Code2,
        description: "Crafting beautiful, responsive user interfaces",
        skills: [
            { name: "HTML", level: 80, color: "bg-red-500" },
            { name: "CSS", level: 85, color: "bg-blue-600" },
            { name: "JS", level: 90, color: "bg-yellow-700" },
            { name: "Tailwind Css", level: 90, color: "bg-blue-600" },
            { name: "React", level: 80, color: "bg-blue-500" },
            { name: "TypeScript", level: 60, color: "bg-blue-600" },
        ]
    },

    {
        title: "Backend",
        icon: Server,
        description: "Building robust server-side solutions",
        skills: [
            { name: "Spring Boot", level: 90, color: "bg-green-400" },
            { name: "Python", level: 70, color: "bg-green-400" },
            { name: "Express.js", level: 60, color: "bg-green-500" },
            { name: "REST APIs", level: 92, color: "bg-orange-500" }
        ]
    },

    {
        title: "DevOps",
        icon: Cloud,
        description: "Developing and scaling applications",
        skills: [
            { name: "Docker", level: 80, color: "bg-blue-600" },
            { name: "Vercel", level: 70, color: "bg-gray-900" },
            { name: "Git", level: 95, color: "bg-orange-700" }
        ]
    }
]

export const TECH_STACK = [
    "Java", "C", "Python", "JS", "HTML5", "CSS3", "React"
]

export const STATS = [
    { number: "8+", label: "Completed" },
    { number: "2+", label: "Years Experience" },
    { number: "10+", label: "Technologies" },
]

export const PROJECTS = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce solution with advanced filtering, payment integration, and real-time inventor",
        image: PROJECT_IMG_1,
        tags: ["React", "Tailwind", "Framer motion"],
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
        category: "Full Stack",
    },

    {
        id: 2,
        title: "Blog App with AI Post Generator",
        description: "A full-stack blog app using the MERN stack - with full Markdown support, tag filtering",
        image: PROJECT_IMG_2,
        tags: ["React", "Node.js", "MongoDB", "Tailwind"],
        liveUrl: "https://youtu.be/tUnGudIBBjQ",
        githubUrl: "#",
        featured: true,
        category: "Full Stack",
    },

    {
        id: 3,
        title: "Task Management App",
        description:
            "Collaborative project management tool with real-time updates, team chat, and advanced analytics dashboard",
        image: PROJECT_IMG_3,
        tags: ["Next.js", "TypeScript", "Node.js", "MongoDb"],
        liveUrl: "https://youtu.be/fZK57PXKC-0",
        githubUrl: "#",
        featured: true,
        category: "Web App",
    },


    {
        id: 4,
        title: "AI-Powered Interview Prep App",
        description:
            "A smart AI-powered Interview Preparation App using the MERN stack - along with the Gemini API for init",
        image: PROJECT_IMG_4,
        tags: ["Next.js", "TypeScript", "Node.js", "MongoDb"],
        liveUrl: "https://youtu.be/yKB90yM-a04",
        githubUrl: "#",
        featured: false,
        category: "Web App",
    }

]

export const JOURNEY_STEPS = [
    {
        year: "2021",
        title: "Started Coding Journey",
        company: "Self-taught",
        description:
            "Began learning web development with HTML, CSS, and JavaScript. Built my first website and fell in love with coding.",
        icon: Code2,
        color: "bg-blue-500"
    },
    {
        year: "2022",
        title: "First Internship",
        company: "TechStart Inc.",
        description:
            "Joined as a frontend intern, working with React and learning modern development practices. Contributed to multiple client projects.",
        icon: Briefcase,
        color: "bg-green-500"
    },
    {
        year: "2022",
        title: "Computer Science Degree",
        company: "University of Technology",
        description:
            "Graduated with honors, specializing in web technologies and software engineering. Led the final year project on scalable web applications.",
        icon: GraduationCap,
        color: "bg-purple-500"
    },
    {
        year: "2023",
        title: "Full Stack Developer",
        company: "Digital Solutions Ltd.",
        description:
            "Promoted to full-time developer role. Built end-to-end applications using MERN stack and led junior developers in agile projects.",
        icon: Rocket,
        color: "bg-orange-500"
    },
    {
        year: "2024",
        title: "Freelance & Open Source",
        company: "Independent",
        description:
            "Started freelancing and contributing to open source projects. Launched 3 successful web applications for clients across industries.",
        icon: Award,
        color: "bg-pink-500"
    },
    {
        year: "2025",
        title: "Senior Developer",
        company: "Innovate Tech",
        description:
            "Currently building innovative solutions and exploring new technologies like AI integration and advanced system architecture.",
        icon: Zap,
        color: "bg-cyan-500"
    }
];

export const PASSIONS = [
    {
        icon: Heart,
        title: "User Experience",
        description: "Crafting intuitive interfaces that users love",
    },
    {
        icon: Coffee,
        title: "Problem Solving",
        description: "Turning complex challenges into elegant solutions",
    },
    {
        icon: BookOpen,
        title: "Continuous Learning",
        description: "Always exploring new technologies and best practices",
    },
];

export const SOCIAL_LINKS = [
    {
        name: "GitHub",
        icon: FiGithub,
        url: "https://github.com",
        color: "hover:text-gray-400",
        bgColor: "hover:bg-gray-800"
    },
    {
        name: "LinkedIn",
        icon: FiLinkedin,
        url: "https://linkedin.com",
        color: "hover:text-blue-400",
        bgColor: "hover:bg-blue-500/10"
    },
    {
        name: "Twitter",
        icon: FiTwitter,
        url: "https://twitter.com",
        color: "hover:text-sky-400",
        bgColor: "hover:bg-sky-500/10"
    },
    {
        name: "Email",
        icon: Mail,
        url: "mailto:alex@example.com",
        color: "hover:text-green-400",
        bgColor: "hover:bg-green-500/10"
    },
    {
        name: "Facebook",
        icon: FiFacebook,
        url: "https://facebook.com",
        color: "hover:text-blue-600",
        bgColor: "hover:bg-blue-600/10"
    },
    {
        name: "Instagram",
        icon: FiInstagram,
        url: "https://instagram.com",
        color: "hover:text-pink-400",
        bgColor: "hover:bg-pink-400/10"
    }
];