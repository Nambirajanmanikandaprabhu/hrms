import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserMinus, CheckCircle, Clock, AlertCircle, Plus, Eye, Edit } from 'lucide-react';

const OffboardingList = () => {
  const { hasRole } = useAuth();
  const [offboardingTasks, setOffboardingTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Mock data - replace with API call
    const mockTasks = [
      {
        id: '1',
        employee: { firstName: 'Alex', lastName: 'Johnson', employeeId: 'EMP004' },
        assignee: { firstName: 'Sarah', lastName: 'Wilson' },
        title: 'Return Company Equipment',
        description: 'Collect laptop, phone, and access cards',
        dueDate: '2024-02-15T00:00:00Z',
        isCompleted: false,
        completedAt: null,
        notes: 'Equipment list prepared',
        sortOrder: 1,
        createdAt: '2024-02-01T10:00:00Z'
      },
      {
        id: '2',
        employee: { firstName: 'Alex', lastName: 'Johnson', employeeId: 'EMP004' },
        assignee: { firstName: 'Mike', lastName: 'Johnson' },
        title: 'Knowledge Transfer',
        description: 'Document processes and transfer responsibilities',
        dueDate: '2024-02-10T00:00:00Z',
        isCompleted: true,
        completedAt: '2024-02-09T16:30:00Z',
        notes: 'Documentation completed and shared with team',
        sortOrder: 2,
        createdAt: '2024-02-01T10:00:00Z'
      },
      {
        id: '3',
        employee: { firstName: 'Lisa', lastName: 'Brown', employeeId: 'EMP006' },
        assignee: { firstName: 'Sarah', lastName: 'Wilson' },
        title: 'Exit Interview',
        description: 'Conduct exit interview and collect feedback',
        dueDate: '2024-02-20T00:00:00Z',
        isCompleted: false,
        completedAt: null,
        notes: 'Interview scheduled for next week',
        sortOrder: 1,
        createdAt: '2024-02-05T09:00:00Z'
      }
    ];

    setTimeout(() => {
      setOffboardingTasks(mockTasks);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredTasks = offboardingTasks.filter(task => {
    if (filterStatus === 'completed' && !task.isCompleted) return false;
    if (filterStatus === 'pending' && task.isCompleted) return false;
    return true;
  });

  const handleCompleteTask = (taskId) => {
    setOffboardingTasks(tasks =>
      tasks.map(task =>
        task.id === taskId
          ? { ...task, isCompleted: true, completedAt: new Date().toISOString() }
          : task
      )
    );
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Employee Offboarding</h1>
          <p className="text-gray-600">Manage employee departure process and exit tasks</p>
        </div>
        {hasRole(['admin', 'hr']) && (
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Add Task</span>
          </button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{offboardingTasks.length}</p>
            </div>
            <UserMinus className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {offboardingTasks.filter(t => t.isCompleted).length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-orange-600">
                {offboardingTasks.filter(t => !t.isCompleted).length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
                {task.isCompleted ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Completed
                    </span>
                  </>
                ) : (
                  <>
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">
                      Pending
                    </span>
                  </>
                )}
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
                {!task.isCompleted && (
                  <button
                    onClick={() => handleCompleteTask(task.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Mark Complete
                  </button>
                )}
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

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <UserMinus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No offboarding tasks found</h3>
          <p className="text-gray-600">
            {filterStatus === 'all' 
              ? 'Create offboarding tasks to manage employee departures' 
              : `No ${filterStatus} tasks found`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default OffboardingList;