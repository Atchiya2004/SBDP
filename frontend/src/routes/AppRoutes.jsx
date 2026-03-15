import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

import Dashboard from "../pages/1_Dashboard/Dashboard";
import Login from "../pages/2_Auth/Login";
import Register from "../pages/2_Auth/Register";
import VerifyEmail from "../pages/2_Auth/VerifyEmail";
import Profile from "../pages/3_UserProfile/Profile";
import DonorDashboard from "../pages/4_Donor/DonorDashboard";
import DonorProfile from "../pages/4_Donor/DonorProfile";
import DonorHistory from "../pages/4_Donor/DonationHistory";
import Awareness from "../pages/4_Donor/Awareness";
import RecipientDashboard from "../pages/5_Recipient/RecipientDashboard";
import RequestBlood from "../pages/5_Recipient/RequestBlood";
import RequestStatus from "../pages/5_Recipient/RequestStatus";
import AdminDashboard from "../pages/6_Admin/AdminDashboard";
import AlertHistory from "../pages/6_Admin/AlertHistory";
import ManageUsers from "../pages/6_Admin/ManageUsers";
import ManageRequests from "../pages/6_Admin/ManageRequests";
import Leaderboard from "../pages/7_Leaderboard/Leaderboard";
import NotificationList from "../pages/8_Notifications/NotificationList";
import EmergencyAlert from "../pages/9_EmergencyAlerts/EmergencyAlert";
import AlertSeen from "../pages/9_EmergencyAlerts/AlertSeen";
import Reports from "../pages/10_Reports/Reports";
import NotFound from "../pages/NotFound";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/verify-email/:id/:token" element={<VerifyEmail />} />

    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    <Route path="/donors" element={<ProtectedRoute><DonorDashboard /></ProtectedRoute>} />
    <Route path="/donor-profile" element={<ProtectedRoute><DonorProfile /></ProtectedRoute>} />
    <Route path="/donor-history" element={<ProtectedRoute><DonorHistory /></ProtectedRoute>} />
    <Route path="/recipient-dashboard" element={<ProtectedRoute><RecipientDashboard /></ProtectedRoute>} />
    <Route path="/request-blood" element={<ProtectedRoute><RequestBlood /></ProtectedRoute>} />
    <Route path="/request-status" element={<ProtectedRoute><RequestStatus /></ProtectedRoute>} />
    <Route path="/awareness" element={<ProtectedRoute><Awareness /></ProtectedRoute>} />
    <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
    <Route path="/alert-history" element={<ProtectedRoute><AlertHistory /></ProtectedRoute>} />
    <Route path="/manage-users" element={<ProtectedRoute><ManageUsers /></ProtectedRoute>} />
    <Route path="/manage-requests" element={<ProtectedRoute><ManageRequests /></ProtectedRoute>} />
    <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
    <Route path="/notifications" element={<ProtectedRoute><NotificationList /></ProtectedRoute>} />
    <Route path="/alert" element={<ProtectedRoute><EmergencyAlert /></ProtectedRoute>} />
    <Route path="/alert/:id/seen" element={<ProtectedRoute><AlertSeen /></ProtectedRoute>} />
    <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
