import React, { useContext, ReactNode } from "react";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import '@mantine/charts/styles.css';
import {
  Route,
  Routes,
  BrowserRouter as RouterProvider,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import "./App.css"
// Routes
import ForgotPassword from "./pages/Auth/ForgotPassword";
import PartnerDashboard from "./pages/PartnerDashboard/PartnerDashboard";
import DashboardLayout from "./pages/layouts/DashboardLayout";
import StaffDashboard from "./pages/StaffDashboard/StaffDashboard";
import Login from "./pages/Auth/Login";
import PrivateRoute from "./pages/Auth/PrivateRoute";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Profile/Profile";
import OrderPartner from "./pages/Order/OrderPartner";
import OrderManagement from "./pages/OrderManagement/OrderManagement";
import AuthWrapper from "./pages/Auth/AuthWrapper";

const DashboardAccessControl: React.FC = () => {
  const { isStaff } = useAuth();
  return isStaff ? <StaffDashboard /> : <PartnerDashboard />;
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <RouterProvider>
        <Routes>
          <Route index path="/login" element={AuthWrapper(<Login />)} />
          <Route path="/register" element={AuthWrapper(<Register />)} />
          <Route path="/forgot-password" element={AuthWrapper(<ForgotPassword />)} />

          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<PrivateRoute element={<DashboardAccessControl />} />} />
            <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
            <Route path="/dashboard" element={<StaffDashboard />} />

            <Route path="/order-info" element={<OrderPartner />} />
            <Route path="/order-manage" element={<OrderManagement />} />
          </Route>
        </Routes>
      </RouterProvider>
    </AuthProvider >
  );
}




export default App;

