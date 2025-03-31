import React, { useEffect } from "react";
import Home from "./pages/home/Home.jsx";
import About from "./pages/about/About.jsx";
import Portfolio from "./pages/portfolio/Portfolio.jsx";
import Contact from "./pages/contact/Contact.jsx";
import AppLayout from "./component/AppLayout.jsx";
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return null;
};

const App = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <AppLayout>
                    <ScrollToTop />
                </AppLayout>
            ),
            children: [
                {
                    index: true,
                    element: <Home />,
                },
                {
                    path: "about",
                    element: <About />,
                },
                {
                    path: "portfolio",
                    element: <Portfolio />,
                },
                {
                    path: "contact",
                    element: <Contact />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default App;
