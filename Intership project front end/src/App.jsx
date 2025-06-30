import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from './components/Login';

function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
            </Route>
        )
    )


    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;