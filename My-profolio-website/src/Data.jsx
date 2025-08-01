import { FaHome, FaUser, FaFolderOpen, FaEnvelopeOpen } from 'react-icons/fa'
import { RiBriefcase4Fill, RiGraduationCapFill } from 'react-icons/ri'

import htmlLogo from './assets/html-logo.svg'
import cssLogo from './assets/css-logo.svg'
import tailwindLogo from "./assets/tailwind-css.svg"
import javascriptLogo from './assets/js-logo.svg'
import typescriptLogo from './assets/typescript-logo.svg'
import reactLogo from './assets/react.svg'
import javaLogo from './assets/java-logo.svg'
import pythonLogo from './assets/python-logo.svg'
import springBootLogo from './assets/spring-boot.svg'
import mySqlLogo from './assets/mysql-logo.svg'
import postgresql from './assets/postgresql.svg'
import mongodbLogo from './assets/mongodb-logo.png'

import tictactoe from './assets/tic-tac-toe.jpeg'
import brandPage from './assets/web.jpg'
import ageCalculator from './assets/webs.jpg'
import digitalClock from './assets/digitalclock.png'
import jurnalApp from './assets/websitieo.jpg'
import qrCodeGenerator from './assets/website-image.webp'
import schoolDatabase from './assets/school-database-management.jpg'
import productManagement from './assets/product.jpg'

import Theme7 from './assets/yellow.png';
import Theme6 from './assets/orange.png';
import Theme5 from './assets/yelloGreen.png';
import Theme4 from './assets/magenta.png';
import Theme3 from './assets/blue.png';
import Theme2 from './assets/blueViolte.png';
import Theme1 from './assets/red.png';


export const links = [
    {
        name: 'Home',
        icon: <FaHome className='nav-icon' />,
        path: '/',
    },
    {
        name: 'About',
        icon: <FaUser className='nav-icon' />,
        path: '/about',
    },
    {
        name: 'Portfolio',
        icon: <FaFolderOpen className='nav-icon' />,
        path: '/portfolio',
    },
    {
        name: 'Contact',
        icon: <FaEnvelopeOpen className='nav-icon' />,
        path: '/contact',
    },
];

export const personalInfo = [
    {
        title: 'First Name : ',
        description: 'Soumyadip',
    },
    {
        title: 'Last Name : ',
        description: 'Adak',
    },
    {
        title: 'Age : ',
        description: '20 Years',
    },
    {
        title: 'Nationality : ',
        description: 'Indian',
    },
    {
        title: 'Freelance : ',
        description: 'Available',
    },
    {
        title: 'Address : ',
        description: 'India',
    },
    {
        title: 'Email : ',
        description: 'soumyadipadakmailbox@gmail.com',
    },
    {
        title: 'Languages : ',
        description: 'Bengali,Hindi,English',
    },
];

export const stats = [
    {
        no: '2+',
        title: 'Years of <br/> Experience',
    },
    {
        no: '10+',
        title: 'Completed <br/> Projects',
    },
    {
        no: '5+',
        title: 'Cooming soon <br/> Project'
    },
    {
        no: '1+',
        title: 'Awards <br/> Won',
    },
];

export const skill = [
    {
        id: 1,
        img: htmlLogo,
        title: 'HTML',
        category: 'developer',
    },
    {
        id: 2,
        img: cssLogo,
        title: 'CSS',
        category: 'developer',
    },
    {
        id: 3,
        img: tailwindLogo,
        title: 'Tailwind CSS',
        category: 'developer',
    },
    {
        id: 4,
        img: javascriptLogo,
        title: 'Java Script',
        category: 'developer',
    },
    {
        id: 5,
        img: typescriptLogo,
        title: 'Type Script',
        category: 'developer',
    },
    {
        id: 6,
        img: reactLogo,
        title: 'React',
        category: 'developer',
    },
    {
        id: 7,
        img: javaLogo,
        title: 'Java',
        category: 'developer',
    },
    {
        id: 8,
        img: pythonLogo,
        title: 'Python',
        category: 'developer',
    },

    {
        id: 9,
        img: springBootLogo,
        title: 'Spring Boot',
        category: 'developer',
    },
    {
        id: 10,
        img: mySqlLogo,
        title: 'My SQL',
        category: 'developer',
    },
    {
        id: 11,
        img: postgresql,
        title: 'PostgreSQL',
        category: 'developer',
    },
    {
        id: 12,
        img: mongodbLogo,
        title: 'Mongo DB',
        category: 'developer',
    },

];


