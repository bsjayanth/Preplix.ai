
import { createBrowserRouter } from "react-router";

import Login from "./features/auth/pages/Login.jsx";
import Register from "./features/auth/pages/Register.jsx";
import Protected from "./features/auth/components/Protected.jsx";

import AppLayout from "./components/layout/AppLayout.jsx";

import Home from "./features/interview/pages/Home.jsx";
import Interview from "./features/interview/pages/interview.jsx";
import Reports from "./features/interview/pages/Reports.jsx";
import Profile from "./features/Profile/Pages/Profile.jsx";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },

    {
        path: "/register",
        element: <Register />
    },

    {
        element: (
            <Protected>
                <AppLayout />
            </Protected>
        ),
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/reports",
                element: <Reports />
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/interview/:interviewId",
                element: <Interview />
            }
        ]
    }
]);
