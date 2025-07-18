import React, { useState, useEffect } from 'react';
import {
    RiUserLine, RiMailLine, RiCalendarLine, RiBookmarkLine, RiThumbUpLine,
    RiChat3Line, RiShareForwardLine, RiMoreFill, RiCheckboxCircleFill,
    RiGlobalLine, RiStarLine, RiTrophyLine, RiCodeSSlashLine, RiArticleLine,
    RiHeartLine, RiVerifiedBadgeFill
} from 'react-icons/ri';
import { useParams } from 'react-router-dom';

const localDemoData = [
    {
        "id": "68669bbd3c0bc7f052828b2c",
        "firstName": "Soumyadip",
        "lastName": "Adak",
        "email": "soumyadip76adak@gmail.com",
        "profileImage": null,
        "blogEntries": [
            {
                "id": "686e34ec8d09b67092caf5a5",
                "title": "My first blog",
                "authorName": "soumyadip76adak@gmail.com",
                "content": "I create my first blog in this web site",
                "image": null,
                "status": "APPROVED",
                "create_at": "2025-07-09T09:22:52"
            }
        ],
        "createdAt": "2025-07-01T00:00:00"
    }
];

function UserProfile() {
    const { userId } = useParams();
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('posts');

    useEffect(() => {
        if (!userId) {
            setCurrentUser(null);
            setLoading(false);
            return;
        }

        const foundUser = localDemoData.find(user => user.id === userId);

        if (foundUser) {
            const transformedUser = {
                ...foundUser,
                joinDate: foundUser.createdAt,
                bio: `${foundUser.firstName} is a member of our community`,
                stats: {
                    posts: foundUser.blogEntries?.length || 0,
                    followers: Math.floor(Math.random() * 5000),
                    following: Math.floor(Math.random() * 1000),
                    views: Math.floor(Math.random() * 100000)
                },
                blogEntries: foundUser.blogEntries?.map(blog => ({
                    ...blog,
                    createdAt: blog.create_at,
                    likes: Math.floor(Math.random() * 200),
                    comments: Math.floor(Math.random() * 50),
                    shares: Math.floor(Math.random() * 30)
                })) || []
            };
            setCurrentUser(transformedUser);
        } else {
            setCurrentUser(null);
        }
        setLoading(false);
    }, [userId]);

    const formatDate = (dateString) => {
        if (!dateString) return "Unknown date";
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return "Unknown date/time";
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
            case 'APPROVED':
                return (
                    <span className="bg-emerald-500/20 text-emerald-400 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5 border border-emerald-500/30">
                        <RiCheckboxCircleFill className="w-3 h-3" /> Published
                    </span>
                );
            case 'DRAFT':
                return (
                    <span className="bg-amber-500/20 text-amber-400 text-xs font-medium px-3 py-1 rounded-full border border-amber-500/30">
                        Draft
                    </span>
                );
            default:
                return (
                    <span className="bg-gray-500/20 text-gray-400 text-xs font-medium px-3 py-1 rounded-full border border-gray-500/30">
                        {status || 'Unknown'}
                    </span>
                );
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

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
                <div className="animate-pulse text-xl">Loading profile...</div>
            </div>
        );
    }

    if (!currentUser) {
        return (
            <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
                <div className="text-xl text-red-400">User not found</div>
            </div>
        );
    }

    const fullName = `${currentUser.firstName} ${currentUser.lastName}`;

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
                                {currentUser.profileImage ? (
                                    <img
                                        src={currentUser.profileImage}
                                        alt={fullName}
                                        className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-lg"
                                    />
                                ) : (
                                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl md:text-4xl font-bold text-white shadow-lg">
                                        {currentUser.firstName?.[0]}{currentUser.lastName?.[0]}
                                    </div>
                                )}
                                <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-1.5 border-2 border-gray-900">
                                    <RiVerifiedBadgeFill className="w-4 h-4 text-white" />
                                </div>
                            </div>

                            {/* Profile Info */}
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                                    <div>
                                        <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                                            {fullName}
                                        </h1>
                                        <p className="text-gray-400 flex items-center gap-2 mt-1">
                                            <RiMailLine className="w-4 h-4" />
                                            {currentUser.email}
                                        </p>
                                    </div>
                                    <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg">
                                        Follow
                                    </button>
                                </div>

                                <p className="text-gray-300 mb-6 text-sm md:text-base leading-relaxed">
                                    {currentUser.bio}
                                </p>

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
                            {currentUser.blogEntries.length > 0 ? (
                                currentUser.blogEntries.map((post) => (
                                    <div key={post.id} className="bg-gray-900/95 backdrop-blur-sm rounded-xl border border-gray-800 p-6 shadow-lg hover:shadow-xl transition-shadow">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                {currentUser.profileImage ? (
                                                    <img
                                                        src={currentUser.profileImage}
                                                        alt={fullName}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white">
                                                        {currentUser.firstName?.[0]}{currentUser.lastName?.[0]}
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-medium text-white">{post.authorName}</p>
                                                    <p className="text-xs text-gray-400">
                                                        {formatDateTime(post.createdAt)}
                                                    </p>
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
                                                    src={post.image}
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
                                ))
                            ) : (
                                <div className="bg-gray-900/95 backdrop-blur-sm rounded-xl border border-gray-800 p-6 shadow-lg text-center">
                                    <p className="text-gray-400">No posts yet</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'about' && (
                        <div className="bg-gray-900/95 backdrop-blur-sm rounded-xl border border-gray-800 p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-white mb-6">About {currentUser.firstName}</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-gray-300">
                                    <RiUserLine className="w-5 h-5 text-blue-400" />
                                    <span>Member of CodeScribeAI community</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-300">
                                    <RiCodeSSlashLine className="w-5 h-5 text-purple-400" />
                                    <span>Active contributor</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-300">
                                    <RiCalendarLine className="w-5 h-5 text-green-400" />
                                    <span>Joined {formatDate(currentUser.joinDate)}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-300">
                                    <RiGlobalLine className="w-5 h-5 text-cyan-400" />
                                    <span>Based in Earth</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'activity' && (
                        <div className="bg-gray-900/95 backdrop-blur-sm rounded-xl border border-gray-800 p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                            <div className="space-y-4">
                                {currentUser.blogEntries.length > 0 ? (
                                    <>
                                        <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                                            <RiArticleLine className="w-5 h-5 text-blue-400" />
                                            <span className="text-gray-300">
                                                Published {currentUser.blogEntries.length} blog posts
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                                            <RiHeartLine className="w-5 h-5 text-red-400" />
                                            <span className="text-gray-300">
                                                Received {currentUser.blogEntries.reduce((sum, post) => sum + post.likes, 0)} likes
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                                            <RiStarLine className="w-5 h-5 text-yellow-400" />
                                            <span className="text-gray-300">
                                                Gained {Math.floor(currentUser.stats.followers / 100)} new followers recently
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center text-gray-400 py-4">No recent activity</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;