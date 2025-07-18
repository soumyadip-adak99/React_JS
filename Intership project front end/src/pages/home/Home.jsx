import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Navbar from './home_componets/Navbar';
import { Outlet, useLocation } from 'react-router-dom';

function Home() {
    const { user, fetchUserDetails, logout } = useAuth();
    const [activeItem, setActiveItem] = useState('Home');
    const location = useLocation();

    useEffect(() => {
        fetchUserDetails();
    }, []);

    useEffect(() => {
        const path = location.pathname.split('/').pop();
        const activeMap = {
            'home': 'Home',
            'search': 'Search',
            'create-blog': 'Create',
            'profile': 'Profile'
        };

        if (!path || path === 'user') {
            setActiveItem('Home');
        } else if (activeMap[path]) {
            setActiveItem(activeMap[path]);
        }
    }, [location]);

    // Check if current route is profile to adjust layout
    const isProfileRoute = location.pathname.includes('profile');

    return (
        <div className="min-h-screen bg-gray-950">
            <Navbar
                userId={user?.id}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                email={user?.email}
                logout={logout}
            />

            <main className={`md:ml-64 min-h-screen transition-all duration-300 ${isProfileRoute
                ? 'pt-16 md:pt-0' // Minimal padding for profile
                : 'pt-20 md:pt-6' // More padding for other pages
                }`}>
                {/* Conditional wrapper for different page layouts */}
                {isProfileRoute ? (
                    // Profile gets full width with no container padding
                    <div className="w-full">
                        <Outlet />
                    </div>
                ) : (
                    // Other pages get contained layout with padding
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <div className="py-4 md:py-6">
                            <Outlet />
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Home;