import React from "react";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { ModalsProvider } from "@mantine/modals";

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./AuthContext";
// Routes
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login";
import PrivateRoute from "./pages/Auth/PrivateRoute";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<PrivateRoute element={<Home />} />} />
            <Route
                path="/profile"
                element={<PrivateRoute element={<Profile />} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
        </>
    )
);

import OrderForm from "./pages/OrderForm";

const App: React.FC = () => (
    <>
        <MantineProvider>
            <ModalsProvider>
                <OrderForm></OrderForm>
            </ModalsProvider>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </MantineProvider>
    </>
);

export default App;
