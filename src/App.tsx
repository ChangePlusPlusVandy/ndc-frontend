import React from "react";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import {MantineProvider } from "@mantine/core"; 
import "@mantine/core/styles.css";

// Routes
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login";
import PrivateRoute from "./pages/Auth/PrivateRoute";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import OrderPartner from "./pages/Order/OrderPartner";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<PrivateRoute element={<Home />} />} />
      <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/order" element={<OrderPartner />} />
    </>,
  ),
);

const App: React.FC = () => (
  <MantineProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </MantineProvider>
  
);

export default App;
