import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AlertTriangle, Plus, Eye, Edit, Calendar, FileText, User, Shield } from 'lucide-react';

const Disciplinary = () => {
  const { user, hasRole } = useAuth();
  const [disciplinaryActions, setDisciplinaryActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState('all');

  useEffect(() => {
    // Mock data - replace with API call
    const mockActions = [
      {
        id: '1',
        employee: { firstName: 'John', lastName: 'Doe', employeeId: 'EMP001' },
        issuedBy: { firstName: 'Mike', lastName: 'Johnson' },
        type: 'Written Warning',
        reason: 'Repeated tardiness',
        description: 'Employee has been late to work 5 times in the past month despite previous verbal warnings.',
        actionDate: '2024-01-15',
        severity: 'Medium',
        followUpDate: '2024-02-15T00:00:00Z',
        resolution: null,
        documents: ['warning-letter-001.pdf'],
        createdAt: '2024-01-15T10:00:00Z'
      },
      {
        id: '2',
        employee: { firstName: 'Sarah', lastName: 'Wilson', employeeId: 'EMP002' },
        issuedBy: { firstName: 'David', lastName: 'Brown' },
        type: 'Verbal Warning',
        reason: 'Inappropriate workplace behavior',
        description: 'Employee made inappropriate comments during team meeting.',
        actionDate: '2024-01-10',
        severity: 'Low',
        followUpDate: '2024-01-24T00:00:00Z',
        resolution: 'Employee acknowledged the issue and apologized. Behavior has improved.',
        documents: [],
        createdAt: '2024-01-10T14:30:00Z'
      },
      {
        id: '3',
        employee: { firstName: 'Alex', lastName: 'Brown', employeeId: 'EMP004' },
        issuedBy: { firstName: 'Sarah', lastName: 'Wilson' },
        type: 'Final Warning',
        reason: 'Performance issues',
        description: 'Continued failure to meet project deadlines and quality standards despite coaching.',
        actionDate: '2024-01-20',
        severity: 'High',
        followUpDate: '2024-03-20T00:00:00Z',
        resolution: null,
        documents: ['performance-improvement-plan.pdf', 'final-warning.pdf'],
        createdAt: '2024-01-20T09:15:00Z'
      }
    ];

    setTimeout(() => {
      setDisciplinaryActions(mockActions);
      setLoading(false);
    }, 1000);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Low': return 'bg-yellow-100 text-yellow-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'High': return 'bg-red-100 text-red-800';
      case 'Critical': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Verbal Warning': return 'bg-blue-100 text-blue-800';
      case 'Written Warning': return 'bg-orange-100 text-orange-800';
      case 'Final Warning': return 'bg-red-100 text-red-800';
      case 'Suspension': return 'bg-purple-100 text-purple-800';
      case 'Termination': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredActions = disciplinaryActions.filter(action => {
    const matchesSeverity = filterSeverity === 'all' || action.severity === filterSeverity;
    
    // For employees, only show their own records
    if (hasRole(['employee']) && action.employee.employeeId !== user?.employeeId) {
      return false;
    }
    
    return matchesSeverity;
  });

  const DisciplinaryModal = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
      employeeId: '',
      type: 'Verbal Warning',
      reason: '',
      description: '',
      actionDate: new Date().toISOString().split('T')[0],
      severity: 'Low',
      followUpDate: ''
    });

    const employees = [
      { id: 'EMP001', name: 'John Doe' },
      { id: 'EMP002', name: 'Sarah Wilson' },
      { id: 'EMP003', name: 'Mike Johnson' },
      { id: 'EMP004', name: 'Alex Brown' }
    ];

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Disciplinary Action</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employee *</label>
                <select
                  value={formData.employeeId}
                  onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select employee</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Action Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="Verbal Warning">Verbal Warning</option>
                  <option value="Written Warning">Written Warning</option>
                  <option value="Final Warning">Final Warning</option>
                  <option value="Suspension">Suspension</option>
                  <option value="Termination">Termination</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason *</label>
              <input
                type="text"
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief reason for disciplinary action"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
                placeholder="Detailed description of the incident and action taken"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Action Date *</label>
                <input
                  type="date"
                  value={formData.actionDate}
                  onChange={(e) => setFormData({...formData, actionDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
                <select
                  value={formData.severity}
                  onChange={(e) => setFormData({...formData, severity: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Follow-up Date</label>
                <input
                  type="date"
                  value={formData.followUpDate}
                  onChange={(e) => setFormData({...formData, followUpDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Create Action
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Employee view - restricted access
  if (hasRole(['employee'])) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Disciplinary Records</h3>
          <p className="text-gray-600">
            {filteredActions.length === 0 
              ? 'You have no disciplinary records.' 
              : 'Contact HR for information about your disciplinary records.'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Disciplinary Actions</h1>
          <p className="text-gray-600">Manage employee disciplinary records and actions</p>
        </div>
        {hasRole(['admin', 'hr', 'manager']) && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>New Action</span>
          </button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Actions</p>
              <p className="text-2xl font-bold text-gray-900">{disciplinaryActions.length}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Severity</p>
              <p className="text-2xl font-bold text-red-600">
                {disciplinaryActions.filter(a => a.severity === 'High').length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Follow-up</p>
              <p className="text-2xl font-bold text-yellow-600">
                {disciplinaryActions.filter(a => a.followUpDate && !a.resolution).length}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-green-600">
                {disciplinaryActions.filter(a => a.resolution).length}
              </p>
            </div>
            <FileText className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Severity</label>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Severities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Disciplinary Actions List */}
      <div className="space-y-4">
        {filteredActions.map((action) => (
          <div key={action.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {action.employee.firstName} {action.employee.lastName}
                </h3>
                <p className="text-gray-600">{action.employee.employeeId}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(action.type)}`}>
                  {action.type}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(action.severity)}`}>
                  {action.severity}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Reason</h4>
                <p className="text-gray-600">{action.reason}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600">{action.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Action Date: {new Date(action.actionDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div>
                <div className="flex items-center text-sm text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  <span>Issued by: {action.issuedBy.firstName} {action.issuedBy.lastName}</span>
                </div>
              </div>
              {action.followUpDate && (
                <div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Follow-up: {new Date(action.followUpDate).toLocaleDateString()}</span>
                  </div>
                </div>
              )}
            </div>

            {action.documents && action.documents.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Documents</h4>
                <div className="flex flex-wrap gap-2">
                  {action.documents.map((doc, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      <FileText className="h-3 w-3 mr-1" />
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {action.resolution && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-900 mb-1">Resolution</h4>
                <p className="text-green-700 text-sm">{action.resolution}</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Created {new Date(action.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-800 flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>View Details</span>
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

      {filteredActions.length === 0 && (
        <div className="text-center py-12">
          <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No disciplinary actions found</h3>
          <p className="text-gray-600">
            {filterSeverity === 'all' 
              ? 'No disciplinary actions have been recorded yet.' 
              : `No ${filterSeverity.toLowerCase()} severity actions found.`
            }
          </p>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <DisciplinaryModal
          onClose={() => setShowCreateModal(false)}
          onSave={(data) => {
            const newAction = {
              id: Date.now().toString(),
              employee: { firstName: 'John', lastName: 'Doe', employeeId: data.employeeId }, // Mock employee lookup
              issuedBy: { firstName: user.name.split(' ')[0], lastName: user.name.split(' ')[1] || '' },
              ...data,
              documents: [],
              resolution: null,
              createdAt: new Date().toISOString()
            };
            setDisciplinaryActions([newAction, ...disciplinaryActions]);
          }}
        />
      )}
    </div>
  );
};

export default Disciplinary;