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
import PROJECT_IMG_5 from '../assets/project-5.png'
import PROJECT_IMG_6 from '../assets/project-6.png'


export const SKILLS_CATEGORY = [
    {
        title: "Frontend",
        icon: Code2,
        description: "Crafting beautiful, responsive user interfaces",
        skills: [
            // { name: "HTML", level: 80, color: "bg-red-500" },
            // { name: "CSS", level: 85, color: "bg-blue-600" },
            // { name: "JS", level: 90, color: "bg-yellow-400" },
            { name: "React", level: 80, color: "bg-blue-800" },
            { name: "Tailwind Css", level: 90, color: "bg-blue-400" },
            { name: "TypeScript", level: 60, color: "bg-blue-700" },
        ]
    },

    {
        title: "Backend",
        icon: Server,
        description: "Building robust server-side solutions",
        skills: [
            { name: "Spring Boot", level: 90, color: "bg-green-500" },
            // { name: "Python", level: 70, color: "bg-blue-500" },
            { name: "Express.js", level: 60, color: "bg-gray-600" },
            { name: "REST APIs", level: 92, color: "bg-orange-500" }
        ]
    },

    {
        title: "Database",
        icon: Database,
        description: "Developing and scaling applications",
        skills: [
            { name: "MongoDB", level: 80, color: "bg-green-600" },
            { name: "MySQL", level: 70, color: "bg-blue-700" },
            { name: "PostgreSQL", level: 60, color: "bg-blue-400" },
            // { name: "Redis", level: 65, color: "bg-red-500" }
        ]
    },

    {
        title: "DevOps",
        icon: Cloud,
        description: "Developing and scaling applications",
        skills: [
            { name: "Docker", level: 80, color: "bg-blue-600" },
            { name: "Vercel", level: 70, color: "bg-gray-600" },
            { name: "Git", level: 95, color: "bg-orange-700" }
        ]
    }
]

export const TECH_STACK = [
    "Java", "Python", "JavaScript", "HTML5", "CSS3",
]

export const STATS = [
    { number: "8+", label: "Projects Completed" },
    { number: "2+", label: "Years Experience" },
    { number: "10+", label: "Technologies" },
    { number: "100%", label: "Project Solution" },
]

export const PROJECTS = [
    {
        id: 1,
        title: "Blog Application With AI Blog Scanner",
        description: "A full-stack blog-application to share new ideas and post recent latest news and etc.",
        image: PROJECT_IMG_1,
        tags: ["Spring Boot", "React", "Tailwind", "MongoDB"],
        liveUrl: "https://codescribeai.pages.dev",
        githubUrl: "https://github.com/soumyadip-adak99/codescribe-ai/",
        featured: true,
        category: "Full Stack",
    },

    {
        id: 2,
        title: "Remove Image Background",
        description: "A full-stack remove image background - JAVA-FULLSTACK project",
        image: PROJECT_IMG_2,
        tags: ["Spring Boot", "React", "Tailwind", "PostgreSQL"],
        liveUrl: '',
        githubUrl: "https://github.com/soumyadip-adak99/Remove-image-background-spring-boot-project/",
        featured: true,
        category: "Full Stack",
    },

    {
        id: 3,
        title: "Doctor Recommendation Web App",
        description:
            "This is a Machine Learning project this project recommended doctors according to the desies",
        image: PROJECT_IMG_3,
        tags: ["Python", "Flask", "HTML", "CSS"],
        liveUrl: "",
        githubUrl: "https://github.com/MrPal28/medical-ai-recommendation?tab=readme-ov-file",
        featured: true,
        category: "Web App",
    },

    {
        id: 4,
        title: "Portfolio Website",
        description:
            "This is my own portfolio web site that show case my projects and tell about me",
        image: PROJECT_IMG_4,
        tags: ["React", "Tailwind", "motion"],
        liveUrl: "https://soumyadip-adak.pages.dev/",
        githubUrl: "https://github.com/soumyadip-adak99/React_JS/tree/main/protfolio",
        featured: true,
        category: "Web App",
    },


    {
        id: 4,
        title: "Tic Tac Toe game",
        description:
            "Tic Tac Toe Game a basic react project for build under standing the react fundamentals",
        image: PROJECT_IMG_5,
        tags: ["React", "JavaScript", "css"],
        liveUrl: "https://tic-tac-toe-12.vercel.app/",
        githubUrl: "https://github.com/soumyadip-adak99/React_JS/tree/main/Tic-tac-toe",
        featured: true,
        category: "Web App",
    },

    {
        id: 5,
        title: "Snake Game",
        description:
            "This is my first step in game development, to develop a Snake game using Java",
        image: PROJECT_IMG_6,
        tags: ["JAVA"],
        liveUrl: '',
        githubUrl: "https://github.com/soumyadip-adak99/Snake_Game",
        featured: false,
        category: "Application",
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