import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import Home from '../pages/home/Home';
import Admin from '../pages/admin/Admin';
import LandingPage from '../pages/LandingPage/LandingPage';

export default function RootRoute() {
    const { isAuthenticated, isAdmin, isUser, user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-lg text-gray-600">Loading...</span>
            </div>
        );
    }

    if (!isAuthenticated()) {
        return <LandingPage />;
    }

    if (isAdmin()) {
        return <Admin />;
    }

    if (isUser()) {
        return <Home />;
    }

    return <LandingPage />;
}