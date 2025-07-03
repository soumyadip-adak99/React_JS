import Home from '../pages/home/Home';
import Admin from '../pages/admin/Admin';
import LandingPage from '../pages/LandingPage/LandingPage';
import { useAuth } from "../context/AuthContext";

export default function RootRoute() {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isAuthenticated()) {
        return <LandingPage />;
    }

    if (user?.role?.includes("ROLE_ADMIN")) {
        return <Admin />;
    }

    return <Home />;
}