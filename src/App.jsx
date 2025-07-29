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
import JobApplicationDetail from './components/Recruitment/JobApplicationdetail';
import InterviewSchedule from './components/Recruitment/InterviewSchedule';
//import InterviewFeedback from './components/Recruitment/InterviewFeedback';

// Onboarding/Offboarding
//import OnboardingTemplatesList from './components/Onboarding/OnboardingTemplatesList';
//import TemplateDetail from './components/Onboarding/TemplateDetail';
//import EmployeeOnboardingTaskList from './components/Onboarding/EmployeeOnboardingTaskList';
//import TaskDetail from './components/Onboarding/TaskDetail';
//import OffboardingTaskList from './components/Onboarding/OffboardingTaskList';

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
import DisplinaryActionList from './components/Disciplinary/DisciplinaryActionList';
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
                        <JobPostingsListPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/jobs/:id"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager', 'recruiter']}>
                      <Layout>
                        <JobPostingDetailPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/jobs/create"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager']}>
                      <Layout>
                        <CreateEditJobPostingPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/jobs/:id/edit"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager']}>
                      <Layout>
                        <CreateEditJobPostingPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/jobs/:id/applications"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager', 'recruiter']}>
                      <Layout>
                        <JobApplicationsListPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/jobs/:id/applications/:applicationId"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager', 'recruiter']}>
                      <Layout>
                        <JobApplicationDetailPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/jobs/:id/applications/:applicationId/schedule-interview"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager', 'recruiter']}>
                      <Layout>
                        <InterviewSchedulePage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/jobs/:id/applications/:applicationId/interviews/:interviewId/feedback"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager', 'recruiter']}>
                      <Layout>
                        <InterviewFeedbackPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                {/* Onboarding/Offboarding */}
                <Route
                  path="/onboarding/templates"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager']}>
                      <Layout>
                        <OnboardingTemplatesListPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/onboarding/templates/:id"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager']}>
                      <Layout>
                        <TemplateDetailPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/onboarding/templates/create"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager']}>
                      <Layout>
                        <CreateEditJobPostingPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/onboarding/templates/:id/edit"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager']}>
                      <Layout>
                        <CreateEditJobPostingPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employees/:employeeId/onboarding"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager', 'manager']}>
                      <Layout>
                        <EmployeeOnboardingTaskListPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employees/:employeeId/onboarding/tasks/:taskId"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager', 'manager']}>
                      <Layout>
                        <TaskDetailPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employees/:employeeId/offboarding"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager']}>
                      <Layout>
                        <OffboardingTaskListPage />
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
                        <EmployeeDocumentsListPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employees/:employeeId/documents/upload"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager']}>
                      <Layout>
                        <UploadDocumentPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employees/:employeeId/documents/:documentId"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager']}>
                      <Layout>
                        <DocumentDetailPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/policies"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <CompanyPoliciesPage />
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
                        <TrainingProgramsListPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/training/programs/:id"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager', 'training_manager']}>
                      <Layout>
                        <ProgramDetailPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/training/programs/create"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager', 'training_manager']}>
                      <Layout>
                        <CreateEditJobPostingPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/training/programs/:id/edit"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager', 'training_manager']}>
                      <Layout>
                        <CreateEditJobPostingPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employees/:employeeId/training"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager', 'manager']}>
                      <Layout>
                        <EmployeeTrainingRecordsPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employees/:employeeId/training/upload"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager']}>
                      <Layout>
                        <UploadCertificatesPage />
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
                        <DisciplinaryActionsListPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/disciplinary/actions/:id"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager']}>
                      <Layout>
                        <DisciplinaryActionDetailPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/disciplinary/actions/create"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager']}>
                      <Layout>
                        <CreateEditDisciplinaryActionPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/disciplinary/actions/:id/edit"
                  element={
                    <ProtectedRoute allowedRoles={['admin', 'hr_manager']}>
                      <Layout>
                        <CreateEditDisciplinaryActionPage />
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
                        <AuditLogsPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings/system"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <Layout>
                        <SystemSettingsPage />
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