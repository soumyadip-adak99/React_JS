import React, { useState, useEffect } from 'react';
import {
    RiThumbUpLine,
    RiThumbUpFill,
    RiChat3Line,
    RiShareForwardLine,
    RiBookmarkLine,
    RiBookmarkFill,
    RiTimeLine,
    RiVerifiedBadgeFill,
    RiMoreFill,
    RiFireLine,
    RiStarLine,
    RiGridLine,
    RiListUnordered
} from 'react-icons/ri';

function UserHome() {
    const [likedPosts, setLikedPosts] = useState(new Set());
    const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());
    const [randomizedData, setRandomizedData] = useState([]);

    const demoData = [
        {
            "id": "60c72b2f9b1e8b001c8e4d1a",
            "title": "The Future of AI in Content Creation",
            "authorName": "Jane Doe",
            "content": "Artificial intelligence is rapidly transforming the landscape of content creation, offering new tools and possibilities for writers, marketers, and artists. From automated article generation to AI-powered design, the impact is undeniable.",
            "authorProfileImage": {
                "id": "profile-jane-doe",
                "url": "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            },
            "image": {
                "id": "ai-content-image",
                "url": "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            },
            "create_at": "2024-07-18T17:30:00",
            "isAiApproved": true,
            "status": "PUBLISHED",
            "likes": 142,
            "comments": 23,
            "shares": 18,
            "views": 1250,
            "category": "Technology"
        },
        {
            "id": "60c72b2f9b1e8b001c8e4d1b",
            "title": "Understanding Quantum Computing Basics",
            "authorName": "John Smith",
            "content": "Quantum computing is a new type of computing that harnesses the phenomena of quantum mechanics, such as superposition and entanglement, to perform computations. Unlike classical computers that use bits, quantum computers use qubits.",
            "authorProfileImage": {
                "id": "profile-john-smith",
                "url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            },
            "image": {
                "id": "quantum-computing-image",
                "url": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            },
            "create_at": "2024-07-17T10:15:00",
            "isAiApproved": false,
            "status": "PENDING_APPROVAL",
            "likes": 89,
            "comments": 12,
            "shares": 5,
            "views": 890,
            "category": "Science"
        },
        {
            "id": "60c72b2f9b1e8b001c8e4d1c",
            "title": "Exploring the Depths of Oceanography",
            "authorName": "Alice Brown",
            "content": "Oceanography is the study of the physical and biological aspects of the ocean. It covers a wide range of topics, including marine life, ecosystems, currents, waves, and the geology of the seafloor.",
            "authorProfileImage": {
                "id": "profile-alice-brown",
                "url": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            },
            "image": {
                "id": "oceanography-image",
                "url": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            },
            "create_at": "2024-07-16T09:00:00",
            "isAiApproved": true,
            "status": "PUBLISHED",
            "likes": 267,
            "comments": 34,
            "shares": 28,
            "views": 2100,
            "category": "Science"
        },
        {
            "id": "60c72b2f9b1e8b001c8e4d1d",
            "title": "The Art of Sustainable Living",
            "authorName": "Robert Green",
            "content": "Sustainable living involves reducing one's personal and societal environmental impact. This includes making conscious choices about energy consumption, waste reduction, and supporting eco-friendly practices.",
            "authorProfileImage": {
                "id": "profile-robert-green",
                "url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            },
            "image": {
                "id": "sustainable-living-image",
                "url": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            },
            "create_at": "2024-07-15T14:45:00",
            "isAiApproved": true,
            "status": "PUBLISHED",
            "likes": 198,
            "comments": 19,
            "shares": 35,
            "views": 1580,
            "category": "Lifestyle"
        }
    ];

    useEffect(() => {
        const shuffled = [...demoData].sort(() => Math.random() - 0.5);
        setRandomizedData(shuffled);
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return '1 day ago';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return `${Math.floor(diffDays / 30)} months ago`;
    };

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const handleLike = (postId) => {
        setLikedPosts(prev => {
            const newLiked = new Set(prev);
            if (newLiked.has(postId)) {
                newLiked.delete(postId);
            } else {
                newLiked.add(postId);
            }
            return newLiked;
        });
    };

    const handleBookmark = (postId) => {
        setBookmarkedPosts(prev => {
            const newBookmarked = new Set(prev);
            if (newBookmarked.has(postId)) {
                newBookmarked.delete(postId);
            } else {
                newBookmarked.add(postId);
            }
            return newBookmarked;
        });
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'PUBLISHED':
                return <span className="bg-emerald-500/20 text-emerald-400 text-xs font-medium px-2 py-1 rounded-full border border-emerald-500/30">Published</span>;
            case 'DRAFT':
                return <span className="bg-amber-500/20 text-amber-400 text-xs font-medium px-2 py-1 rounded-full border border-amber-500/30">Draft</span>;
            case 'PENDING_APPROVAL':
                return <span className="bg-blue-500/20 text-blue-400 text-xs font-medium px-2 py-1 rounded-full border border-blue-500/30">Pending</span>;
            default:
                return null;
        }
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Technology': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
            'Science': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
            'Lifestyle': 'bg-green-500/20 text-green-400 border-green-500/30',
            'Art': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
            'Social': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
            'Health': 'bg-red-500/20 text-red-400 border-red-500/30',
            'Food': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
            'Gaming': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
        };
        return colors[category] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    };

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100">
            {/* Header */}
            {/* <header className="sticky top-0 z-10 bg-gray-800 shadow-lg">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Knowledge Nexus
                        </h1>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setViewLayout(viewLayout === 'grid' ? 'list' : 'grid')}
                                className="p-2 rounded-full hover:bg-gray-700 text-gray-300 transition-colors"
                            >
                                {viewLayout === 'grid' ? <RiListUnordered size={20} /> : <RiGridLine size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
            </header> */}

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Featured Posts */}
                {/* <section className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-100">Featured Articles</h2>
                        <div className="flex items-center space-x-2">
                            <RiFireLine className="text-orange-400" />
                            <RiStarLine className="text-yellow-400" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {randomizedData.slice(0, 3).map(post => (
                            <article key={post.id} className="bg-gray-900/95 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-700">
                                <div className="relative">
                                    <img
                                        src={post.image.url}
                                        alt={post.title}
                                        className="w-full h-48 object-cover"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-3 right-3">
                                        {getStatusBadge(post.status)}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(post.category)}`}>
                                            {post.category}
                                        </span>
                                        <div className="flex items-center text-xs text-gray-400">
                                            <RiTimeLine className="mr-1" />
                                            {formatDate(post.create_at)}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 line-clamp-2 text-gray-100">{post.title}</h3>
                                    <p className="text-gray-400 mb-4 line-clamp-3">{post.content}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <img
                                                src={post.authorProfileImage.url}
                                                alt={post.authorName}
                                                className="w-8 h-8 rounded-full mr-2 object-cover border border-gray-600"
                                            />
                                            <span className="text-sm font-medium text-gray-300">{post.authorName}</span>
                                            {post.isAiApproved && <RiVerifiedBadgeFill className="ml-1 text-blue-400" />}
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handleLike(post.id)}
                                                className="flex items-center text-sm text-gray-400 hover:text-blue-400 transition-colors"
                                            >
                                                {likedPosts.has(post.id) ? (
                                                    <RiThumbUpFill className="text-blue-400 mr-1" />
                                                ) : (
                                                    <RiThumbUpLine className="mr-1" />
                                                )}
                                                {formatNumber(post.likes + (likedPosts.has(post.id) ? 1 : 0))}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section> */}

                {/* All Posts */}
                <section>
                    <div className="space-y-6">
                        {randomizedData.map(post => (
                            <article key={post.id} className="bg-gray-900/50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-700">
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/3 relative">
                                        <img
                                            src={post.image.url}
                                            alt={post.title}
                                            className="w-full h-48 md:h-full object-cover"
                                            loading="lazy"
                                        />
                                        <div className="absolute top-3 right-3">
                                            {getStatusBadge(post.status)}
                                        </div>
                                    </div>
                                    <div className="md:w-2/3 p-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(post.category)}`}>
                                                {post.category}
                                            </span>
                                            <div className="flex items-center text-xs text-gray-400">
                                                <RiTimeLine className="mr-1" />
                                                {formatDate(post.create_at)}
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 text-gray-100">{post.title}</h3>
                                        <p className="text-gray-400 mb-4">{post.content}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <img
                                                    src={post.authorProfileImage.url}
                                                    alt={post.authorName}
                                                    className="w-8 h-8 rounded-full mr-2 object-cover border border-gray-600"
                                                />
                                                <span className="text-sm font-medium text-gray-300">{post.authorName}</span>
                                                {post.isAiApproved && <RiVerifiedBadgeFill className="ml-1 text-blue-400" />}
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <button
                                                    onClick={() => handleLike(post.id)}
                                                    className="flex items-center text-sm text-gray-400 hover:text-blue-400 transition-colors"
                                                >
                                                    {likedPosts.has(post.id) ? (
                                                        <RiThumbUpFill className="text-blue-400 mr-1" />
                                                    ) : (
                                                        <RiThumbUpLine className="mr-1" />
                                                    )}
                                                    {formatNumber(post.likes + (likedPosts.has(post.id) ? 1 : 0))}
                                                </button>
                                                <button className="flex items-center text-sm text-gray-400 hover:text-green-400 transition-colors">
                                                    <RiChat3Line className="mr-1" />
                                                    {formatNumber(post.comments)}
                                                </button>
                                                <button className="flex items-center text-sm text-gray-400 hover:text-purple-400 transition-colors">
                                                    <RiShareForwardLine className="mr-1" />
                                                    {formatNumber(post.shares)}
                                                </button>
                                                <button
                                                    onClick={() => handleBookmark(post.id)}
                                                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                                                >
                                                    {bookmarkedPosts.has(post.id) ? (
                                                        <RiBookmarkFill className="text-yellow-400" />
                                                    ) : (
                                                        <RiBookmarkLine />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                </section>
            </main>
        </div>
    );
}

export default UserHome;