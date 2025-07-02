import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login';
import Register from "./components/Register";
import { useEffect } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import RootRoute from "./components/RootRoute";
import Test from "./components/Test";

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
                    <Route path="/auth/sing-in" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />

                    {/*Fall back*/}
                    <Route path="*" element={<Navigate to='/' replace />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;