import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Clock, Calendar, FileText, Users, UserPlus } from 'lucide-react';

const QuickActions = () => {
  const { hasRole } = useAuth();

  const adminActions = [
    { title: 'Add Employee', icon: UserPlus, color: 'bg-blue-500 hover:bg-blue-600', action: () => console.log('Add Employee') },
    { title: 'Create Department', icon: Plus, color: 'bg-green-500 hover:bg-green-600', action: () => console.log('Create Department') },
    { title: 'Generate Report', icon: FileText, color: 'bg-purple-500 hover:bg-purple-600', action: () => console.log('Generate Report') },
    { title: 'Manage Payroll', icon: Users, color: 'bg-orange-500 hover:bg-orange-600', action: () => console.log('Manage Payroll') }
  ];

  const employeeActions = [
    { title: 'Clock In/Out', icon: Clock, color: 'bg-green-500 hover:bg-green-600', action: () => console.log('Clock In/Out') },
    { title: 'Apply Leave', icon: Calendar, color: 'bg-blue-500 hover:bg-blue-600', action: () => console.log('Apply Leave') },
    { title: 'View Payslip', icon: FileText, color: 'bg-purple-500 hover:bg-purple-600', action: () => console.log('View Payslip') },
    { title: 'Update Profile', icon: Users, color: 'bg-orange-500 hover:bg-orange-600', action: () => console.log('Update Profile') }
  ];

  const actions = hasRole(['admin', 'hr']) ? adminActions : employeeActions;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg text-white transition-colors duration-200 ${action.color}`}
          >
            <action.icon className="h-5 w-5" />
            <span className="font-medium">{action.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;