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
import UserDirectory from "./pages/UserDirectory/UserDirectory";

const DashboardAccessControl: React.FC = () => {
  const { isStaff } = useAuth();
  return isStaff ? <StaffDashboard /> : <PartnerDashboard />;
}

const OrderManageControl: React.FC = () => {
  const { isStaff } = useAuth();
  return isStaff && <OrderManagement />;
}



const App: React.FC = () => {
  return (
    <AuthProvider>
      <RouterProvider>
        <Routes>
          <Route index path="/login" element={AuthWrapper(<Login />)} />
          <Route path="/forgot-password" element={AuthWrapper(<ForgotPassword />)} />

          <Route path="/" element={<PrivateRoute element={<DashboardLayout />} />}>

            <Route index element={<DashboardAccessControl />} />
            <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />

            <Route path="/register" element={<Register />} />


            // TODO: make this dynamic. Staff should be able to click on a Partner and view all orders under order-info route
            <Route path="/order-info" element={<OrderPartner />} />
            <Route path="/order-manage" element={<OrderManageControl />} />
            <Route path="/user-dir" element={<PrivateRoute element={<UserDirectory />} />} />

          </Route>
        </Routes>
      </RouterProvider>
    </AuthProvider >
  );
}




export default App;

