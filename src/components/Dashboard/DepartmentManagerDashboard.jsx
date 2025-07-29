import React from 'react';
import { Users, Calendar, Clock, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from '../UI/Card';

const DepartmentManagerDashboard = () => {
  const stats = [
    { label: 'Team Members', value: '24', change: '+2%', icon: Users, color: 'primary' },
    { label: 'Present Today', value: '22', change: '+5%', icon: Calendar, color: 'success' },
    { label: 'Pending Approvals', value: '5', change: '-20%', icon: Clock, color: 'warning' },
    { label: 'Team Performance', value: '92%', change: '+8%', icon: TrendingUp, color: 'secondary' },
  ];

  const teamAttendance = [
    { name: 'Week 1', present: 95, absent: 5 },
    { name: 'Week 2', present: 88, absent: 12 },
    { name: 'Week 3', present: 92, absent: 8 },
    { name: 'Week 4', present: 96, absent: 4 },
  ];

  const leaveRequests = [
    { type: 'Approved', value: 12, color: '#10b981' },
    { type: 'Pending', value: 5, color: '#f59e0b' },
    { type: 'Rejected', value: 2, color: '#ef4444' },
  ];

  const teamMembers = [
    { id: 1, name: 'Alice Johnson', role: 'Senior Developer', status: 'present', performance: 95 },
    { id: 2, name: 'Bob Smith', role: 'Developer', status: 'present', performance: 88 },
    { id: 3, name: 'Carol Davis', role: 'QA Engineer', status: 'leave', performance: 92 },
    { id: 4, name: 'David Wilson', role: 'Developer', status: 'present', performance: 87 },
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-success-500" />;
      case 'leave':
        return <Clock className="h-4 w-4 text-warning-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-error-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Department Manager Dashboard</h1>
        <p className="text-neutral-600 dark:text-neutral-400">Team performance and management overview</p>
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
        {/* Team Attendance */}
        <Card>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            Team Attendance Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={teamAttendance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="present" fill="#10b981" name="Present %" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Leave Requests */}
        <Card>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            Leave Requests Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={leaveRequests}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ type, value }) => `${type}: ${value}`}
              >
                {leaveRequests.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Team Members */}
      <Card>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          Team Members
        </h3>
        <div className="space-y-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-4 rounded-lg bg-neutral-50 dark:bg-neutral-700">
              <div className="flex items-center space-x-3">
                {getStatusIcon(member.status)}
                <div>
                  <p className="font-medium text-neutral-900 dark:text-white">{member.name}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{member.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">Performance</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{member.performance}%</p>
                </div>
                <div className="w-16 bg-neutral-200 dark:bg-neutral-600 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${member.performance}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DepartmentManagerDashboard;