import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

function Login() {
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const [isShowRagistration, setIsShowRagistration] = useState(false)

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const x = clientX / window.innerWidth;
            const y = clientY / window.innerHeight;

            setMousePos({ x, y });

            document.documentElement.style.setProperty('--mouse-x', x);
            document.documentElement.style.setProperty('--mouse-y', y);

            const cursorFollower = document.querySelector('.cursor-follower');
            if (cursorFollower) {
                cursorFollower.style.transform = `translate(${clientX - 128}px, ${clientY - 128}px)`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);


    const handleChangeFrom = () => {
        setIsShowRagistration((prev) => !prev)
        console.log(isShowRagistration)
    }

    return (
        <div className="min-h-screen bg-black relative ">
            {/* Background elements */}
            <div className="cursor-follower fixed w-64 h-64 rounded-full pointer-events-none transition-transform duration-300 ease-out z-0"
                style={{
                    background: 'radial-gradient(circle, rgba(219,2,172,0.08) 0%, rgba(219,2,172,0.02) 50%, transparent 70%)',
                    filter: 'blur(40px)'
                }} />

            <div className="fixed inset-0 pointer-events-none opacity-5 animate-pulse"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                    animationDuration: '4s'
                }} />

            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-0 left-0 w-full h-full transition-all duration-1000 ease-out"
                    style={{
                        background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(219,2,172,0.06) 0%, rgba(219,2,172,0.02) 40%, transparent 70%)`
                    }}
                />
                <div
                    className="absolute top-0 left-0 w-full h-full transition-all duration-1200 ease-out"
                    style={{
                        background: `radial-gradient(circle at ${(1 - mousePos.x) * 100}% ${(1 - mousePos.y) * 100}%, rgba(1,26,189,0.04) 0%, rgba(67,56,202,0.02) 40%, transparent 70%)`
                    }}
                />
                <div
                    className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5 transition-all duration-2000 ease-out"
                    style={{
                        background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                        transform: `translate(${mousePos.x * 50}px, ${mousePos.y * 50}px)`
                    }}
                />
            </div>

            {/* Main content */}
            <div className="fixed top-0 left-0 right-0 py-4 bg-black/30 backdrop-blur-sm z-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center md:justify-start">
                        <Link to={"/"}>
                            <h2 className="text-white text-3xl font-bold tracking-tight">
                                CodeScribe
                                <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-pulse">
                                    AI
                                </span>
                            </h2>
                        </Link>

                    </div>
                </div>
            </div>

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
                                <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300" onClick={handleChangeFrom}>
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;