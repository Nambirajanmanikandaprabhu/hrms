import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp,
  Award,
  Target,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Play,
  Download,
  Bell,
  Star
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';

const Card = ({ children, className = '', ...props }) => (
  <div className={`bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`} {...props}>
    {children}
  </div>
);

const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:ring-4 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-200 shadow-lg hover:shadow-xl hover:scale-105',
    outline: 'border-2 border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus:ring-blue-200 hover:scale-105',
    ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-200'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const EmployeeDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animationDelay, setAnimationDelay] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { 
      label: 'Attendance This Month', 
      value: '22/24', 
      change: '+8.5%', 
      trend: 'up',
      icon: Calendar, 
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      percentage: 92
    },
    { 
      label: 'Leave Balance', 
      value: '18', 
      change: 'days left', 
      trend: 'stable',
      icon: Clock, 
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      percentage: 75
    },
    { 
      label: 'Last Payslip', 
      value: '$4,500', 
      change: '+12%', 
      trend: 'up',
      icon: DollarSign, 
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      percentage: 100
    },
    { 
      label: 'Performance Score', 
      value: '94', 
      change: '+5 points', 
      trend: 'up',
      icon: Award, 
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      percentage: 94
    },
  ];

  const attendanceData = [
    { week: 'Week 1', days: 5, target: 5, efficiency: 100 },
    { week: 'Week 2', days: 4, target: 5, efficiency: 80 },
    { week: 'Week 3', days: 5, target: 5, efficiency: 100 },
    { week: 'Week 4', days: 5, target: 5, efficiency: 100 },
    { week: 'Week 5', days: 3, target: 3, efficiency: 100 },
  ];

  const performanceData = [
    { month: 'Jan', score: 85 },
    { month: 'Feb', score: 88 },
    { month: 'Mar', score: 92 },
    { month: 'Apr', score: 94 },
  ];

  const recentActivities = [
    { 
      id: 1, 
      type: 'success', 
      message: 'Timesheet submitted for March', 
      time: '2 hours ago',
      action: 'Completed',
      priority: 'high'
    },
    { 
      id: 2, 
      type: 'info', 
      message: 'Payslip available for download', 
      time: '1 day ago',
      action: 'Available',
      priority: 'medium'
    },
    { 
      id: 3, 
      type: 'warning', 
      message: 'Performance review due next week', 
      time: '3 days ago',
      action: 'Pending',
      priority: 'high'
    },
  ];

  const upcomingEvents = [
    { 
      id: 1, 
      title: 'Team Standup Meeting', 
      date: 'Today', 
      time: '2:00 PM', 
      type: 'meeting',
      participants: 8,
      location: 'Conference Room A'
    },
    { 
      id: 2, 
      title: 'Performance Review', 
      date: 'Tomorrow', 
      time: '10:00 AM', 
      type: 'review',
      participants: 2,
      location: 'Manager Office'
    },
    { 
      id: 3, 
      title: 'React Training Session', 
      date: 'Friday', 
      time: '3:00 PM', 
      type: 'training',
      participants: 15,
      location: 'Training Room'
    },
  ];

  const quickActions = [
    { 
      label: 'Request Leave', 
      icon: Calendar, 
      color: 'from-blue-500 to-blue-600',
      description: 'Submit a new leave request'
    },
    { 
      label: 'Submit Timesheet', 
      icon: Clock, 
      color: 'from-emerald-500 to-emerald-600',
      description: 'Log your daily hours'
    },
    { 
      label: 'View Payslip', 
      icon: DollarSign, 
      color: 'from-purple-500 to-purple-600',
      description: 'Download salary details'
    },
    { 
      label: 'Update Profile', 
      icon: FileText, 
      color: 'from-amber-500 to-amber-600',
      description: 'Manage your information'
    },
  ];

  const getActivityIcon = (type) => {
    const iconClass = "h-5 w-5";
    switch (type) {
      case 'success':
        return <CheckCircle className={`${iconClass} text-emerald-500`} />;
      case 'warning':
        return <AlertTriangle className={`${iconClass} text-amber-500`} />;
      case 'info':
        return <Bell className={`${iconClass} text-blue-500`} />;
      default:
        return <Clock className={`${iconClass} text-slate-500`} />;
    }
  };

  const getActivityBg = (type) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-50 border-emerald-100';
      case 'warning':
        return 'bg-amber-50 border-amber-100';
      case 'info':
        return 'bg-blue-50 border-blue-100';
      default:
        return 'bg-slate-50 border-slate-100';
    }
  };

  const getEventTypeConfig = (type) => {
    switch (type) {
      case 'meeting':
        return { bg: 'bg-blue-100', text: 'text-blue-700', icon: '🤝' };
      case 'review':
        return { bg: 'bg-amber-100', text: 'text-amber-700', icon: '📊' };
      case 'training':
        return { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: '🎓' };
      default:
        return { bg: 'bg-slate-100', text: 'text-slate-700', icon: '📅' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Welcome back, John! 👋
            </h1>
            <p className="text-slate-600 text-lg">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })} • {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Data</span>
            </Button>
            <Button className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Set Goals</span>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === 'up' ? ArrowUpRight : ArrowDownRight;
            
            return (
              <Card 
                key={stat.label} 
                className="p-6 hover:scale-105 transition-all duration-300 group relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300" 
                     style={{ background: `linear-gradient(135deg, ${stat.color.split(' ')[1]}, ${stat.color.split(' ')[3]})` }} />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    {stat.trend === 'up' && (
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${stat.bgColor}`}>
                        <TrendIcon className={`h-4 w-4 ${stat.textColor}`} />
                        <span className={`text-sm font-semibold ${stat.textColor}`}>
                          {stat.change}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm font-medium text-slate-600 mb-2">
                    {stat.label}
                  </p>
                  
                  <p className="text-3xl font-bold text-slate-900 mb-3">
                    {stat.value}
                  </p>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${stat.color} transition-all duration-1000 ease-out`}
                      style={{ width: `${stat.percentage}%` }}
                    />
                  </div>
                  
                  <p className="text-xs text-slate-500">
                    {stat.percentage}% of target
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Attendance Chart - Takes 2 columns */}
          <Card className="xl:col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Monthly Attendance</h3>
                <p className="text-slate-600 text-sm mt-1">Your attendance pattern this month</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-slate-600">Present</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
                  <span className="text-slate-600">Target</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <defs>
                  <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="week" tick={{ fill: '#64748b' }} />
                <YAxis domain={[0, 5]} tick={{ fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Bar 
                  dataKey="days" 
                  fill="url(#attendanceGradient)" 
                  name="Days Present" 
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Performance Trend */}
          <Card className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">Performance Trend</h3>
              <p className="text-slate-600 text-sm mt-1">Your monthly performance scores</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="performanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fill: '#64748b' }} />
                <YAxis domain={[80, 100]} tick={{ fill: '#64748b' }} />
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
                  dataKey="score"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#performanceGradient)"
                  name="Performance Score"
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-purple-50 rounded-xl">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">
                  +6.8% improvement this quarter
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900">Quick Actions</h3>
            <p className="text-slate-600 text-sm mt-1">Frequently used tools and shortcuts</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              
              return (
                <button
                  key={action.label}
                  className="group p-6 text-left rounded-xl border-2 border-slate-200 hover:border-transparent hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm relative overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-2 group-hover:text-slate-800">
                      {action.label}
                    </h4>
                    <p className="text-sm text-slate-600 group-hover:text-slate-700">
                      {action.description}
                    </p>
                  </div>
                  
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="h-4 w-4 text-slate-400" />
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Recent Activities</h3>
                <p className="text-slate-600 text-sm mt-1">Your latest actions and updates</p>
              </div>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div 
                  key={activity.id} 
                  className={`flex items-start space-x-4 p-4 rounded-xl border transition-all duration-300 hover:shadow-md ${getActivityBg(activity.type)}`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-medium text-slate-900 mb-1">
                        {activity.message}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        activity.priority === 'high' ? 'bg-red-100 text-red-700' :
                        activity.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {activity.priority}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-slate-600">
                      <span>{activity.time}</span>
                      <span>•</span>
                      <span className="px-2 py-1 bg-white/70 rounded-md font-medium">
                        {activity.action}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Events */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Upcoming Events</h3>
                <p className="text-slate-600 text-sm mt-1">Your schedule for the coming days</p>
              </div>
              <Button variant="ghost" size="sm">View Calendar</Button>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => {
                const typeConfig = getEventTypeConfig(event.type);
                
                return (
                  <div 
                    key={event.id} 
                    className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50/80 border border-slate-200/60 hover:bg-white hover:shadow-md transition-all duration-300 group"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 ${typeConfig.bg} rounded-xl flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300`}>
                        {typeConfig.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-slate-900 group-hover:text-slate-800">
                            {event.title}
                          </p>
                          <p className="text-sm text-slate-600 mt-1">
                            {event.date} at {event.time}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            📍 {event.location} • {event.participants} participants
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeConfig.bg} ${typeConfig.text}`}>
                            {event.type}
                          </span>
                          <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-1 hover:bg-slate-200 rounded-lg">
                            <Play className="h-4 w-4 text-slate-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default EmployeeDashboard;