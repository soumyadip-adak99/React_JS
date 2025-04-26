import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import About from "./pages/about/About.jsx";
import Portfolio from "./pages/portfolio/Portfolio.jsx";
import Contact from "./pages/contact/Contact.jsx";
import AppLayout from "./component/AppLayout.jsx";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, [pathname]);

    return null;
};

const Layout = () => (
    <>
        <ScrollToTop />
        <AppLayout>
            <Outlet />
        </AppLayout>
    </>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "about", element: <About /> },
            { path: "portfolio", element: <Portfolio /> },
            { path: "contact", element: <Contact /> }
        ],
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
