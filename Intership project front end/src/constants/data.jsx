import { assets } from "../assets/assets";
import { RiDashboardLine, RiUserLine } from "react-icons/ri";
import { TbLogs } from "react-icons/tb";
import { IoMdMore } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { GoHome } from "react-icons/go";

export const features = [
    {
        title: "Lightning Fast Creation",
        description: "Generate high-quality blog posts in minutes, not hours. Our AI understands your style and tone.",
        icon: "⚡",
        gradient: "from-purple-500 to-pink-500"
    },
    {
        title: "Intelligent Content",
        description: "Advanced AI algorithms ensure your content is engaging, SEO-optimized, and tailored to your audience.",
        icon: "🧠",
        gradient: "from-blue-500 to-indigo-600"
    },
    {
        title: "Privacy First",
        description: "Your data is secure. We don't store your personal information or share your content with third parties.",
        icon: "🔒",
        gradient: "from-emerald-500 to-teal-600"
    },
    {
        title: "Developer Friendly",
        description: "Built by developers, for developers. Seamless integration with your existing workflow and tools.",
        icon: "💻",
        gradient: "from-amber-500 to-orange-500"
    },
    {
        title: "Community Driven",
        description: "Join thousands of creators who trust CodeScribe AI for their content creation needs.",
        icon: "👥",
        gradient: "from-rose-500 to-pink-600"
    },
    {
        title: "Professional Quality",
        description: "Every blog post meets professional standards with proper formatting, structure, and readability.",
        icon: "🏆",
        gradient: "from-violet-500 to-purple-600"
    }
];


export const stats = [
    { value: "50K+", label: "Active Users", icon: "👥" },
    { value: "99.9%", label: "Uptime", icon: "⏱️" },
    { value: "1M+", label: "Blogs Created", icon: "✍️" },
    { value: "24/7", label: "Support", icon: "🛟" }
];



export const teamMembers = [
    {
        name: "Soumita Paul",
        role: "Backend Enginner",
        image: assets.shoumitaPaulImage,
        gitHub: 'https://github.com/soumita-paul-90',
        linkdin: 'https://www.linkedin.com/in/soumita-paul-a5b5b2292?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    },
    {
        name: "Arindom Pal",
        role: "Backend Enginner",
        image: assets.arindomPaulImage,
        gitHub: 'https://github.com/MrPal28',
        linkdin: 'https://www.linkedin.com/in/arindam-pal-977318291',
    },
    {
        name: "Soumyadip Adak",
        role: "Full Stack Developer",
        image: assets.soumyadipAdakImage,
        gitHub: 'https://github.com/soumyadip-adak99',
        linkdin: 'https://www.linkedin.com/in/soumyadip-adak-a19b03281/',
    },
    {
        name: "Aritra Das",
        role: "Backend Engineer",
        image: assets.aritraDasImage,
        gitHub: 'https://github.com/Aritra7636',
        linkdin: 'https://www.linkedin.com/in/aritra-das-a69897212?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    },
    {
        name: "Aritra Naskar",
        role: "Backend Enginner",
        image: assets.aritraNaskarImage,
        gitHub: 'https://guthub.com',
        linkdin: 'https://linkedin.com',
    }
];


export const adminNavItems = [
    {
        icon: <RiDashboardLine className="text-xl" />,
        label: "Dashboard",
        path: "/admin/dashboard"
    },
    {
        icon: <RiUserLine className="text-xl" />,
        label: "Users",
        path: "/admin/users"
    },
    {
        icon: <TbLogs className="text-xl" />,
        label: "Blogs",
        path: "/admin/blogs"
    },
    {
        icon: <IoMdMore className="text-xl" />,
        label: "More",
        path: "/admin/more"
    },
];

export const userNavItems = [
    {
        icon: <GoHome className="text-xl" />,
        label: "Home",
        path: "/user/home"
    },
    {
        icon: <CiSearch className="text-xl" />,
        label: "Search",
        //path: "/admin/users"
    },
    {
        icon: <IoCreateOutline className="text-xl" />,
        label: "Create",
        path: "/user/create-blogs"
    },
];


export const demoUserData = [
    {
        "id": "68669bbd3c0bc7f052828b2c",
        "firstName": "Soumyadip",
        "lastName": "Adak",
        "email": "soumyadip76adak@gmail.com",
        "phoneNumber": "6294385292",
        "profileImage": null,
        "blogEntries": [
            {
                "id": "686e34ec8d09b67092caf5a5",
                "title": "My first blog",
                "authorName": "soumyadip76adak@gmail.com",
                "content": "I create my first blog in this web site",
                "image": null,
                "status": "APPROVED",
                "aiApproved": true,
                "create_at": "2025-07-09T09:22:52"
            },
            {
                "id": "686e43b7e9b84bfa98238170",
                "title": "My second blog",
                "authorName": "soumyadip76adak@gmail.com",
                "content": "I create my first blog in this web site",
                "image": null,
                "status": "APPROVED",
                "aiApproved": true,
                "create_at": "2025-07-09T15:55:59"
            },
            {
                "id": "686e43f6e9b84bfa98238171",
                "title": "My Third blog",
                "authorName": "soumyadip76adak@gmail.com",
                "content": "I create my third blog in this web site",
                "image": null,
                "status": "APPROVED",
                "aiApproved": true,
                "create_at": "2025-07-09T15:57:02"
            },
            {
                "id": "6875b997f93c3e45011f0d70",
                "title": "My 6th",
                "authorName": "Soumyadip Adak",
                "content": "I create a new blog",
                "image": null,
                "status": "APPROVED",
                "aiApproved": true,
                "create_at": "2025-07-15T07:44:47"
            }
        ],
        "createdAt": null
    },
    {
        "id": "6867dd5164988a5fa3a8b18a",
        "firstName": "MasterAdmin",
        "lastName": "io.codeScribe",
        "email": "io.codescribeai@gmail.com",
        "phoneNumber": "9898980134",
        "profileImage": null,
        "blogEntries": [],
        "createdAt": null
    },
    {
        "id": "6879fb18b40a34271f16f528",
        "firstName": "Adak",
        "lastName": "Soumyadip",
        "email": "soumyadipadakmailbox@gmail.com",
        "phoneNumber": "8207296428",
        "profileImage": null,
        "blogEntries": [],
        "createdAt": "2025-07-18T13:13:20.038"
    },
    {
        "id": "687a2b954db9cbdfaf933777",
        "firstName": "Arindam",
        "lastName": "Pal",
        "email": "arindampa0@gmail.com",
        "phoneNumber": "912345670",
        "profileImage": null,
        "blogEntries": [],
        "createdAt": null
    },
    {
        "id": "687a2e184db9cbdfaf933784",
        "firstName": "Swati",
        "lastName": "Pal",
        "email": "swatipal1976@gmail.com",
        "phoneNumber": "912345670",
        "profileImage": null,
        "blogEntries": [],
        "createdAt": null
    }
]
