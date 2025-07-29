import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LeaveRequest = () => {
  const navigate = useNavigate();
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Mock data - replace with API call
    const mockLeaveRequests = [
      {
        id: 'LR-2023-001',
        type: 'Annual Leave',
        startDate: '2023-06-15',
        endDate: '2023-06-18',
        days: 4,
        status: 'approved',
        submittedDate: '2023-05-20',
        reason: 'Family vacation',
        documents: 2,
        approver: 'Jane Smith',
        approvalDate: '2023-05-22'
      },
      {
        id: 'LR-2023-002',
        type: 'Sick Leave',
        startDate: '2023-07-01',
        endDate: '2023-07-03',
        days: 3,
        status: 'pending',
        submittedDate: '2023-06-28',
        reason: 'Medical appointment',
        documents: 1,
        approver: '',
        approvalDate: ''
      },
      {
        id: 'LR-2023-003',
        type: 'Unpaid Leave',
        startDate: '2023-08-10',
        endDate: '2023-08-15',
        days: 6,
        status: 'rejected',
        submittedDate: '2023-07-15',
        reason: 'Personal reasons',
        documents: 0,
        approver: 'Jane Smith',
        approvalDate: '2023-07-18',
        rejectionReason: 'Business needs during that period'
      }
    ];
    
    setLeaveRequests(mockLeaveRequests);
    setIsLoading(false);
  }, []);

  const filteredRequests = leaveRequests.filter(request => {
    if (filter === 'all') return true;
    return request.status === filter;
  });

  const getStatusBadge = (status) => {
    const statusClasses = {
      approved: 'status-approved',
      pending: 'status-pending',
      rejected: 'status-rejected'
    };
    return (
      <span className={`status-badge ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const viewRequestDetails = (id) => {
    navigate(`/leave/requests/${id}`);
  };

  const cancelRequest = (id, e) => {
    e.stopPropagation();
    // API call to cancel request would go here
    console.log('Canceling request:', id);
  };

  return (
    <div className="leave-requests-container">
      <div className="page-header">
        <h1>My Leave Requests</h1>
        <button
          onClick={() => navigate('/leave/apply')}
          className="new-request-button"
        >
          + New Leave Request
        </button>
      </div>
      
      <div className="controls">
        <div className="filter-control">
          <label>Filter by Status:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
      
      {isLoading ? (
        <div className="loading-indicator">Loading your leave requests...</div>
      ) : (
        <div className="requests-table-container">
          <table className="requests-table">
            <thead>
              <tr>
                <th>Leave ID</th>
                <th>Type</th>
                <th>Dates</th>
                <th>Days</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map(request => (
                  <tr 
                    key={request.id} 
                    onClick={() => viewRequestDetails(request.id)}
                    className="request-row"
                  >
                    <td>{request.id}</td>
                    <td>{request.type}</td>
                    <td>
                      {new Date(request.startDate).toLocaleDateString()} - {' '}
                      {new Date(request.endDate).toLocaleDateString()}
                    </td>
                    <td>{request.days}</td>
                    <td>{getStatusBadge(request.status)}</td>
                    <td>{new Date(request.submittedDate).toLocaleDateString()}</td>
                    <td>
                      <button 
                        onClick={(e) => viewRequestDetails(request.id, e)}
                        className="view-button"
                      >
                        View
                      </button>
                      {request.status === 'pending' && (
                        <button
                          onClick={(e) => cancelRequest(request.id, e)}
                          className="cancel-button"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-results">
                    No leave requests found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="leave-balance-summary">
        <h3>Your Leave Balance</h3>
        <div className="balance-cards">
          <div className="balance-card">
            <span className="balance-type">Annual Leave</span>
            <span className="balance-days">15/20 days</span>
          </div>
          <div className="balance-card">
            <span className="balance-type">Sick Leave</span>
            <span className="balance-days">10/10 days</span>
          </div>
          <div className="balance-card">
            <span className="balance-type">Other Leave</span>
            <span className="balance-days">5/5 days</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequest;