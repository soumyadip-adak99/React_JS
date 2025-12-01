import { useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Index from "./pages/Index";

const App = () => {
    useEffect(() => {
        document.addEventListener("contextmenu", (e) => e.preventDefault());

        document.addEventListener("keydown", (e) => {
            if (
                e.key === "F12" ||
                (e.ctrlKey && e.shiftKey && e.key === "I") ||
                (e.ctrlKey && e.shiftKey && e.key === "C") ||
                (e.ctrlKey && e.shiftKey && e.key === "J") ||
                (e.ctrlKey && e.key === "U")
            ) {
                e.preventDefault();
            }
        });
    }, []);

    return (
        <>
            <BrowserRouter>
                <ThemeProvider>
                    <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </>
    );
};

export default App;
