import React, { useEffect, useState } from 'react';
import Home from '../pages/home/Home';
import LandingPage from '../pages/LandingPage/LandingPage';
import { useAuth } from "../context/AuthContext";
import LoadingScaliton from '../constants/LoadingScaliton';
import { Navigate } from 'react-router-dom';

export default function RootRoute() {
    const { isAuthenticated, user, loading, fetchUserDetails } = useAuth();
    const [userFetched, setUserFetched] = useState(false);

    // Ensure user data (including roles) is loaded before rendering
    useEffect(() => {
        const loadUser = async () => {
            try {
                await fetchUserDetails();
            } catch (err) {
                console.error("Failed to fetch user:", err);
            } finally {
                setUserFetched(true);
            }
        };

        if (isAuthenticated() && !userFetched) {
            loadUser();
        }
    }, [isAuthenticated, userFetched, fetchUserDetails]);

    // While authentication or user details are loading, show skeleton
    if (loading || (isAuthenticated() && !userFetched)) {
        return <LoadingScaliton />;
    }

    // Unauthenticated user
    if (!isAuthenticated()) {
        return <LandingPage />;
    }

    // Authenticated user — route by role
    const roles = user?.role || [];

    if (roles.includes("ROLE_ADMIN")) {
        // Redirect to admin dashboard instead of rendering Admin component directly
        return <Navigate to="/admin/dashboard" replace />;
    }

    if (roles.includes("ROLE_USER")) {
        return <Home />;
    }

    // Fallback for unexpected role
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
                <p>Your account doesn't have a recognized role.</p>
            </div>
        </div>
    );
}