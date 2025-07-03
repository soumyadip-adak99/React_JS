import Home from '../pages/home/Home';
import Admin from '../pages/admin/Admin';
import LandingPage from '../pages/LandingPage/LandingPage';
import { useAuth } from "../context/AuthContext";
import LoadingScaliton from '../constants/LoadingScaliton';

export default function RootRoute() {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        return (
            <LoadingScaliton />
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