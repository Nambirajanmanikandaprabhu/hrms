import React from 'react';
import { Clock, User, Calendar, FileText } from 'lucide-react';

const RecentActivities = () => {
  const activities = [
    {
      id: 1,
      type: 'attendance',
      message: 'John Doe clocked in',
      time: '2 minutes ago',
      icon: Clock,
      color: 'text-green-600 bg-green-50'
    },
    {
      id: 2,
      type: 'leave',
      message: 'Sarah Johnson applied for leave',
      time: '15 minutes ago',
      icon: Calendar,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 3,
      type: 'employee',
      message: 'New employee Mike Wilson joined',
      time: '1 hour ago',
      icon: User,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      id: 4,
      type: 'document',
      message: 'Payroll report generated',
      time: '2 hours ago',
      icon: FileText,
      color: 'text-orange-600 bg-orange-50'
    },
    {
      id: 5,
      type: 'leave',
      message: 'Alex Brown leave approved',
      time: '3 hours ago',
      icon: Calendar,
      color: 'text-green-600 bg-green-50'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.color}`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.message}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
        View all activities
      </button>
    </div>
  );
};

export default RecentActivities;