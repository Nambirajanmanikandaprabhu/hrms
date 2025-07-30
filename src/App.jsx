import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './pages/Auth/Login';
import RegisterUser from './pages/Auth/RegisterUser';
import Dashboard from './pages/Dashboard/Dashboard';
import EmployeeList from './pages/Employees/EmployeeList';
import EmployeeDetail from './pages/Employees/EmployeeDetail';
import CreateEmployee from './pages/Employees/CreateEmployee';
import DepartmentList from './pages/Departments/DepartmentList';
import AttendanceList from './pages/Attendance/AttendanceList';
import LeaveRequests from './pages/Leave/LeaveRequests';
import PayrollList from './pages/Payroll/PayrollList';
import JobPostings from './pages/Recruitment/JobPostings';
import Performance from './pages/Performance/Performance';
import Documents from './pages/Documents/Documents';
import Training from './pages/Training/Training';
import Disciplinary from './pages/Disciplinary/Disciplinary';
import Settings from './pages/Settings/Settings';
import ProtectedRoute from './components/Auth/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterUser />} />
            
            {/* Protected routes */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              
              {/* Employee routes */}
              <Route path="employees" element={<EmployeeList />} />
              <Route path="employees/:id" element={<EmployeeDetail />} />
              <Route path="employees/new" element={<CreateEmployee />} />
              
              <Route path="departments" element={<DepartmentList />} />
              <Route path="attendance" element={<AttendanceList />} />
              <Route path="leave" element={<LeaveRequests />} />
              <Route path="payroll" element={<PayrollList />} />
              <Route path="recruitment" element={<JobPostings />} />
              <Route path="performance" element={<Performance />} />
              <Route path="documents" element={<Documents />} />
              <Route path="training" element={<Training />} />
              <Route path="disciplinary" element={<Disciplinary />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
