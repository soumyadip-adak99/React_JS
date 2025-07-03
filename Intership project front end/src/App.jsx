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

                    {/*Fallback*/}
                    <Route path="*" element={<Navigate to='/' replace />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
