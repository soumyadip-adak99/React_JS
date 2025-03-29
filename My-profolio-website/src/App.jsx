import React from "react";
import Home from "./pages/home/Home.jsx";
import About from "./pages/about/About.jsx";
import Portfolio from "./pages/portfolio/Portfolio.jsx";
import Contact from "./pages/contact/Contact.jsx";
import AppLayout from "./component/AppLayout.jsx";
import ScrollToTop from "./component/ScrollToTop.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <AppLayout />,
            children: [
                {
                    path: '/',
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