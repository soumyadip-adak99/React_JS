import { useRef } from "react"
import { motion, transform, useInView, useScroll, useTransform } from 'framer-motion'
import { useTheme } from "../../context/ThemeContext"
import { JOURNEY_STEPS, PASSIONS } from "../../utils/data"
import SIGNATURE from '../../assets/signature.png'
import { containerVariants, itemVariants } from "../../utils/helper"

export default function AboutSection() {
    const { isDarkMode } = useTheme()
    const sectionRef = useRef(null)
    const timelineRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
    const timelineView = useInView(timelineRef, {
        once: true,
        margin: "-50px"
    })

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [50, -50])

    const timelineVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    }

    const stepVariants = {
        hidden: { x: -50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transform: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    }

    return (
        <div>AboutSection</div>
    )
}
