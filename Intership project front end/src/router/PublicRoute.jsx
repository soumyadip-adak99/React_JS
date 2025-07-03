import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated() ? <Navigate to="/" replace /> : children;
}
