import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import StatsCards from '../../components/Dashboard/StatsCards';
import AttendanceChart from '../../components/Dashboard/AttendanceChart';
import LeaveChart from '../../components/Dashboard/LeaveChart';
import RecentActivities from '../../components/Dashboard/RecentActivities';
import QuickActions from '../../components/Dashboard/QuickActions';

const Dashboard = () => {
  const { user, hasRole } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-sm p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-blue-100">
          {hasRole(['admin', 'hr']) 
            ? 'Here\'s what\'s happening in your organization today.' 
            : 'Here\'s your personal dashboard overview.'
          }
        </p>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-6">
          <AttendanceChart />
          {hasRole(['admin', 'hr', 'manager']) && <LeaveChart />}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <QuickActions />
          <RecentActivities />
        </div>
      </div>

      {/* Additional Admin/HR Content */}
      {hasRole(['admin', 'hr']) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Open Positions</h3>
            <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
            <p className="text-sm text-gray-600">Active job postings</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Applications</h3>
            <div className="text-3xl font-bold text-green-600 mb-2">47</div>
            <p className="text-sm text-gray-600">Pending review</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Onboarding</h3>
            <div className="text-3xl font-bold text-orange-600 mb-2">8</div>
            <p className="text-sm text-gray-600">New hires this month</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Training</h3>
            <div className="text-3xl font-bold text-purple-600 mb-2">156</div>
            <p className="text-sm text-gray-600">Enrolled employees</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;