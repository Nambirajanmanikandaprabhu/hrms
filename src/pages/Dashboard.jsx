import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdminDashboard from '../components/Dashboard/AdminDashboard';
import HRManagerDashboard from '../components/Dashboard/HRManagerDashboard';
import DepartmentManagerDashboard from '../components/Dashboard/DepartmentManagerDashboard';
import EmployeeDashboard from '../components/Dashboard/EmployeeDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'hr_manager':
        return <HRManagerDashboard />;
      case 'department_manager':
        return <DepartmentManagerDashboard />;
      case 'employee':
        return <EmployeeDashboard />;
      default:
        return <div>Dashboard not available for your role.</div>;
    }
  };

  return (
    <div className="space-y-6">
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;