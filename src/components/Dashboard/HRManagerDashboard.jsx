import React from 'react';
import { Users, UserPlus, Calendar, Clock, TrendingUp, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Card from '../UI/Card';

const HRManagerDashboard = () => {
  const stats = [
    { label: 'Active Employees', value: '1,234', change: '+12%', icon: Users, color: 'primary' },
    { label: 'Open Positions', value: '23', change: '-5%', icon: UserPlus, color: 'warning' },
    { label: 'Pending Leaves', value: '18', change: '+8%', icon: Calendar, color: 'secondary' },
    { label: 'Avg. Response Time', value: '2.4h', change: '-15%', icon: Clock, color: 'success' },
  ];

  const recruitmentData = [
    { month: 'Jan', applications: 45, hired: 12 },
    { month: 'Feb', applications: 52, hired: 15 },
    { month: 'Mar', applications: 38, hired: 10 },
    { month: 'Apr', applications: 41, hired: 13 },
  ];

  const attendanceData = [
    { day: 'Mon', present: 95, absent: 5 },
    { day: 'Tue', present: 92, absent: 8 },
    { day: 'Wed', present: 88, absent: 12 },
    { day: 'Thu', present: 94, absent: 6 },
    { day: 'Fri', present: 89, absent: 11 },
  ];

  const getStatColor = (color) => {
    const colors = {
      primary: 'bg-primary-500',
      success: 'bg-success-500',
      secondary: 'bg-secondary-500',
      warning: 'bg-warning-500',
    };
    return colors[color];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">HR Manager Dashboard</h1>
        <p className="text-neutral-600 dark:text-neutral-400">Recruitment pipeline and HR metrics overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${getStatColor(stat.color)}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    {stat.label}
                  </p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                      {stat.value}
                    </p>
                    <span className={`ml-2 text-sm ${
                      stat.change.startsWith('+') ? 'text-success-600' : 'text-error-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recruitment Pipeline */}
        <Card>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            Recruitment Pipeline
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={recruitmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="applications" fill="#3b82f6" name="Applications" radius={[4, 4, 0, 0]} />
              <Bar dataKey="hired" fill="#10b981" name="Hired" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Weekly Attendance */}
        <Card>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            Weekly Attendance (%)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="present" stroke="#10b981" strokeWidth={3} name="Present" />
              <Line type="monotone" dataKey="absent" stroke="#ef4444" strokeWidth={3} name="Absent" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer">
          <div className="flex items-center">
            <UserPlus className="h-8 w-8 text-primary-600" />
            <div className="ml-4">
              <h4 className="font-semibold text-neutral-900 dark:text-white">Post New Job</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Create and publish job openings</p>
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer">
          <div className="flex items-center">
            <Award className="h-8 w-8 text-success-600" />
            <div className="ml-4">
              <h4 className="font-semibold text-neutral-900 dark:text-white">Performance Review</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Schedule employee evaluations</p>
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-secondary-600" />
            <div className="ml-4">
              <h4 className="font-semibold text-neutral-900 dark:text-white">Generate Report</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Create HR analytics reports</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HRManagerDashboard;