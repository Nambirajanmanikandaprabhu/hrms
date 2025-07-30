import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Calendar, Plus, Filter, Clock, Check, X, Eye, FileText } from 'lucide-react';

const LeaveRequests = () => {
  const { user, hasRole } = useAuth();
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveBalances, setLeaveBalances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Mock data - replace with API calls
    const mockRequests = [
      {
        id: '1',
        employee: { firstName: 'John', lastName: 'Doe', employeeId: 'EMP001' },
        leaveType: 'ANNUAL',
        startDate: '2024-02-15',
        endDate: '2024-02-19',
        days: 5,
        reason: 'Family vacation',
        status: 'PENDING',
        appliedAt: '2024-01-15T10:00:00Z',
        approvedBy: null,
        approvedAt: null,
        rejectionReason: null
      },
      {
        id: '2',
        employee: { firstName: 'Sarah', lastName: 'Wilson', employeeId: 'EMP002' },
        leaveType: 'SICK',
        startDate: '2024-01-20',
        endDate: '2024-01-22',
        days: 3,
        reason: 'Medical treatment',
        status: 'APPROVED',
        appliedAt: '2024-01-18T14:30:00Z',
        approvedBy: { firstName: 'Mike', lastName: 'Johnson' },
        approvedAt: '2024-01-19T09:15:00Z',
        rejectionReason: null
      },
      {
        id: '3',
        employee: { firstName: 'Mike', lastName: 'Johnson', employeeId: 'EMP003' },
        leaveType: 'ANNUAL',
        startDate: '2024-01-10',
        endDate: '2024-01-12',
        days: 3,
        reason: 'Personal matters',
        status: 'REJECTED',
        appliedAt: '2024-01-05T11:20:00Z',
        approvedBy: { firstName: 'David', lastName: 'Brown' },
        approvedAt: null,
        rejectionReason: 'Insufficient leave balance'
      }
    ];

    const mockBalances = [
      { leaveType: 'ANNUAL', allocated: 25, used: 8, remaining: 17 },
      { leaveType: 'SICK', allocated: 10, used: 2, remaining: 8 },
      { leaveType: 'MATERNITY', allocated: 90, used: 0, remaining: 90 },
      { leaveType: 'EMERGENCY', allocated: 5, used: 1, remaining: 4 }
    ];

    setTimeout(() => {
      setLeaveRequests(mockRequests);
      setLeaveBalances(mockBalances);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      case 'CANCELLED': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'APPROVED': return <Check className="h-4 w-4 text-green-600" />;
      case 'PENDING': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'REJECTED': return <X className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getLeaveTypeColor = (type) => {
    switch (type) {
      case 'ANNUAL': return 'bg-blue-100 text-blue-800';
      case 'SICK': return 'bg-red-100 text-red-800';
      case 'MATERNITY': return 'bg-pink-100 text-pink-800';
      case 'PATERNITY': return 'bg-purple-100 text-purple-800';
      case 'EMERGENCY': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRequests = leaveRequests.filter(request => {
    if (hasRole(['employee']) && request.employee.employeeId !== user?.employeeId) {
      return false;
    }
    if (filterStatus !== 'all' && request.status !== filterStatus) {
      return false;
    }
    return true;
  });

  const handleApprove = (requestId) => {
    setLeaveRequests(requests =>
      requests.map(req =>
        req.id === requestId
          ? { ...req, status: 'APPROVED', approvedAt: new Date().toISOString(), approvedBy: user }
          : req
      )
    );
  };

  const handleReject = (requestId, reason) => {
    setLeaveRequests(requests =>
      requests.map(req =>
        req.id === requestId
          ? { ...req, status: 'REJECTED', rejectionReason: reason, approvedBy: user }
          : req
      )
    );
  };

  const LeaveApplicationModal = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
      leaveType: 'ANNUAL',
      startDate: '',
      endDate: '',
      reason: '',
      attachments: []
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Apply for Leave</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Leave Type</label>
              <select
                value={formData.leaveType}
                onChange={(e) => setFormData({...formData, leaveType: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="ANNUAL">Annual Leave</option>
                <option value="SICK">Sick Leave</option>
                <option value="MATERNITY">Maternity Leave</option>
                <option value="PATERNITY">Paternity Leave</option>
                <option value="EMERGENCY">Emergency Leave</option>
                <option value="UNPAID">Unpaid Leave</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                required
              />
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
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Submit Application
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
          <p className="text-gray-600">
            {hasRole(['employee']) ? 'Manage your leave requests and balances' : 'Review and manage employee leave requests'}
          </p>
        </div>
        {hasRole(['employee']) && (
          <button
            onClick={() => setShowApplyModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Apply for Leave</span>
          </button>
        )}
      </div>

      {/* Leave Balances (Employee View) */}
      {hasRole(['employee']) && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {leaveBalances.map((balance) => (
            <div key={balance.leaveType} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{balance.leaveType.replace('_', ' ')}</h3>
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Allocated:</span>
                  <span className="font-medium">{balance.allocated} days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Used:</span>
                  <span className="font-medium text-red-600">{balance.used} days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Remaining:</span>
                  <span className="font-medium text-green-600">{balance.remaining} days</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(balance.used / balance.allocated) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filter by status:</span>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Leave Requests Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Leave Requests</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {!hasRole(['employee']) && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied</th>
                {hasRole(['admin', 'hr', 'manager']) && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  {!hasRole(['employee']) && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {request.employee.firstName} {request.employee.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{request.employee.employeeId}</div>
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getLeaveTypeColor(request.leaveType)}`}>
                      {request.leaveType.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div>{new Date(request.startDate).toLocaleDateString()}</div>
                      <div className="text-gray-500">to {new Date(request.endDate).toLocaleDateString()}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.days} days
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                    {request.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(request.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(request.appliedAt).toLocaleDateString()}
                  </td>
                  {hasRole(['admin', 'hr', 'manager']) && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {request.status === 'PENDING' && (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleApprove(request.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleReject(request.id, 'Rejected by manager')}
                            className="text-red-600 hover:text-red-900"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                      <button className="text-blue-600 hover:text-blue-900 ml-2">
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No leave requests found</h3>
          <p className="text-gray-600">
            {hasRole(['employee']) 
              ? 'You haven\'t submitted any leave requests yet.' 
              : 'No leave requests match your current filters.'
            }
          </p>
        </div>
      )}

      {/* Apply Leave Modal */}
      {showApplyModal && (
        <LeaveApplicationModal
          onClose={() => setShowApplyModal(false)}
          onSubmit={(data) => {
            const newRequest = {
              id: Date.now().toString(),
              employee: { firstName: user.name.split(' ')[0], lastName: user.name.split(' ')[1] || '', employeeId: user.employeeId || 'EMP999' },
              ...data,
              status: 'PENDING',
              appliedAt: new Date().toISOString(),
              days: Math.ceil((new Date(data.endDate) - new Date(data.startDate)) / (1000 * 60 * 60 * 24)) + 1
            };
            setLeaveRequests([newRequest, ...leaveRequests]);
          }}
        />
      )}
    </div>
  );
};

export default LeaveRequests;