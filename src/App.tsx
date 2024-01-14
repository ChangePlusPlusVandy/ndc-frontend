import React, { useContext, ReactNode } from "react";
import "@mantine/core/styles.css";


import {
  Route,
  Routes,
  BrowserRouter as RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import "./App.css"
// Routes
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/Auth/Login";
import PrivateRoute from "./pages/Auth/PrivateRoute";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AuthWrapper from "./pages/Auth/AuthWrapper";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <RouterProvider>
        <Routes>
          <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />

          <Route index path="/login" element={AuthWrapper(<Login />)} />
          <Route path="/register" element={AuthWrapper(<Register />)} />
          <Route path="/forgot-password" element={AuthWrapper(<ForgotPassword />)} />
        </Routes>
      </RouterProvider>
    </AuthProvider>
  );
}




export default App;
