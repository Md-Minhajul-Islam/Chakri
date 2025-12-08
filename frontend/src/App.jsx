import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import ProtectedRouteAdmin from "./components/admin/ProtectedRoute";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/browse"
          element={
            <ProtectedRoute>
              <Browse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/description/:id"
          element={
            <ProtectedRoute>
              <JobDescription />
            </ProtectedRoute>
          }
        />
        // Admin Panel
        <Route
          path="/admin/companies"
          element={
            <ProtectedRouteAdmin>
              <Companies />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/admin/companies/create"
          element={
            <ProtectedRouteAdmin>
              <CompanyCreate />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/admin/companies/:id"
          element={
            <ProtectedRouteAdmin>
              <CompanySetup />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/admin/jobs"
          element={
            <ProtectedRouteAdmin>
              <AdminJobs />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/admin/jobs/create"
          element={
            <ProtectedRouteAdmin>
              <PostJob />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/admin/jobs/:id/applicants"
          element={
            <ProtectedRouteAdmin>
              <Applicants />
            </ProtectedRouteAdmin>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
