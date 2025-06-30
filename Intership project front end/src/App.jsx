import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from './components/Login';
import Register from "./components/Register";

function App() {

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
            <RouterProvider router={router} />
        </>
    );
}

export default App;