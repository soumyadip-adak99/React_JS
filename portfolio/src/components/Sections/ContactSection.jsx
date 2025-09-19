import { useState, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Send } from 'lucide-react'
import { containerVariants, itemVariants } from '../../utils/helper'
import { useTheme } from '../../context/ThemeContext'
import TextInput from '../Input/TextInput'
import SuccessModal from '../SuccessModal'
import { CONTACT_INFO, SOCIAL_LINKS } from '../../utils/data'
import emailjs from '@emailjs/browser'

export default function ContactSection() {
    const { isDarkMode } = useTheme()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    })

    const [showSuccess, setShowSuccess] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [50, -50])

    const handleInputChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)


        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;


        try {
            await emailjs.send(
                serviceId,
                templateId,
                {
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                },
                publicKey
            )

            setShowSuccess(true)
            setFormData({ name: "", email: "", message: "" })
            setTimeout(() => setShowSuccess(false), 3000)
        } catch (err) {
            console.error("EmailJS Error:", err)
            alert("Error sending message.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section
            id="contact"
            ref={sectionRef}
            className={`py-24 px-6 ${isDarkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"} relative overflow-hidden`}
        >
            {/* background element */}
            <motion.div style={{ y }} className='absolute inset-0 overflow-hidden'>
                <div className={`absolute top-20 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-5 ${isDarkMode ? "bg-blue-500" : "bg-blue-400"}`} />
                <div className={`absolute bottom-40 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-5 ${isDarkMode ? "bg-purple-500" : "bg-purple-400"}`} />
            </motion.div>

            {/* Section header */}
            <div className='max-w-6xl relative z-10 mx-auto'>
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className='text-center mb-20'
                >
                    <motion.div variants={itemVariants} className={`text-sm uppercase tracking-widest ${isDarkMode ? "text-gray-500" : "text-gray-600"} mb-4`}>
                        Let's Connect
                    </motion.div>

                    <motion.h2
                        variants={itemVariants}
                        className='text-3xl md:text-5xl font-light mb-6'
                    >
                        Get in
                        <span className='text-blue-500 font-medium'> Touch</span>
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className={`text-xl max-w-2xl mx-auto ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                        Ready to start your next project? Let's discuss how we can bring
                        your ideas to life.
                    </motion.p>
                </motion.div>

                <div className='grid lg:grid-cols-2 gap-16 items-start'>
                    {/* contact form */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={containerVariants}
                    >
                        <motion.div
                            variants={itemVariants}
                            className={`p-8 rounded-2xl border ${isDarkMode ? "bg-gray-800/50 border-gray-700 backdrop-blur-sm" : "bg-gray-50/80 border-gray-200 backdrop-blur-sm"}`}
                        >
                            <h3 className='text-2xl font-medium mb-8'>Send me a message</h3>

                            <form onSubmit={handleSubmit} className='space-y-6'>
                                <div className='grid md:grid-cols-2 gap-6'>
                                    <TextInput
                                        isDarkMode={isDarkMode}
                                        value={formData.name}
                                        handleInputChange={(text) => handleInputChange("name", text)}
                                        label="Your Name"
                                    />

                                    <TextInput
                                        isDarkMode={isDarkMode}
                                        value={formData.email}
                                        handleInputChange={(text) => handleInputChange("email", text)}
                                        label="Email Address"
                                    />
                                </div>

                                <TextInput
                                    isDarkMode={isDarkMode}
                                    value={formData.message}
                                    handleInputChange={(text) => handleInputChange("message", text)}
                                    label="Your message"
                                    textarea
                                />

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ y: -2, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className='w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white py-4 rounded-xl text-sm uppercase tracking-wider font-medium transition-all duration-200 flex items-center justify-center space-x-2'
                                >
                                    {isSubmitting ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{
                                                    duration: 1,
                                                    repeat: Infinity,
                                                    ease: "linear"
                                                }}
                                                className='w-4 h-4 border-2 border-white border-t-transparent rounded-full'
                                            />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </motion.button>
                            </form>

                        </motion.div>
                    </motion.div>

                    {/* contact info social links */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={containerVariants}
                        className="space-y-8"
                    >
                        <motion.div variants={itemVariants}>
                            <h3 className='text-2xl font-medium mb-6'>Contact Information</h3>
                            <div className='space-y-4'>
                                {CONTACT_INFO.map((info, index) => (
                                    <motion.div
                                        key={info.label}
                                        variants={itemVariants}
                                        whileHover={{ x: 4 }}
                                        className={`flex items-center space-x-4 p-4 rounded-xl ${isDarkMode ? "bg-gray-800/30 hover:bg-gray-800/50" : "bg-gray-200/50 hover:bg-gray-300/50"} transition-all duration-200`}
                                    >
                                        <div className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
                                            <info.icon size={20} className='text-blue-500' />
                                        </div>
                                        <div className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>
                                            {info.label}
                                        </div>
                                        <div className={`font-medium`}>
                                            {info.value}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* social links */}
                        <motion.div variants={itemVariants}>
                            <h3 className='text-xl font-medium mb-6'>Follow Me</h3>
                            <div className='grid grid-cols-2 gap-4'>
                                {SOCIAL_LINKS.map((social) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.url}
                                        target='_blank'
                                        rel='noopener noopener'
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`flex items-center space-x-3 p-4 rounded-xl border transition-all duration-200
                                            ${isDarkMode
                                                ? "bg-gray-800/50 border-gray-700 hover:border-gray-600"
                                                : "bg-white/80 border-gray-200 hover:border-gray-300"} ${social.bgColor} ${social.color}`}
                                    >
                                        <social.icon size={20} />
                                        <span className='font-medium'>{social.name}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Availability status */}
                        <motion.div
                            variants={itemVariants}
                            className={`p-6 rounded-xl border ${isDarkMode ? "bg-green-500/10 border-green-500/20" : "bg-green-50 border-green-200"}`}
                        >
                            <div className='flex items-center space-x-3 mb-2'>
                                <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse' />
                                <span className='font-medium text-green-600'>Available for work</span>
                            </div>
                            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                I'm currently available for freelance projects and full-time opportunities.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <SuccessModal showSuccess={showSuccess} setShowSuccess={setShowSuccess} isDarkMode={isDarkMode} />
        </section>
    )
}
