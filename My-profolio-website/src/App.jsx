import React, { useEffect, useCallback } from "react";
import { createBrowserRouter, RouterProvider, Outlet, useLocation, ScrollRestoration } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import About from "./pages/about/About.jsx";
import Portfolio from "./pages/portfolio/Portfolio.jsx";
import Contact from "./pages/contact/Contact.jsx";
import AppLayout from "./component/AppLayout.jsx";

const ScrollController = () => {
    const { pathname, key } = useLocation();
    const isInitialLoad = React.useRef(true);

    const scrollToTop = useCallback((behavior = 'auto') => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior
        });
    }, []);

    useEffect(() => {
        if (key !== 'default') {
            scrollToTop('instant');
        }
    }, [pathname, key, scrollToTop]);

    useEffect(() => {
        if (isInitialLoad.current) {
            const timer = setTimeout(() => {
                scrollToTop('smooth');
                isInitialLoad.current = false;
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [scrollToTop]);

    return <ScrollRestoration />;
};

const Layout = React.memo(() => (
    <>
        <ScrollController />
        <AppLayout>
            <Outlet />
        </AppLayout>
    </>
));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <div>Error occurred! <a href="/">Go home</a></div>,
        children: [
            {
                index: true,
                element: <Home />,
                handle: { title: 'Home' }
            },
            {
                path: "about",
                element: <About />,
                handle: { title: 'About' }
            },
            {
                path: "portfolio",
                element: <Portfolio />,
                handle: { title: 'Portfolio' }
            },
            {
                path: "contact",
                element: <Contact />,
                handle: { title: 'Contact' }
            },
            {
                path: "*",
                element: <div>Page not found <a href="/">Go home</a></div>
            }
        ],
    },
], {
    future: {
        v7_normalizeFormMethod: true,
    }
});

const App = () => {
    return (
        <React.StrictMode>
            <RouterProvider
                router={router}
                fallbackElement={<div>Loading...</div>}
            />
        </React.StrictMode>
    );
};

export default App;