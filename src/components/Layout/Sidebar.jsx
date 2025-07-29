import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  DollarSign, 
  UserPlus, 
  BarChart3, 
  User, 
  Settings, 
  LogOut,
  Building2,
  FileText,
  Clock,
  Award
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

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
    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-64 bg-white dark:bg-neutral-800 shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
            <Building2 className="h-8 w-8 text-primary-600" />
            <span className="ml-3 text-xl font-semibold text-neutral-900 dark:text-white">
              HRMS
            </span>
          </div>

          {/* User info */}
          <div className="flex items-center px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                {user?.name}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 capitalize">
                {user?.role?.replace('_', ' ')}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-4 py-4 overflow-y-auto">
            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={`
                      flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                      ${isActive 
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-700'
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

          {/* Logout */}
          <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-700 transition-colors duration-200"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;