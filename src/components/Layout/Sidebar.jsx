import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  Users,
  Building2,
  Clock,
  Calendar,
  DollarSign,
  UserPlus,
  Target,
  FileText,
  GraduationCap,
  AlertTriangle,
  Settings,
  UserMinus,
  MessageSquare,
  BarChart3,
  Shield,
  Bell
} from 'lucide-react';

const Sidebar = () => {
  const { user, hasRole } = useAuth();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', roles: ['admin', 'hr', 'manager', 'employee'] },
    { name: 'Employees', icon: Users, path: '/employees', roles: ['admin', 'hr', 'manager'] },
    { name: 'Departments', icon: Building2, path: '/departments', roles: ['admin', 'hr'] },
    { name: 'Attendance', icon: Clock, path: '/attendance', roles: ['admin', 'hr', 'manager', 'employee'] },
    { name: 'Leave Management', icon: Calendar, path: '/leave', roles: ['admin', 'hr', 'manager', 'employee'] },
    { name: 'Payroll', icon: DollarSign, path: '/payroll', roles: ['admin', 'hr'] },
    { name: 'Recruitment', icon: UserPlus, path: '/recruitment', roles: ['admin', 'hr'] },
    { name: 'Performance', icon: Target, path: '/performance', roles: ['admin', 'hr', 'manager'] },
    { name: 'Documents', icon: FileText, path: '/documents', roles: ['admin', 'hr', 'manager', 'employee'] },
    { name: 'Training', icon: GraduationCap, path: '/training', roles: ['admin', 'hr', 'manager', 'employee'] },
    { name: 'Disciplinary', icon: AlertTriangle, path: '/disciplinary', roles: ['admin', 'hr', 'manager'] },
    { name: 'Onboarding', icon: UserPlus, path: '/onboarding', roles: ['admin', 'hr'] },
    { name: 'Offboarding', icon: UserMinus, path: '/offboarding', roles: ['admin', 'hr'] },
    { name: 'Interviews', icon: MessageSquare, path: '/interviews', roles: ['admin', 'hr'] },
    { name: 'Reports', icon: BarChart3, path: '/reports', roles: ['admin', 'hr', 'manager'] },
    { name: 'Audit Logs', icon: Shield, path: '/audit-logs', roles: ['admin'] },
    { name: 'Notifications', icon: Bell, path: '/notifications', roles: ['admin', 'hr', 'manager', 'employee'] },
    { name: 'Settings', icon: Settings, path: '/settings', roles: ['admin'] }
  ];

  const filteredMenuItems = menuItems.filter(item => hasRole(item.roles));

  return (
    <div className="bg-white w-64 shadow-lg flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">HRMS</h1>
        <p className="text-sm text-gray-600 mt-1">{user?.name}</p>
        <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mt-2 capitalize">
          {user?.role}
        </span>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {filteredMenuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;