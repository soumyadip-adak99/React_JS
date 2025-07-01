import { useState, useEffect } from "react";
import { FaArrowRight, FaMobileAlt, FaEnvelope, FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import Animation from "../animation/Animation";
import LandingHeader from "./LandingHeader";
import toast from "react-hot-toast";

function Register() {
    const [otpSent, setOtpSent] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        mobile: '',
        otp: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage('')
            }, 3000)

            return () => clearTimeout(timer)
        }

    }, [errorMessage])

    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSendOtp = () => {
        if (!formData.mobile) {
            setErrorMessage('Enter mobile number.')
            return;
        }
        setOtpSent(true);
        setCountdown(30);
        toast.success(`OTP sent to ${formData.mobile}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!otpSent || !formData.otp) {
            alert("Please verify your mobile number with OTP");
            return;
        }
        alert("Registration successful!");
    };

    return (

        <div className="min-h-screen bg-black relative overflow-hidden">

            {/* bakground animation */}
            <Animation />

            {/* main content */}
            <LandingHeader />

            <div className="flex items-center justify-center min-h-screen relative z-10 px-4 py-12">
                <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-900/50 backdrop-blur-lg border border-gray-600/50 rounded-2xl p-8 shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all duration-500 mt-9">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text">
                        Create Account
                    </h2>

                    <div className="space-y-5">
                        {/* name fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-300 mb-1.5 ml-1 text-sm font-medium">First Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                        <FaUser className="text-gray-400 text-sm" />
                                    </div>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="First name"
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-1.5 ml-1 text-sm font-medium">Last Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                        <FaUser className="text-gray-400 text-sm" />
                                    </div>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Last name"
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* email field */}
                        <div>
                            <label className="block text-gray-300 mb-1.5 ml-1 text-sm font-medium">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                    <FaEnvelope className="text-gray-400 text-sm" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                    required
                                />
                            </div>
                        </div>

                        {/* password field */}
                        <div>
                            <label className="block text-gray-300 mb-1.5 ml-1 text-sm font-medium">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                    <FaLock className="text-gray-400 text-sm" />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                    required
                                />
                            </div>
                        </div>

                        {/* mobile number field */}
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-2 text-sm font-medium">
                                Mobile Number
                            </label>

                            {/* input fields */}
                            <div className="flex flex-col sm:flex-row gap-3 w-full">
                                {/* input sections */}
                                <div className="relative flex-grow w-full">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <FaMobileAlt className="text-gray-400 text-sm" />
                                    </div>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        placeholder="Enter mobile number"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-800/70 border border-gray-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                        required
                                    />
                                </div>

                                {/* OTP button */}
                                <button
                                    type="button"
                                    onClick={handleSendOtp}
                                    disabled={countdown > 0}
                                    className={`flex-shrink-0 w-full sm:w-auto py-3 px-4 rounded-lg font-medium text-sm transition-all duration-300 ${countdown > 0
                                        ? 'bg-gray-700/80 text-gray-400 cursor-not-allowed'
                                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-indigo-500/30'
                                        }`}
                                >
                                    {countdown > 0 ? `Resend in ${countdown}s` : 'Send OTP'}
                                </button>
                            </div>

                            {/*error message*/}
                            {errorMessage && (
                                <p className="mt-1.5 text-red-400 text-xs animate-fadeIn">
                                    {errorMessage}
                                </p>
                            )}
                        </div>


                        {/* OTP field */}
                        {otpSent && (
                            <div>
                                <label className="block text-gray-300 mb-1.5 ml-1 text-sm font-medium">OTP Verification</label>
                                <input
                                    type="text"
                                    name="otp"
                                    value={formData.otp}
                                    onChange={handleChange}
                                    placeholder="Enter 6-digit OTP"
                                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                    required
                                />
                            </div>
                        )}

                        {/* register button */}
                        <button
                            type="submit"
                            className="w-full relative group bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium cursor-pointer transition-all duration-300 hover:from-indigo-600 hover:to-purple-700 transform-gpu hover:shadow-[0_10px_20px_-5px_rgba(124,58,237,0.4)] hover:-translate-y-1 active:scale-95 mt-2"
                        >
                            <span className="relative z-10 flex items-center justify-center">
                                Register
                                <FaArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                        </button>

                        {/* login link */}
                        <div className="text-center pt-1">
                            <p className="text-gray-400 text-sm">
                                Already have an account?{' '}
                                <Link to="/auth/sing-in" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300 font-medium">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;