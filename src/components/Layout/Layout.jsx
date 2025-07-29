import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Building2, 
  Menu, 
  X,
  LayoutDashboard, 
  Users, 
  Calendar, 
  DollarSign, 
  UserPlus, 
  BarChart3, 
  User, 
  Settings, 
  LogOut,
  FileText,
  Clock,
  Award,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleMenuClick = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  const toggleDesktopSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getNavigationItems = () => {
    const baseItems = [
      { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    ];

    switch (user?.role) {
      case 'admin':
        return [
          ...baseItems,
          { path: '/employees', icon: Users, label: 'Employee Management' },
          { path: '/attendance', icon: Calendar, label: 'Attendance' },
          { path: '/payroll', icon: DollarSign, label: 'Payroll' },
          { path: '/recruitment', icon: UserPlus, label: 'Recruitment' },
          { path: '/analytics', icon: BarChart3, label: 'Analytics' },
          { path: '/settings', icon: Settings, label: 'Settings' },
        ];
      case 'hr_manager':
        return [
          ...baseItems,
          { path: '/employees', icon: Users, label: 'Employees' },
          { path: '/attendance', icon: Calendar, label: 'Attendance' },
          { path: '/payroll', icon: DollarSign, label: 'Payroll' },
          { path: '/recruitment', icon: UserPlus, label: 'Recruitment' },
          { path: '/analytics', icon: BarChart3, label: 'Reports' },
        ];
      case 'department_manager':
        return [
          ...baseItems,
          { path: '/team', icon: Users, label: 'My Team' },
          { path: '/attendance', icon: Calendar, label: 'Team Attendance' },
          { path: '/leave-approvals', icon: Clock, label: 'Leave Approvals' },
          { path: '/performance', icon: Award, label: 'Performance' },
        ];
      case 'employee':
        return [
          ...baseItems,
          { path: '/profile', icon: User, label: 'My Profile' },
          { path: '/attendance', icon: Calendar, label: 'My Attendance' },
          { path: '/payroll', icon: DollarSign, label: 'Payslips' },
          { path: '/documents', icon: FileText, label: 'Documents' },
          { path: '/requests', icon: Clock, label: 'Requests' },
        ];
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  const handleLogout = () => {
    logout();
    closeMobileSidebar();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-900 flex">
      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex flex-col ${sidebarOpen ? 'w-64' : 'w-20'} bg-white dark:bg-slate-800 shadow-lg transition-all duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          {sidebarOpen ? (
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <span className="ml-3 text-xl font-bold text-slate-900 dark:text-white">NexaHR</span>
            </div>
          ) : (
            <Building2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mx-auto" />
          )}
          <button 
            onClick={toggleDesktopSidebar}
            className="p-1 rounded-md text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            {sidebarOpen ? (
              <ChevronDown className="h-5 w-5 transform rotate-90" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* User info */}
        <div className="flex items-center p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300">
            {user?.name?.charAt(0) || 'U'}
          </div>
          {sidebarOpen && (
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                {user?.role?.replace('_', ' ') || 'Role'}
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <nav className="space-y-1 p-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center p-3 rounded-lg transition-colors duration-200
                    ${isActive 
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700/50'
                    }
                  `}
                >
                  <Icon className={`h-5 w-5 ${sidebarOpen ? 'mr-3' : 'mx-auto'}`} />
                  {sidebarOpen && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Logout - Fixed at bottom */}
        <div className="mt-auto p-2 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={handleLogout}
            className={`
              flex items-center w-full p-3 rounded-lg transition-colors duration-200
              text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700/50
            `}
          >
            <LogOut className={`h-5 w-5 ${sidebarOpen ? 'mr-3' : 'mx-auto'}`} />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-800 shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:hidden
      `}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <span className="ml-3 text-xl font-bold text-slate-900 dark:text-white">NexaHR</span>
            </div>
            <button 
              onClick={closeMobileSidebar}
              className="p-1 rounded-md text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* User info */}
          <div className="flex items-center p-4 border-b border-slate-200 dark:border-slate-700">
            <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                {user?.role?.replace('_', ' ') || 'Role'}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            <nav className="space-y-1 p-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={closeMobileSidebar}
                    className={`
                      flex items-center p-3 rounded-lg text-sm font-medium transition-colors duration-200
                      ${isActive 
                        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700/50'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Logout - Fixed at bottom */}
          <div className="mt-auto p-2 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-3 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700/50 transition-colors duration-200"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'} transition-all duration-300 ease-in-out`}>
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button 
                onClick={handleMenuClick}
                className="mr-4 p-1 rounded-md text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
                {location.pathname.split('/')[1] ? 
                  location.pathname.split('/')[1].charAt(0).toUpperCase() + location.pathname.split('/')[1].slice(1) : 
                  'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-1 rounded-full text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
                <Clock className="h-5 w-5" />
              </button>
              <div className="relative">
                <button className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                    <span>{user?.name?.charAt(0) || 'U'}</span>
                  </div>
                  {sidebarOpen && (
                    <ChevronDown className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-slate-50 dark:bg-slate-900/50 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;