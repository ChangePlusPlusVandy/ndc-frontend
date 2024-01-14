import React from "react";
import "@mantine/core/styles.css";


import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import "./App.css"
// Routes
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login";
import PrivateRoute from "./pages/Auth/PrivateRoute";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AuthWrapper from "./pages/Auth/AuthWrapper";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<PrivateRoute element={<Home />} />} />
      <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />


      <Route index path="/login" element={AuthWrapper(<Login />)} />
      <Route path="/register" element={AuthWrapper(<Register />)} />
      <Route path="/forgot-password" element={AuthWrapper(<ForgotPassword />)} />

    </>,
  ),
);

const App: React.FC = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default App;