export const resume = [
    {
        id: 1,
        category: "experience",
        icon: <RiBriefcase4Fill />,
        year: "2023 - Present",
        title: 'Web Development <span>Frontend & developer</span>',
        desc: "Working on multiple projects and developing skills in front-end and back-end development.",
    },
    {
        id: 2,
        category: "experience",
        icon: <RiBriefcase4Fill />,
        year: "2023 - Present",
        title: 'UI/UX Design <span>Better UI Experience</span></>',
        desc: "Creating multiple UI/UX components for enhanced user experience.",
    },
    {
        id: 3,
        category: "education",
        icon: <RiGraduationCapFill />,
        year: "2015 - 2023",
        title: 'Higher Secondary School <span>K.S.H.S</span></>',
        desc: "Completed schooling from Kelomal Santoshini High School.",
    },
    {
        id: 4,
        category: "education",
        icon: <RiGraduationCapFill />,
        year: "2023 - Present",
        title: 'BCA Degree <span>IEM</span>',
        desc: "Currently pursuing Bachelor of Computer Application degree at the Institute of Engineering & Management.",
    },
];


export const portfolio = [
    {
        id: 1,
        img: jurnalApp,
        title: "Journal Application with Secure developer",
        description:
            "Designed and developed a journal application with robust developer architecture using Spring Security and MongoDB.",
        skills: [springBootLogo, mongodbLogo, mySqlLogo],
        link: "https://github.com/soumyadip-adak99/Spring_Boot_Mini_Project/tree/main/Learning%20path/Spring%20boot"
    },
    {
        id: 2,
        img: schoolDatabase,
        title: "School Database Management System",
        description:
            "Built a full-stack web application for school database management, handling both frontend and developer development.",
        skills: [reactLogo, springBootLogo, mongodbLogo],
        link: "https://github.com/soumyadip-adak99/Spring_Boot_Mini_Project/tree/main/SpringMangoProjectDB"
    },
    {
        id: 3,
        img: productManagement,
        title: "Product Management System",
        description:
            "Developed a product management system with features to add, edit, and delete products efficiently.",
        skills: [reactLogo, springBootLogo, mongodbLogo],
        link: "/"
    },
    {
        id: 4,
        img: tictactoe,
        title: "Tic-Tac-Toe Game",
        description:
            "Created an interactive Tic-Tac-Toe game with a responsive UI using HTML, CSS, and JavaScript.",
        skills: [htmlLogo, cssLogo, javascriptLogo],
        link: "https://tic-tac-toe-12.vercel.app/"
    },
    {
        id: 5,
        img: brandPage,
        title: "Brand Promotion Website",
        description:
            "Developed a sleek and modern website for brand promotion, enhancing online visibility and engagement.",
        skills: [reactLogo, cssLogo],
        link: "https://brand-page-flame.vercel.app/"
    },
    {
        id: 6,
        img: ageCalculator,
        title: "Age Calculator Tool",
        description:
            "Developed a web-based age calculator to determine age accurately based on user input.",
        skills: [reactLogo, cssLogo],
        link: "https://age-calculator23-adakspages.vercel.app/"
    },
    {
        id: 7,
        img: digitalClock,
        title: "Digital Clock Application",
        description:
            "Created a real-time digital clock with a sleek and responsive interface using React and CSS.",
        skills: [reactLogo, cssLogo],
        link: "https://digitalclock-inky.vercel.app/"
    },
    {
        id: 8,
        img: qrCodeGenerator,
        title: "QR Code Generator",
        description:
            "Built a web application that generates QR codes dynamically based on user input.",
        skills: [htmlLogo, cssLogo, javascriptLogo],
        link: "https://qr-code-generator-phi-plum.vercel.app/"
    }
];

export const themes = [
    {
        img: Theme1,
        hue: '4'
    },
    {
        img: Theme2,
        hue: '271'
    },
    {
        img: Theme3,
        hue: '225'
    },

    {
        img: Theme4,
        hue: '339'
    },
    {
        img: Theme5,
        hue: '80'
    },
    {
        img: Theme6,
        hue: '19'
    },
    {
        img: Theme7,
        hue: '42'
    },

]


