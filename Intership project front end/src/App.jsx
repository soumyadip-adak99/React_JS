import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from './components/Login';
import Register from "./components/Register";
import { useEffect } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';
import { Toaster } from "react-hot-toast";

function App() {

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        })
    }, [])

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth/sing-in" element={<Login />} />
                <Route path='/auth/registration' element={<Register />} />
            </Route >
        )
    )


    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <RouterProvider router={router} />
        </>
    );
}

export default App;