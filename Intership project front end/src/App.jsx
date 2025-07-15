import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login';
import Register from "./components/Register";
import { useEffect } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import RootRoute from "./router/RootRoute";
import PublicRoute from "./router/PublicRoute";
import Dashboard from "./pages/admin/admin_componets/Dashboard";
import RequireAuth from "./router/RequireAuth";
import Admin from "./pages/admin/Admin";
import UserManagement from "./pages/admin/admin_componets/UserManagement";
import BlogManagement from "./pages/admin/admin_componets/BlogManagement";

function App() {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <Router>
            <AuthProvider>
                <Toaster position="top-center" reverseOrder={false} />

                <Routes>
                    <Route path="/" element={<RootRoute />} />

                    <Route
                        path="/auth/sing-in"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />

                    <Route
                        path="/auth/register"
                        element={
                            <PublicRoute>
                                <Register />
                            </PublicRoute>
                        }
                    />

                    {/* Admin routes */}
                    <Route
                        path="/admin/*"
                        element={
                            <RequireAuth>
                                <Admin />
                            </RequireAuth>
                        }
                    >
                        <Route index element={<Dashboard />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="users" element={<UserManagement />} />
                        <Route path="blogs" element={<BlogManagement />} />
                    </Route>


                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}


export default App;
