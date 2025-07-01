import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";
import Animation from "../animation/Animation";
import LandingHeader from "./LandingHeader";

function Login() {
    const [isShowRagistration, setIsShowRagistration] = useState(false)

    const handleChangeFrom = () => {
        setIsShowRagistration((prev) => !prev)
        console.log(isShowRagistration)
    }

    return (
        <div className="min-h-screen bg-black relative ">
            {/* Background elements */}
            <Animation />

            {/* main content */}

            {/* navbar */}
            <LandingHeader />

            <div className="flex items-center justify-center min-h-screen relative z-10 px-4">

                <form className="w-full max-w-md bg-gray-900/50 backdrop-blur-lg border border-gray-600/50 rounded-2xl p-8 shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all duration-500">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text">
                        Welcome Back
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-gray-300 mb-2 ml-1 text-sm font-medium">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 mb-2 ml-1 text-sm font-medium">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full relative group bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium cursor-pointer transition-all duration-300 hover:from-indigo-600 hover:to-purple-700 transform-gpu hover:shadow-[0_10px_20px_-5px_rgba(124,58,237,0.4)] hover:-translate-y-1 active:scale-95"
                        >
                            <span className="relative z-10 flex items-center justify-center">
                                Sign In
                                <FaArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                        </button>

                        {/*  */}
                        <div className="text-center pt-4">
                            <a href="#" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors duration-300">
                                Forgot password?
                            </a>
                            <p className="text-gray-500 text-sm mt-4">
                                Don't have an account?{' '}
                                <Link to={'/auth/registration'} className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300" onClick={handleChangeFrom}>
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;