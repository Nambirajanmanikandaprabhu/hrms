import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import StatsCards from '../../components/Dashboard/StatsCards';
import AttendanceChart from '../../components/Dashboard/AttendanceChart';
import LeaveChart from '../../components/Dashboard/LeaveChart';
import RecentActivities from '../../components/Dashboard/RecentActivities';
import QuickActions from '../../components/Dashboard/QuickActions';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Dashboard content */}
    </div>
  );
};

export default Dashboard;