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

    // Check if form is valid (all fields filled)
    const isFormValid = formData.name.trim() && formData.email.trim() && formData.message.trim()

    const handleInputChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Don't submit if form is not valid
        if (!isFormValid) return

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
            className={`py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 ${isDarkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"} relative overflow-hidden`}
        >
            {/* background element */}
            <motion.div style={{ y }} className='absolute inset-0 overflow-hidden'>
                <div className={`absolute top-10 sm:top-20 left-1/4 w-48 h-48 sm:w-72 sm:h-72 rounded-full blur-3xl opacity-5 ${isDarkMode ? "bg-blue-500" : "bg-blue-400"}`} />
                <div className={`absolute bottom-20 sm:bottom-40 right-1/4 w-56 h-56 sm:w-80 sm:h-80 rounded-full blur-3xl opacity-5 ${isDarkMode ? "bg-purple-500" : "bg-purple-400"}`} />
            </motion.div>

            {/* Section header */}
            <div className='max-w-7xl relative z-10 mx-auto'>
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className='text-center mb-12 sm:mb-16 lg:mb-20'
                >
                    <motion.div variants={itemVariants} className={`text-xs sm:text-sm uppercase tracking-widest ${isDarkMode ? "text-gray-500" : "text-gray-600"} mb-3 sm:mb-4`}>
                        Let's Connect
                    </motion.div>

                    <motion.h2
                        variants={itemVariants}
                        className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light mb-4 sm:mb-6 px-2'
                    >
                        Get in
                        <span className='text-blue-500 font-medium'> Touch</span>
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className={`text-base sm:text-lg lg:text-xl max-w-xs sm:max-w-lg lg:max-w-2xl mx-auto px-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                        Ready to start your next project? Let's discuss how we can bring
                        your ideas to life.
                    </motion.p>
                </motion.div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start'>
                    {/* contact form */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={containerVariants}
                        className="order-1"
                    >
                        <motion.div
                            variants={itemVariants}
                            className={`p-4 sm:p-6 lg:p-8 rounded-2xl border ${isDarkMode ? "bg-gray-800/50 border-gray-700 backdrop-blur-sm" : "bg-gray-50/80 border-gray-200 backdrop-blur-sm"}`}
                        >
                            <h3 className='text-xl sm:text-2xl font-medium mb-6 sm:mb-8'>Send me a message</h3>

                            <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-6'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
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
                                    disabled={isSubmitting || !isFormValid}
                                    whileHover={isFormValid ? { y: -2, scale: 1.02 } : {}}
                                    whileTap={isFormValid ? { scale: 0.98 } : {}}
                                    className={`w-full py-3 sm:py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${isFormValid && !isSubmitting
                                        ? 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
                                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                        }`}
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
                                                className='w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full'
                                            />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
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
                        className="order-2"
                    >
                        {/* contact information */}
                        <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
                            <h3 className='text-xl sm:text-2xl font-medium mb-4 sm:mb-6'>Contact Information</h3>
                            <div className='space-y-3 sm:space-y-4'>
                                {CONTACT_INFO.map((info, index) => (
                                    <motion.div
                                        key={info.label}
                                        variants={itemVariants}
                                        whileHover={{ x: 4 }}
                                        className={`flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl ${isDarkMode ? "bg-gray-800/30 hover:bg-gray-800/50" : "bg-gray-200/50 hover:bg-gray-300/50"} transition-all duration-200`}
                                    >
                                        <div className={`p-2 sm:p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-white"} flex-shrink-0`}>
                                            <info.icon size={16} className='sm:w-5 sm:h-5 text-blue-500' />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className={`text-xs sm:text-sm ${isDarkMode ? "text-gray-500" : "text-gray-600"} mb-1`}>
                                                {info.label}
                                            </div>
                                            <div className={`font-medium text-sm sm:text-base break-words`}>
                                                {info.value}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>



                        {/* social links - now at the bottom */}
                        <motion.div variants={itemVariants}>
                            <h3 className='text-lg sm:text-xl font-medium mb-4 sm:mb-6'>Follow Me</h3>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                                {SOCIAL_LINKS.map((social) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`flex items-center space-x-3 p-3 sm:p-4 rounded-xl border transition-all duration-200
                                            ${isDarkMode
                                                ? "bg-gray-800/50 border-gray-700 hover:border-gray-600"
                                                : "bg-white/80 border-gray-200 hover:border-gray-300"} ${social.bgColor} ${social.color}`}
                                    >
                                        <social.icon size={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
                                        <span className='font-medium text-sm sm:text-base'>{social.name}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Availability status */}
                        <motion.div
                            variants={itemVariants}
                            className={`p-4 mt-5 sm:p-6 rounded-xl border mb-6 sm:mb-8 lg:mb-8 ${isDarkMode ? "bg-green-500/10 border-green-500/20" : "bg-green-50 border-green-200"}`}
                        >
                            <div className='flex items-center space-x-3 mb-2'>
                                <div className='w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse flex-shrink-0' />
                                <span className='font-medium text-green-600 text-sm sm:text-base'>Available for work</span>
                            </div>
                            <p className={`text-xs sm:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
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