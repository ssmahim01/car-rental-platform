import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RootLayout from "../layouts/RootLayout";
import Error from "../ErrorPage/Error";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import AddCar from "../pages/AddCar";
import PrivateRoute from "./PrivateRoute";
import MyCars from "../pages/MyCars";
import AvailableCars from "../pages/AvailableCars";
import CarDetails from "../pages/CarDetails";
import MyBookings from "../pages/MyBookings";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/available-cars",
                element: <AvailableCars />
            },
            {
                path: "/car-details/:id",
                loader: ({params}) => fetch(`${import.meta.env.VITE_UNIQUE_URL}/car/${params.id}`),
                element: <CarDetails />
            },
            {
                path: "/add-car",
                element: <PrivateRoute><AddCar /></PrivateRoute>
            },
            {
                path: "/my-cars",
                element: <PrivateRoute><MyCars /></PrivateRoute>
            },
            {
                path: "/my-bookings",
                element: <PrivateRoute><MyBookings /></PrivateRoute>
            },
            {
                path: "/log-in",
                element: <LoginPage />
            },
            {
                path: "/registration",
                element: <RegistrationPage />
            }
        ]
    }
]);

export default router;