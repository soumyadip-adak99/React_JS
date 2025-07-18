import React, { useState, useEffect } from 'react';
import {
    RiUserLine,
    RiMailLine,
    RiCalendarLine,
    RiEditLine,
    RiBookmarkLine,
    RiThumbUpLine,
    RiChat3Line,
    RiShareForwardLine,
    RiMoreFill,
    RiCheckboxCircleFill,
    RiGlobalLine,
    RiStarLine,
    RiTrophyLine,
    RiCodeSSlashLine,
    RiArticleLine,
    RiHeartLine,
    RiVerifiedBadgeFill
} from 'react-icons/ri';
import { useAuth } from '../../../context/AuthContext';
import { useParams } from 'react-router-dom';

function Profile() {
    const { user } = useAuth();
    const { userId } = useParams(user?.id);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({
        firstname: '',
        lastName: '',
        email: '',
        bio: ''
    });

    // Mock user data - in a real app, you'd fetch this based on userId
    const [currentUser, setCurrentUser] = useState({
        id: userId || "user_001",
        firstname: user?.firstname || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        joinDate: "2023-01-15",
        profileImage: null,
        bio: "Senior Software Engineer | Spring Boot Expert | Microservices Architect | Tech Blogger",
        stats: {
            posts: 156,
            followers: 2847,
            following: 892,
            views: 125000
        },
        demoData: [
            {
                "id": "blog_001",
                "title": "Getting Started with Spring Boot",
                "authorName": "Alice Johnson",
                "content": "Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can 'just run'. In this tutorial, we'll cover the basics of setting up a Spring Boot project, including dependency management, auto-configuration, and building RESTful APIs. We'll also explore the embedded server capabilities that make deployment a breeze.",
                "image": null,
                "created_at": "2023-05-15T10:30:00",
                "isAiApproved": true,
                "status": "PUBLISHED",
                "likes": 124,
                "comments": 28,
                "shares": 15
            },
            {
                "id": "blog_002",
                "title": "Advanced Spring Security Techniques",
                "authorName": "Alice Johnson",
                "content": "Security is a crucial aspect of any application. This post dives deep into Spring Security configurations, OAuth2 implementation, and JWT token management for robust authentication. We'll explore role-based access control, method security, and best practices for securing your microservices architecture.",
                "image": {
                    "img_002": "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                },
                "created_at": "2023-06-22T14:45:00",
                "isAiApproved": true,
                "status": "PUBLISHED",
                "likes": 89,
                "comments": 14,
                "shares": 7
            },
            {
                "id": "blog_003",
                "title": "Microservices Architecture Patterns",
                "authorName": "Alice Johnson",
                "content": "Exploring different microservices patterns including API Gateway, Service Discovery, Circuit Breaker, and how to implement them using Spring Cloud. This comprehensive guide covers service-to-service communication strategies, distributed tracing, and container orchestration considerations.",
                "image": {
                    "img_003": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                    "img_004": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                },
                "created_at": "2023-07-10T09:15:00",
                "isAiApproved": false,
                "status": "DRAFT",
                "likes": 0,
                "comments": 0,
                "shares": 0
            }
        ]
    });

    useEffect(() => {
        setEditedUser({
            firstname: currentUser.firstname,
            lastName: currentUser.lastName,
            email: currentUser.email,
            bio: currentUser.bio
        });
    }, [currentUser]);

    const [activeTab, setActiveTab] = useState('posts');
    const demoData = currentUser.demoData;
    const name = `${currentUser.firstname} ${currentUser.lastName}`;

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        setCurrentUser(prev => ({
            ...prev,
            ...editedUser
        }));
        setIsEditing(false);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formatDateTime = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'PUBLISHED':
                return <span className="bg-emerald-500/20 text-emerald-400 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5 border border-emerald-500/30">
                    <RiCheckboxCircleFill className="w-3 h-3" /> Published
                </span>;
            case 'DRAFT':
                return <span className="bg-amber-500/20 text-amber-400 text-xs font-medium px-3 py-1 rounded-full border border-amber-500/30">
                    Draft
                </span>;
            default:
                return <span className="bg-gray-500/20 text-gray-400 text-xs font-medium px-3 py-1 rounded-full border border-gray-500/30">
                    {status}
                </span>;
        }
    };

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    const tabs = [
        { id: 'posts', label: 'Posts', icon: RiArticleLine },
        { id: 'about', label: 'About', icon: RiUserLine },
        { id: 'activity', label: 'Activity', icon: RiTrophyLine }
    ];

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100">
            {/* Header Background */}
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 h-48 md:h-64">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-950/30"></div>
            </div>

            {/* Profile Container */}
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Profile Header */}
                <div className="relative -mt-20 md:-mt-32 pb-8">
                    <div className="bg-gray-900/95 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 md:p-8 shadow-2xl">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                            {/* Profile Picture */}
                            <div className="relative">
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl md:text-4xl font-bold text-white shadow-lg">
                                    {currentUser.firstname?.[0]}{currentUser.lastName?.[0]}
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-1.5 border-2 border-gray-900">
                                    <RiVerifiedBadgeFill className="w-4 h-4 text-white" />
                                </div>
                            </div>

                            {/* Profile Info */}
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                                    <div>
                                        {isEditing ? (
                                            <div className="space-y-3">
                                                <input
                                                    type="text"
                                                    name="firstname"
                                                    value={editedUser.firstname}
                                                    onChange={handleInputChange}
                                                    className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                                                />
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    value={editedUser.lastName}
                                                    onChange={handleInputChange}
                                                    className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                                                />
                                            </div>
                                        ) : (
                                            <>
                                                <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                                                    {currentUser.firstname} {currentUser.lastName}
                                                </h1>
                                                <p className="text-gray-400 flex items-center gap-2 mt-1">
                                                    <RiMailLine className="w-4 h-4" />
                                                    {currentUser.email}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                    {isEditing ? (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleSave}
                                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={handleEditToggle}
                                                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={handleEditToggle}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg"
                                        >
                                            <RiEditLine className="w-4 h-4" />
                                            Edit Profile
                                        </button>
                                    )}
                                </div>

                                {isEditing ? (
                                    <textarea
                                        name="bio"
                                        value={editedUser.bio}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white mb-6"
                                        rows="3"
                                    />
                                ) : (
                                    <p className="text-gray-300 mb-6 text-sm md:text-base leading-relaxed">
                                        {currentUser.bio}
                                    </p>
                                )}

                                {/* Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-gray-800/50 rounded-lg p-3 text-center border border-gray-700">
                                        <div className="text-xl md:text-2xl font-bold text-white">
                                            {formatNumber(currentUser.stats.posts)}
                                        </div>
                                        <div className="text-xs text-gray-400">Posts</div>
                                    </div>
                                    <div className="bg-gray-800/50 rounded-lg p-3 text-center border border-gray-700">
                                        <div className="text-xl md:text-2xl font-bold text-white">
                                            {formatNumber(currentUser.stats.followers)}
                                        </div>
                                        <div className="text-xs text-gray-400">Followers</div>
                                    </div>
                                    <div className="bg-gray-800/50 rounded-lg p-3 text-center border border-gray-700">
                                        <div className="text-xl md:text-2xl font-bold text-white">
                                            {formatNumber(currentUser.stats.following)}
                                        </div>
                                        <div className="text-xs text-gray-400">Following</div>
                                    </div>
                                    <div className="bg-gray-800/50 rounded-lg p-3 text-center border border-gray-700">
                                        <div className="text-xl md:text-2xl font-bold text-white">
                                            {formatNumber(currentUser.stats.views)}
                                        </div>
                                        <div className="text-xs text-gray-400">Views</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="bg-gray-900/95 backdrop-blur-sm rounded-xl border border-gray-800 p-1 mb-6 shadow-lg">
                    <div className="flex space-x-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${activeTab === tab.id
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="pb-8">
                    {activeTab === 'posts' && (
                        <div className="space-y-6">
                            {demoData.map((post) => (
                                <div key={post.id} className="bg-gray-900/95 backdrop-blur-sm rounded-xl border border-gray-800 p-6 shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white">
                                                {post.authorName[0]}
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">{name}</p>
                                                <p className="text-xs text-gray-400">{formatDateTime(post.created_at)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getStatusBadge(post.status)}
                                            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                                                <RiMoreFill className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <h3 className="text-lg md:text-xl font-bold text-white mb-3 hover:text-blue-400 cursor-pointer transition-colors">
                                        {post.title}
                                    </h3>

                                    <p className="text-gray-300 mb-4 leading-relaxed">
                                        {post.content}
                                    </p>

                                    {post.image && (
                                        <div className="mb-4 rounded-xl overflow-hidden">
                                            <img
                                                src={Object.values(post.image)[0]}
                                                alt={post.title}
                                                className="w-full h-48 md:h-64 object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                                        <div className="flex items-center gap-6">
                                            <button className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors">
                                                <RiHeartLine className="w-5 h-5" />
                                                <span className="text-sm">{post.likes}</span>
                                            </button>
                                            <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                                                <RiChat3Line className="w-5 h-5" />
                                                <span className="text-sm">{post.comments}</span>
                                            </button>
                                            <button className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors">
                                                <RiShareForwardLine className="w-5 h-5" />
                                                <span className="text-sm">{post.shares}</span>
                                            </button>
                                        </div>
                                        <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                                            <RiBookmarkLine className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'about' && (
                        <div className="bg-gray-900/95 backdrop-blur-sm rounded-xl border border-gray-800 p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-white mb-6">About Me</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-gray-300">
                                    <RiUserLine className="w-5 h-5 text-blue-400" />
                                    <span>Senior Software Engineer with 8+ years of experience</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-300">
                                    <RiCodeSSlashLine className="w-5 h-5 text-purple-400" />
                                    <span>Specializes in Spring Boot, Microservices, and Cloud Architecture</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-300">
                                    <RiCalendarLine className="w-5 h-5 text-green-400" />
                                    <span>Joined {formatDate(currentUser.joinDate)}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-300">
                                    <RiGlobalLine className="w-5 h-5 text-cyan-400" />
                                    <span>Based in San Francisco, CA</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'activity' && (
                        <div className="bg-gray-900/95 backdrop-blur-sm rounded-xl border border-gray-800 p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                                    <RiArticleLine className="w-5 h-5 text-blue-400" />
                                    <span className="text-gray-300">Published a new blog post</span>
                                    <span className="text-xs text-gray-400 ml-auto">2 hours ago</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                                    <RiHeartLine className="w-5 h-5 text-red-400" />
                                    <span className="text-gray-300">Received 15 new likes</span>
                                    <span className="text-xs text-gray-400 ml-auto">1 day ago</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                                    <RiStarLine className="w-5 h-5 text-yellow-400" />
                                    <span className="text-gray-300">Gained 25 new followers</span>
                                    <span className="text-xs text-gray-400 ml-auto">3 days ago</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;