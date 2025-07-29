import React, { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  UserPlus, 
  Clock,
  AlertTriangle,
  CheckCircle,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';

const Card = ({ children, className = '', ...props }) => (
  <div className={`bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`} {...props}>
    {children}
  </div>
);

const AdminDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('month');

  // Enhanced mock data
  const stats = [
    { 
      label: 'Total Employees', 
      value: '1,234', 
      change: '+12%', 
      trend: 'up',
      icon: Users, 
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    { 
      label: 'Monthly Payroll', 
      value: '$485K', 
      change: '+5%', 
      trend: 'up',
      icon: DollarSign, 
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    },
    { 
      label: 'Present Today', 
      value: '1,180', 
      change: '+2%', 
      trend: 'up',
      icon: Calendar, 
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    { 
      label: 'Open Positions', 
      value: '23', 
      change: '-15%', 
      trend: 'down',
      icon: UserPlus, 
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600'
    },
  ];

  const monthlyData = [
    { month: 'Jan', employees: 1100, payroll: 420, growth: 5.2 },
    { month: 'Feb', employees: 1150, payroll: 445, growth: 4.5 },
    { month: 'Mar', employees: 1200, payroll: 465, growth: 4.3 },
    { month: 'Apr', employees: 1234, payroll: 485, growth: 2.8 },
    { month: 'May', employees: 1280, payroll: 502, growth: 3.7 },
    { month: 'Jun', employees: 1320, payroll: 520, growth: 3.1 },
  ];

  const departmentData = [
    { name: 'Engineering', value: 45, color: '#3b82f6', employees: 556 },
    { name: 'Sales', value: 25, color: '#10b981', employees: 309 },
    { name: 'Marketing', value: 15, color: '#f59e0b', employees: 185 },
    { name: 'HR', value: 10, color: '#ef4444', employees: 123 },
    { name: 'Other', value: 5, color: '#6b7280', employees: 61 },
  ];

  const recentActivities = [
    { 
      id: 1, 
      type: 'success', 
      message: 'John Doe completed onboarding process', 
      time: '2 hours ago',
      user: 'John Doe',
      department: 'Engineering'
    },
    { 
      id: 2, 
      type: 'warning', 
      message: '5 leave requests pending approval from managers', 
      time: '4 hours ago',
      user: 'Multiple Users',
      department: 'Various'
    },
    { 
      id: 3, 
      type: 'info', 
      message: 'Monthly payroll processed successfully', 
      time: '1 day ago',
      user: 'System',
      department: 'Finance'
    },
    { 
      id: 4, 
      type: 'error', 
      message: '3 employees marked absent without notification', 
      time: '2 days ago',
      user: 'HR System',
      department: 'Operations'
    },
  ];

  const getActivityIcon = (type) => {
    const iconClass = "h-5 w-5";
    switch (type) {
      case 'success':
        return <CheckCircle className={`${iconClass} text-emerald-500`} />;
      case 'warning':
        return <AlertTriangle className={`${iconClass} text-amber-500`} />;
      case 'error':
        return <AlertTriangle className={`${iconClass} text-red-500`} />;
      default:
        return <Clock className={`${iconClass} text-blue-500`} />;
    }
  };

  const getActivityBg = (type) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-50 border-emerald-100';
      case 'warning':
        return 'bg-amber-50 border-amber-100';
      case 'error':
        return 'bg-red-50 border-red-100';
      default:
        return 'bg-blue-50 border-blue-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-slate-600 mt-2 text-lg">
              Overview of system-wide metrics and activities
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md">
              <Filter className="h-4 w-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl">
              <Download className="h-4 w-4" />
              <span className="text-sm font-medium">Export</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === 'up' ? ArrowUpRight : ArrowDownRight;
            return (
              <Card key={stat.label} className="p-6 hover:scale-105 transition-transform duration-300 group">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <MoreVertical className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                      </button>
                    </div>
                    
                    <p className="text-sm font-medium text-slate-600 mb-2">
                      {stat.label}
                    </p>
                    
                    <div className="flex items-end justify-between">
                      <p className="text-3xl font-bold text-slate-900 mb-1">
                        {stat.value}
                      </p>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${stat.bgColor}`}>
                        <TrendIcon className={`h-4 w-4 ${stat.textColor}`} />
                        <span className={`text-sm font-semibold ${stat.textColor}`}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Monthly Trends - Takes 2 columns */}
          <Card className="xl:col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Monthly Growth Trends</h3>
                <p className="text-slate-600 text-sm mt-1">Employee count and payroll over time</p>
              </div>
              <div className="flex items-center space-x-2">
                {['week', 'month', 'quarter'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedTimeRange(range)}
                    className={`px-3 py-1 text-sm font-medium rounded-lg transition-all duration-200 ${
                      selectedTimeRange === range
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="employeeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="payrollGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fill: '#64748b' }} />
                <YAxis tick={{ fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Area
                  type="monotone"
                  dataKey="employees"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#employeeGradient)"
                  name="Employees"
                />
                <Area
                  type="monotone"
                  dataKey="payroll"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#payrollGradient)"
                  name="Payroll (K)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Department Distribution */}
          <Card className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">Department Distribution</h3>
              <p className="text-slate-600 text-sm mt-1">Employee allocation by department</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value, name) => [`${value}%`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {departmentData.map((dept, index) => (
                <div key={dept.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: dept.color }}
                    />
                    <span className="text-sm font-medium text-slate-700">{dept.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-900">{dept.value}%</span>
                    <p className="text-xs text-slate-500">{dept.employees} emp</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Recent Activities</h3>
              <p className="text-slate-600 text-sm mt-1">Latest system updates and notifications</p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div 
                key={activity.id} 
                className={`flex items-start space-x-4 p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${getActivityBg(activity.type)}`}
              >
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 mb-1">
                    {activity.message}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-slate-600">
                    <span>{activity.time}</span>
                    <span>•</span>
                    <span>{activity.user}</span>
                    <span>•</span>
                    <span className="px-2 py-1 bg-white/70 rounded-md font-medium">
                      {activity.department}
                    </span>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <MoreVertical className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;