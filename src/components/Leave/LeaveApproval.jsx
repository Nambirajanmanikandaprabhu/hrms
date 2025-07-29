import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LeaveApproval = () => {
  const navigate = useNavigate();
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [bulkAction, setBulkAction] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    // Mock data - replace with API call
    const mockLeaveRequests = [
      {
        id: 'LR-2023-004',
        employeeId: 'EMP-002',
        employeeName: 'Alice Johnson',
        employeeDepartment: 'Marketing',
        type: 'Annual Leave',
        startDate: '2023-07-10',
        endDate: '2023-07-14',
        days: 5,
        status: 'pending',
        submittedDate: '2023-06-25',
        reason: 'Family vacation',
        documents: [
          { name: 'travel_plans.pdf', type: 'pdf' },
          { name: 'hotel_reservation.pdf', type: 'pdf' }
        ],
        contactDuringLeave: 'alice@example.com',
        balance: { annual: 15, sick: 10 }
      },
      {
        id: 'LR-2023-005',
        employeeId: 'EMP-003',
        employeeName: 'Bob Williams',
        employeeDepartment: 'Engineering',
        type: 'Sick Leave',
        startDate: '2023-07-01',
        endDate: '2023-07-03',
        days: 3,
        status: 'pending',
        submittedDate: '2023-06-28',
        reason: 'Medical procedure',
        documents: [
          { name: 'doctor_note.pdf', type: 'pdf' }
        ],
        contactDuringLeave: '+1 555-123-4567',
        balance: { annual: 10, sick: 8 }
      }
    ];
    
    setLeaveRequests(mockLeaveRequests);
    setIsLoading(false);
  }, []);

  const filteredRequests = leaveRequests.filter(request => {
    if (filter === 'all') return true;
    return request.status === filter;
  });

  const toggleRequestSelection = (id) => {
    setSelectedRequests(prev =>
      prev.includes(id)
        ? prev.filter(requestId => requestId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRequests(filteredRequests.map(request => request.id));
    } else {
      setSelectedRequests([]);
    }
  };

  const handleBulkAction = () => {
    if (!bulkAction) return;
    
    if (bulkAction === 'reject' && !rejectionReason) {
      alert('Please provide a rejection reason');
      return;
    }
    
    // API call to process bulk action would go here
    console.log(`Processing bulk action (${bulkAction}) for:`, selectedRequests);
    if (bulkAction === 'reject') {
      console.log('Rejection reason:', rejectionReason);
    }
    
    // Simulate success
    setSelectedRequests([]);
    setBulkAction('');
    setRejectionReason('');
  };

  const processSingleRequest = (id, action, reason = '') => {
    // API call to process single request would go here
    console.log(`Marking request ${id} as ${action}`);
    if (action === 'reject') {
      console.log('Rejection reason:', reason);
    }
  };

  const viewRequestDetails = (id) => {
    navigate(`/leave/requests/${id}/review`);
  };

  return (
    <div className="leave-approval-container">
      <h1>Leave Requests Approval</h1>
      
      <div className="approval-controls">
        <div className="filter-control">
          <label>Filter by Status:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="pending">Pending Approval</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="all">All Requests</option>
          </select>
        </div>
        
        {selectedRequests.length > 0 && (
          <div className="bulk-actions">
            <select
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value)}
              className="bulk-action-select"
            >
              <option value="">Bulk Actions</option>
              <option value="approve">Approve Selected</option>
              <option value="reject">Reject Selected</option>
            </select>
            
            {bulkAction === 'reject' && (
              <input
                type="text"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Rejection reason"
                className="rejection-reason-input"
                required
              />
            )}
            
            <button
              onClick={handleBulkAction}
              disabled={!bulkAction || (bulkAction === 'reject' && !rejectionReason)}
              className="apply-bulk-action"
            >
              Apply
            </button>
            
            <button
              onClick={() => setSelectedRequests([])}
              className="clear-selection"
            >
              Clear Selection
            </button>
          </div>
        )}
      </div>
      
      {isLoading ? (
        <div className="loading-indicator">Loading leave requests...</div>
      ) : (
        <div className="requests-table-container">
          <table className="approval-requests-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={toggleSelectAll}
                    checked={
                      selectedRequests.length > 0 && 
                      selectedRequests.length === filteredRequests.length
                    }
                  />
                </th>
                <th>Leave ID</th>
                <th>Employee</th>
                <th>Department</th>
                <th>Type</th>
                <th>Dates</th>
                <th>Days</th>
                <th>Submitted</th>
                <th>Balance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map(request => (
                  <tr 
                    key={request.id}
                    className={request.status === 'pending' ? 'pending-request' : ''}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRequests.includes(request.id)}
                        onChange={() => toggleRequestSelection(request.id)}
                        disabled={request.status !== 'pending'}
                      />
                    </td>
                    <td>{request.id}</td>
                    <td>
                      <div className="employee-info">
                        <span className="employee-name">{request.employeeName}</span>
                        <span className="employee-id">{request.employeeId}</span>
                      </div>
                    </td>
                    <td>{request.employeeDepartment}</td>
                    <td>{request.type}</td>
                    <td>
                      {new Date(request.startDate).toLocaleDateString()} - {' '}
                      {new Date(request.endDate).toLocaleDateString()}
                    </td>
                    <td>{request.days}</td>
                    <td>{new Date(request.submittedDate).toLocaleDateString()}</td>
                    <td>
                      <div className="leave-balance">
                        <span>A: {request.balance.annual}</span>
                        <span>S: {request.balance.sick}</span>
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => viewRequestDetails(request.id)}
                          className="review-button"
                        >
                          Review
                        </button>
                        
                        {request.status === 'pending' && (
                          <>
                            <button
                              onClick={() => processSingleRequest(request.id, 'approve')}
                              className="approve-button"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => {
                                const reason = prompt('Enter rejection reason:');
                                if (reason) {
                                  processSingleRequest(request.id, 'reject', reason);
                                }
                              }}
                              className="reject-button"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="no-results">
                    No leave requests found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="approval-stats">
        <div className="stat-card">
          <h3>Pending Approval</h3>
          <span className="stat-value">
            {leaveRequests.filter(r => r.status === 'pending').length}
          </span>
        </div>
        <div className="stat-card">
          <h3>Approved This Month</h3>
          <span className="stat-value">
            {leaveRequests.filter(r => r.status === 'approved').length}
          </span>
        </div>
        <div className="stat-card">
          <h3>Rejected This Month</h3>
          <span className="stat-value">
            {leaveRequests.filter(r => r.status === 'rejected').length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LeaveApproval;