import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Layout from './components/Layout/Layout';
import NotificationToast from './components/UI/NotificationToast';

// Authentication
import Login from './pages/Login';

// Main Pages
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';

// Job Postings
import JobPostingList from './components/Recruitment/JobPostingList';
import JobPostingDetail from './components/Recruitment/JobPostingDetail';
import JobPostingForm from './components/Recruitment/JobPostingForm';
import JobApplicationsList from './components/Recruitment/JobApplicationsList';
import JobApplicationDetail from './components/Recruitment/JobApplicationdetail';  // Keep correct path
import InterviewSchedule from './components/Recruitment/InterviewSchedule';

// Document Management
import EmployeeDocumentList from './components/Document/EmployeeDocumentList';
import UploadDocument from './components/Document/UploadDocument';
import DocumentDetail from './components/Document/DocumentDetail';
import CompanyPolicies from './components/Document/CompanyPolicies';

// Training & Development
import TrainingProgramsList from './components/Training/TrainingProgramsList';
import ProgramDetail from './components/Training/ProgramDetail';
import EmployeeTrainingRecords from './components/Training/EmployeeTrainingRecords';
import UploadCertificate from './components/Training/UploadCertificate';

// Disciplinary & Compliance
import DisciplinaryActionList from './components/Disciplinary/DisciplinaryActionList'; // Correct spelling
import DisciplinaryActionDetail from './components/Disciplinary/DisciplinaryActionDetail';
import DisciplinaryActionForm from './components/Disciplinary/DisciplinaryActionForm';

// System Settings
import AuditLogs from './pages/AuditLogs';

import SystemSettings from './pages/SystemSettings';

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <Router>
            <div className="App">
              <Routes>
                {/* Authentication */}
                <Route path="/login" element={<Login />} />

                {/* Main Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Dashboard />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employees"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager']}>
                      <Layout>
                        <Employees />
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                {/* Recruitment */}
                <Route
                  path="/jobs"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager', 'recruiter']}>
                      <Layout>
                        <JobPostingList />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/jobs/:id"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager', 'recruiter']}>
                      <Layout>
                        <JobPostingDetail />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/jobs/create"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager']}>
                      <Layout>
                        <JobPostingForm />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/jobs/:id/edit"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager']}>
                      <Layout>
                        <JobPostingForm />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/jobs/:id/applications"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager', 'recruiter']}>
                      <Layout>
                        <JobApplicationsList />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/jobs/:id/applications/:applicationId"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager', 'recruiter']}>
                      <Layout>
                        <JobApplicationDetail />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/jobs/:id/applications/:applicationId/schedule-interview"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager', 'recruiter']}>
                      <Layout>
                        <InterviewSchedule />
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                {/* Document Management */}
                <Route
                  path="/employees/:employeeId/documents"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager']}>
                      <Layout>
                        <EmployeeDocumentList />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employees/:employeeId/documents/upload"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager']}>
                      <Layout>
                        <UploadDocument />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employees/:employeeId/documents/:documentId"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager']}>
                      <Layout>
                        <DocumentDetail />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/policies"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <CompanyPolicies />
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                {/* Training & Development */}
                <Route
                  path="/training/programs"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager', 'training_manager']}>
                      <Layout>
                        <TrainingProgramsList />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/training/programs/:id"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager', 'training_manager']}>
                      <Layout>
                        <ProgramDetail />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employees/:employeeId/training"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager', 'manager']}>
                      <Layout>
                        <EmployeeTrainingRecords />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employees/:employeeId/training/upload"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager']}>
                      <Layout>
                        <UploadCertificate />
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                {/* Disciplinary & Compliance */}
                <Route
                  path="/disciplinary/actions"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager']}>
                      <Layout>
                        <DisciplinaryActionList /> {/* Correct name */}
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/disciplinary/actions/:id"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager']}>
                      <Layout>
                        <DisciplinaryActionDetail />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/disciplinary/actions/create"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager']}>
                      <Layout>
                        <DisciplinaryActionForm />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/disciplinary/actions/:id/edit"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager']}>
                      <Layout>
                        <DisciplinaryActionForm />
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                {/* System Settings */}
                <Route
                  path="/settings/audit-logs"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <Layout>
                        <AuditLogs />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings/system"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <Layout>
                        <SystemSettings />
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                {/* Default Routes */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
              <NotificationToast />
            </div>
          </Router>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
