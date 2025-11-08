import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Role Selection Page (Student/Admin choose)
import RoleSelectPage from "./pages/RoleSelectPage";
import SubmitReport from "./pages/SubmitReport";


// Student Pages
import StudentLogin from "./pages/StudentLogin";
import SignupPage from "./pages/SignupPage";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import VirtualLabs from "./pages/VirtualLabs";
import ExperimentDetails from "./pages/ExperimentDetails";
import StudyResources from "./pages/StudyResources";
import Notifications from "./pages/Notifications";
import Progress from "./pages/Progress";
import LabExperiments from "./pages/LabExperiments";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageExperiments from "./pages/admin/ManageExperiments";
import ManageUsers from "./pages/admin/ManageUsers";
import ViewReports from "./pages/admin/ViewReports";
import Announcements from "./pages/admin/Announcements";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Role Selector (default landing page) */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<RoleSelectPage />} />

        {/* Student Routes */}
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/virtual-labs" element={<VirtualLabs />} />
        <Route path="/lab/:id/experiments" element={<LabExperiments />} />
        <Route path="/experiment/:id" element={<ExperimentDetails />} />
        <Route path="/submit-report" element={<SubmitReport />} />
        <Route path="/resources" element={<StudyResources />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/progress" element={<Progress />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/experiments" element={<ManageExperiments />} />
        <Route path="/admin/reports" element={<ViewReports />} />
        <Route path="/admin/announcements" element={<Announcements />} />

        {/* Fallback - Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
