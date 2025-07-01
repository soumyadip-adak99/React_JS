export default function Cards() {
    return (
        <>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text">
                Explore Blogs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div data-aos="fade-left" className="group relative overflow-hidden rounded-2xl border border-gray-800/50 hover:border-indigo-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/20">
                    <div className="h-80 w-full overflow-hidden">
                        <img
                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            src="https://i.pinimg.com/736x/4c/78/3a/4c783a3af9cba10e85f7e7b148b4503b.jpg"
                            alt="Beauty Blog"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 group-hover:from-black/80 group-hover:via-black/70 group-hover:to-black/90 transition-all duration-500">
                        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-6 text-center">
                            <div className="w-full transform translate-y-6 group-hover:translate-y-0 transition-all duration-500">
                                <h3 className="text-2xl font-bold text-white mb-2">Beauty & Wellness</h3>
                                <p className="text-gray-300 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    Discover the latest trends in beauty and self-care with our expertly curated content.
                                </p>
                                <div className="flex justify-center">
                                    <button className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform group-hover:scale-105 shadow-lg shadow-indigo-500/20 cursor-pointer">
                                        Explore
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div data-aos="fade-left" className="group relative overflow-hidden rounded-2xl border border-gray-800/50 hover:border-pink-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-pink-500/20">
                    <div className="h-80 w-full overflow-hidden">
                        <img
                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                            alt="Tech Blog"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 group-hover:from-black/80 group-hover:via-black/70 group-hover:to-black/90 transition-all duration-500">
                        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-6 text-center">
                            <div className="w-full transform translate-y-6 group-hover:translate-y-0 transition-all duration-500">
                                <h3 className="text-2xl font-bold text-white mb-2">Tech Innovations</h3>
                                <p className="text-gray-300 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    Cutting-edge technology insights and reviews for the modern digital enthusiast.
                                </p>
                                <div className="flex justify-center">
                                    <button className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform group-hover:scale-105 shadow-lg shadow-pink-500/20 cursor-pointer">
                                        Explore
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 3 */}
                <div data-aos='fade-left' className="group relative overflow-hidden rounded-2xl border border-gray-800/50 hover:border-emerald-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-500/20">
                    <div className="h-80 w-full overflow-hidden">
                        <img
                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
                            alt="Food Blog"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 group-hover:from-black/80 group-hover:via-black/70 group-hover:to-black/90 transition-all duration-500">
                        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-6 text-center">
                            <div className="w-full transform translate-y-6 group-hover:translate-y-0 transition-all duration-500">
                                <h3 className="text-2xl font-bold text-white mb-2">Culinary Delights</h3>
                                <p className="text-gray-300 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    Mouth-watering recipes and culinary adventures from around the world.
                                </p>
                                <div className="flex justify-center">
                                    <button className="px-5 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform group-hover:scale-105 shadow-lg shadow-emerald-500/20 cursor-pointer">
                                        Explore
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
