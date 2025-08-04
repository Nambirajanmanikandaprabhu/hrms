import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserPlus, CheckCircle, Clock, AlertCircle, Plus, Eye, Edit, Calendar } from 'lucide-react';

const OnboardingList = () => {
  const { user, hasRole } = useAuth();
  const [onboardingTasks, setOnboardingTasks] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tasks');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Mock data - replace with API calls
    const mockTasks = [
      {
        id: '1',
        employee: { firstName: 'John', lastName: 'Doe', employeeId: 'EMP001' },
        assignee: { firstName: 'Sarah', lastName: 'Wilson' },
        title: 'Complete IT Setup',
        description: 'Set up laptop, email account, and system access',
        dueDate: '2024-02-01T00:00:00Z',
        status: 'PENDING',
        completedAt: null,
        notes: 'Waiting for IT department',
        sortOrder: 1,
        createdAt: '2024-01-15T10:00:00Z'
      },
      {
        id: '2',
        employee: { firstName: 'John', lastName: 'Doe', employeeId: 'EMP001' },
        assignee: { firstName: 'Mike', lastName: 'Johnson' },
        title: 'HR Orientation',
        description: 'Complete HR orientation and policy review',
        dueDate: '2024-01-30T00:00:00Z',
        status: 'COMPLETED',
        completedAt: '2024-01-29T14:30:00Z',
        notes: 'Successfully completed orientation',
        sortOrder: 2,
        createdAt: '2024-01-15T10:00:00Z'
      },
      {
        id: '3',
        employee: { firstName: 'Alice', lastName: 'Smith', employeeId: 'EMP005' },
        assignee: { firstName: 'Sarah', lastName: 'Wilson' },
        title: 'Department Introduction',
        description: 'Meet team members and understand department structure',
        dueDate: '2024-02-05T00:00:00Z',
        status: 'IN_PROGRESS',
        completedAt: null,
        notes: 'Scheduled meetings with team leads',
        sortOrder: 1,
        createdAt: '2024-01-20T09:00:00Z'
      }
    ];

    const mockTemplates = [
      {
        id: '1',
        name: 'Software Engineer Onboarding',
        description: 'Standard onboarding process for software engineers',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        name: 'Manager Onboarding',
        description: 'Comprehensive onboarding for management positions',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
      }
    ];

    setTimeout(() => {
      setOnboardingTasks(mockTasks);
      setTemplates(mockTemplates);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'COMPLETED': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'IN_PROGRESS': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'PENDING': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'CANCELLED': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredTasks = onboardingTasks.filter(task => {
    if (filterStatus !== 'all' && task.status !== filterStatus) {
      return false;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employee Onboarding</h1>
          <p className="text-gray-600">Manage new employee onboarding process and tasks</p>
        </div>
        {hasRole(['admin', 'hr']) && (
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Add Task</span>
          </button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{onboardingTasks.length}</p>
            </div>
            <UserPlus className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {onboardingTasks.filter(t => t.status === 'COMPLETED').length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">
                {onboardingTasks.filter(t => t.status === 'IN_PROGRESS').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {onboardingTasks.filter(t => t.status === 'PENDING').length}
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'tasks', name: 'Onboarding Tasks', icon: UserPlus },
              { id: 'templates', name: 'Templates', icon: Calendar }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'tasks' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex items-center space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Tasks List */}
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <div key={task.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{task.title}</h3>
                        <p className="text-gray-600 mb-2">{task.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Employee: {task.employee.firstName} {task.employee.lastName}</span>
                          <span>Assignee: {task.assignee.firstName} {task.assignee.lastName}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(task.status)}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                          {task.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-500">Due Date</div>
                        <div className="font-medium">{new Date(task.dueDate).toLocaleDateString()}</div>
                      </div>
                      {task.completedAt && (
                        <div>
                          <div className="text-sm text-gray-500">Completed</div>
                          <div className="font-medium">{new Date(task.completedAt).toLocaleDateString()}</div>
                        </div>
                      )}
                    </div>

                    {task.notes && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm font-medium text-gray-900 mb-1">Notes</div>
                        <div className="text-sm text-gray-600">{task.notes}</div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-500">
                        Created {new Date(task.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>View</span>
                        </button>
                        <button className="text-green-600 hover:text-green-800 flex items-center space-x-1">
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {templates.map((template) => (
                <div key={template.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                      <p className="text-gray-600">{template.description}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      template.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {template.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Created {new Date(template.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">View Tasks</button>
                      <button className="text-green-600 hover:text-green-800 text-sm">Edit</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Empty States */}
      {activeTab === 'tasks' && filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No onboarding tasks found</h3>
          <p className="text-gray-600">Create onboarding tasks to help new employees get started</p>
        </div>
      )}
    </div>
  );
};

export default OnboardingList;