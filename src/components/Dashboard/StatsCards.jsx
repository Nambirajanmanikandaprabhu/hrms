import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Users, UserCheck, Calendar, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

const StatsCards = () => {
  const { hasRole } = useAuth();

  const adminStats = [
    { title: 'Total Employees', value: '1,247', change: '+12%', trend: 'up', icon: Users, color: 'blue' },
    { title: 'Present Today', value: '1,156', change: '+2.3%', trend: 'up', icon: UserCheck, color: 'green' },
    { title: 'Pending Leaves', value: '23', change: '-5%', trend: 'down', icon: Calendar, color: 'orange' },
    { title: 'Monthly Payroll', value: '$2.1M', change: '+8.2%', trend: 'up', icon: DollarSign, color: 'purple' }
  ];

  const employeeStats = [
    { title: 'My Attendance', value: '22/23', change: '95.6%', trend: 'up', icon: UserCheck, color: 'green' },
    { title: 'Leave Balance', value: '15 days', change: '', trend: 'neutral', icon: Calendar, color: 'blue' },
    { title: 'This Month', value: '184 hrs', change: '+2hrs', trend: 'up', icon: TrendingUp, color: 'purple' },
    { title: 'Pending Tasks', value: '3', change: '-2', trend: 'down', icon: AlertCircle, color: 'orange' }
  ];

  const stats = hasRole(['admin', 'hr']) ? adminStats : employeeStats;

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-600 bg-blue-50',
      green: 'bg-green-500 text-green-600 bg-green-50',
      orange: 'bg-orange-500 text-orange-600 bg-orange-50',
      purple: 'bg-purple-500 text-purple-600 bg-purple-50'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const colorClasses = getColorClasses(stat.color).split(' ');
        const iconBg = colorClasses[0];
        const textColor = colorClasses[1];
        const bgColor = colorClasses[2];

        return (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                {stat.change && (
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 
                      stat.trend === 'down' ? 'text-red-600' : 
                      'text-gray-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">vs last month</span>
                  </div>
                )}
              </div>
              <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`h-6 w-6 ${textColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;