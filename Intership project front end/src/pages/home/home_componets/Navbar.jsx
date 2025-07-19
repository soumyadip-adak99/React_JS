import {useState, useEffect} from "react";
import {
    RiLogoutBoxLine,
    RiMenuLine,
    RiCloseLine,
    RiUserLine,
    RiSearchLine,
    RiAddLine,
    RiCloseFill,
    RiUploadLine
} from "react-icons/ri";
import {useNavigate, useLocation} from "react-router-dom";
import {useAuth} from "../../../context/AuthContext";
import toast from "react-hot-toast";
import {userNavItems} from "../../../constants/data";

function Navbar({activeItem, setActiveItem, email}) {
    const [isMobile, setIsMobile] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [blogData, setBlogData] = useState({
        title: "",
        content: "",
        image: null,
        previewImage: null
    });
    const [isSubmitting, setIsSubmitting,] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const {
        user,
        allUsers,
        fetchAllUsers,
        logout,
        uploadBlog,
        fetchUserDetails
    } = useAuth();

    useEffect(() => {
        fetchAllUsers();
    }, [user, location]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setSidebarOpen(window.innerWidth >= 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const handleNavigation = (item) => {
        setActiveItem(item.label);
        if (isMobile) setSidebarOpen(false);
        if (item.label === "Search") setShowSearchModal(true);
        else if (item.label === "Create") setShowCreateModal(true);
        else if (item.path) navigate(item.path);
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (err) {
            console.error('Error while logging out:', err);
            toast.error("Something went wrong during logout");
        }
    };

    const handleProfileClick = () => {
        navigate('/user/profile');
        if (isMobile) setSidebarOpen(false);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = allUsers?.filter(user =>
        `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBlogData(prev => ({
                    ...prev,
                    image: file,
                    previewImage: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setBlogData(prev => ({
            ...prev,
            image: null,
            previewImage: null
        }));
    };

    const handleBlogSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await uploadBlog(
                {title: blogData.title, content: blogData.content},
                blogData.image
            );

            setShowCreateModal(false);
            setBlogData({
                title: "",
                content: "",
                image: null,
                previewImage: null
            });

            // Refresh user details to get updated blogs
            await fetchUserDetails();
        } catch (error) {
            toast.error("Failed upload blog")
            console.error("Error creating blog:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeModal = () => {
        setShowSearchModal(false);
        setShowCreateModal(false);
        setSearchQuery("");
        navigate(location)
        setBlogData({
            title: "",
            content: "",
            image: null,
            previewImage: null
        });
    };

    const handleUserClick = (user) => {
        closeModal();
        navigate(`/user/profile/${user.id}`, {
            state: {user},
            replace: false
        });
    };

    return (
        <>
            {/* Mobile Header */}
            {isMobile && (
                <header className="fixed top-0 left-0 right-0 bg-gray-950 border-b border-gray-700 z-50 h-16">
                    <div className="flex items-center justify-between px-4 h-full">
                        <h1 className='text-center font-bold text-xl text-white'>
                            CodeScribe
                            <span
                                className='ml-1 text-transparent font-bold bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400'>
                                AI
                            </span>
                        </h1>
                        <button
                            onClick={toggleSidebar}
                            className="p-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            {sidebarOpen ? <RiCloseLine className="text-xl"/> : <RiMenuLine className="text-xl"/>}
                        </button>
                    </div>
                </header>
            )}

            {/* Overlay for Sidebar */}
            {isMobile && sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    onClick={toggleSidebar}
                />
            )}

            {/* Search Modal */}
            {showSearchModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                    <div
                        className="bg-gray-800 rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden border border-gray-700">
                        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-white">Search Users</h3>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <RiCloseFill className="text-xl"/>
                            </button>
                        </div>
                        <div className="p-4">
                            <div className="relative mb-4">
                                <RiSearchLine className="absolute left-3 top-3 text-gray-400"/>
                                <input
                                    type="text"
                                    placeholder="Search by name or email"
                                    className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600 transition-all"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    autoFocus
                                />
                            </div>
                            <div className="mt-4 space-y-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map(user => (
                                        <div
                                            key={user.id}
                                            onClick={() => handleUserClick(user)}
                                            className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div
                                                    className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium">
                                                    {user.firstname?.charAt(0)}{user.lastname?.charAt(0)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-white truncate">
                                                        {user.firstname} {user.lastname}
                                                    </p>
                                                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                                </div>
                                                <RiUserLine className="text-gray-400"/>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-6">
                                        <RiSearchLine className="mx-auto text-3xl text-gray-500 mb-2"/>
                                        <p className="text-gray-400">No users found</p>
                                        {searchQuery && (
                                            <p className="text-xs text-gray-500 mt-1">Try different search terms</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Blog Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                    <div
                        className="bg-gray-800 rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden border border-gray-700">
                        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-white">Create New Blog Post</h3>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <RiCloseFill className="text-xl"/>
                            </button>
                        </div>
                        <form onSubmit={handleBlogSubmit} className="p-4">
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600"
                                    value={blogData.title}
                                    onChange={(e) => setBlogData({...blogData, title: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-1">
                                    Content
                                </label>
                                <textarea
                                    id="content"
                                    rows={5}
                                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600"
                                    value={blogData.content}
                                    onChange={(e) => setBlogData({...blogData, content: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Featured Image
                                </label>
                                {blogData.previewImage ? (
                                    <div className="relative mb-2">
                                        <img
                                            src={blogData.previewImage}
                                            alt="Preview"
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute top-2 right-2 bg-gray-900/80 text-white p-1 rounded-full hover:bg-gray-800"
                                        >
                                            <RiCloseFill className="w-5 h-5"/>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center w-full">
                                        <label
                                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <RiUploadLine className="w-8 h-8 text-gray-400 mb-2"/>
                                                <p className="text-sm text-gray-400">Upload an image</p>
                                            </div>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    'Publishing...'
                                ) : (
                                    <>
                                        <RiAddLine className="mr-2"/>
                                        Publish Blog
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed h-screen bg-gray-950 border-r border-gray-700 z-50 transition-all duration-300 ease-in-out ${
                    isMobile
                        ? (sidebarOpen ? 'w-64 left-0' : '-left-64 w-64')
                        : 'left-0 w-64'
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="flex flex-col p-6 border-b border-gray-700">
                        <h1 className='font-bold text-2xl text-white'>
                            CodeScribe
                            <span
                                className='ml-1 text-transparent font-bold bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400'>
                                AI
                            </span>
                        </h1>
                        <div className="mt-2 text-xs text-gray-400 flex items-center">
                            <RiUserLine className="mr-1"/>
                            <span>{`${user?.firstname || ''} ${user?.lastname || ''}`}</span>
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
                        {userNavItems.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => handleNavigation(item)}
                                className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                                    activeItem === item.label
                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                <span className="mr-3">{item.icon}</span>
                                <span className="font-medium">{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Sidebar Footer / Profile */}
                    <div className="px-4 py-6 border-t border-gray-700">
                        <div
                            className="flex items-center mb-4 cursor-pointer hover:bg-gray-700 rounded-lg p-2 transition-colors"
                            onClick={handleProfileClick}
                        >
                            <div
                                className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
                                <RiUserLine className="text-xl"/>
                            </div>
                            <div className="ml-3 flex-1 min-w-0">
                                <p className="text-sm font-medium text-white">
                                    {user?.firstname} {user?.lastname}
                                </p>
                                <p className="text-xs text-gray-400 truncate">{email}</p>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                                activeItem === 'Logout'
                                    ? 'bg-red-600 text-white'
                                    : 'text-gray-300 hover:bg-red-600 hover:text-white'
                            }`}
                        >
                            <RiLogoutBoxLine className="text-xl mr-3"/>
                            <span className="font-medium">Log out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Add custom scrollbar styles */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }

                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #4B5563;
                    border-radius: 3px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #374151;
                }
            `}</style>
        </>
    );
}

export default Navbar;