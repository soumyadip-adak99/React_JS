import { RiMap2Line, RiUser3Line, RiMailLine, RiBook2Line, RiSendPlaneLine } from "react-icons/ri";
import './contact.css';
import { useState } from "react";
import emailjs from '@emailjs/browser';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const sendEmail = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            setMessageColor('color-red');
            setFeedbackMessage('Please fill in all the input fields.');

            setTimeout(() => setFeedbackMessage(''), 3000);
            return;
        }

        setIsLoading(true);
        emailjs.sendForm('service_4e99jc1', 'template_eobzool', e.target, '8rGQ5Vx8_FKWoZMtZ')
            .then(() => {
                setMessageColor('color-first');
                setFeedbackMessage('Message sent successfully!');
                setIsLoading(false);

                setTimeout(() => setFeedbackMessage(''), 3000);
                setFormData({ name: '', email: '', subject: '', message: '' });
            })
            .catch((error) => {
                setIsLoading(false);
                alert('Oops! Something went wrong.', error);
            });
    };

    return (
        <section className="contact section">
            <h2 className="section-title">Contact <span>Me</span></h2>

            <div className="contact-container container grid">
                <div className="contact-content grid">

                    <div className="contact-card">
                        <span className="contact-icon"><RiMap2Line /></span>
                        <div>
                            <h3 className="contact-title">Address</h3>
                            <p className="contact-data">Tamluk, West Bengal, India</p>
                        </div>
                    </div>

                    <div className="contact-card">
                        <span className="contact-icon"><RiUser3Line /></span>
                        <div>
                            <h3 className="contact-title">Freelance</h3>
                            <p className="contact-data">Available Right Now</p>
                        </div>
                    </div>

                    <div className="contact-card">
                        <span className="contact-icon"><RiMailLine /></span>
                        <div>
                            <h3 className="contact-title">Email</h3>
                            <p className="contact-data">soumyadipadakmailbox@gmail.com</p>
                        </div>
                    </div>

                    <div className="contact-card">
                        <span className="contact-icon"><RiBook2Line /></span>
                        <div>
                            <h3 className="contact-title">Phone</h3>
                            <p className="contact-data">+91 79943-92940</p>
                        </div>
                    </div>

                </div>

                <form className="contact-form grid" onSubmit={sendEmail}>
                    <div className="contact-form-group grid">

                        <div className="contact-form-div">
                            <label htmlFor="name" className="contact-form-label">
                                Your Full Name <b>*</b>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={handleChange}
                                value={formData.name}
                                className="contact-form-input"
                            />
                        </div>

                        <div className="contact-form-div">
                            <label htmlFor="email" className="contact-form-label">
                                Your Email Address <b>*</b>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={handleChange}
                                value={formData.email}
                                className="contact-form-input"
                            />
                        </div>

                        <div className="contact-form-div">
                            <label htmlFor="subject" className="contact-form-label">
                                Your Subject <b>*</b>
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                onChange={handleChange}
                                value={formData.subject}
                                className="contact-form-input"
                            />
                        </div>

                        <div className="contact-form-div">
                            <label htmlFor="message" className="contact-form-label">
                                Your Message <b>*</b>
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                onChange={handleChange}
                                value={formData.message}
                                className="contact-form-input contact-form-area"
                            ></textarea>
                        </div>

                        <div className="contact-button">
                            <button type="submit" className="button" disabled={isLoading}>
                                {isLoading ? 'Sending...' : 'Send Message'}
                                <span className="button-icon">
                                    <RiSendPlaneLine />
                                </span>
                            </button>
                        </div>

                    </div>

                    {feedbackMessage && (
                        <p className={`contact-message ${messageColor}`}>
                            {feedbackMessage}
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
};

export default Contact;