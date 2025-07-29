import React, { useState, useEffect } from 'react';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    actionType: '',
    dateFrom: '',
    dateTo: '',
    user: ''
  });

  useEffect(() => {
    // Simulate API call with pagination and filters
    const fetchLogs = async () => {
      try {
        setLoading(true);
        // In a real app, this would include pagination and filter parameters
        const mockData = {
          logs: [
            { id: 1, timestamp: '2023-06-15 09:23:45', user: 'admin@company.com', action: 'Login', entity: 'System', entityId: '', details: 'Successful login from IP 192.168.1.1' },
            { id: 2, timestamp: '2023-06-15 10:12:33', user: 'hr@company.com', action: 'Update', entity: 'Employee', entityId: 'EMP-1001', details: 'Updated personal information for John Smith' },
            { id: 3, timestamp: '2023-06-14 14:45:21', user: 'manager@company.com', action: 'Create', entity: 'Job Posting', entityId: 'JOB-2023-15', details: 'Created new job posting for Frontend Developer' },
            { id: 4, timestamp: '2023-06-14 11:30:15', user: 'admin@company.com', action: 'Delete', entity: 'Document', entityId: 'DOC-1024', details: 'Deleted employee document' },
            { id: 5, timestamp: '2023-06-13 16:20:45', user: 'hr@company.com', action: 'Update', entity: 'Training Program', entityId: 'TRN-0042', details: 'Updated program details for Leadership Development' },
          ],
          totalPages: 3
        };
        setLogs(mockData.logs);
        setTotalPages(mockData.totalPages);
      } catch (error) {
        console.error('Error fetching audit logs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [page, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplyFilters = () => {
    setPage(1); // Reset to first page when filters change
  };

  const handleResetFilters = () => {
    setFilters({
      actionType: '',
      dateFrom: '',
      dateTo: '',
      user: ''
    });
    setPage(1);
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'Create': return 'bg-green-100 text-green-800';
      case 'Update': return 'bg-blue-100 text-blue-800';
      case 'Delete': return 'bg-red-100 text-red-800';
      case 'Login': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Audit Logs</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="actionType">
              Action Type
            </label>
            <select
              id="actionType"
              name="actionType"
              value={filters.actionType}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            >
              <option value="">All Actions</option>
              <option value="Create">Create</option>
              <option value="Update">Update</option>
              <option value="Delete">Delete</option>
              <option value="Login">Login</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="dateFrom">
              Date From
            </label>
            <input
              type="date"
              id="dateFrom"
              name="dateFrom"
              value={filters.dateFrom}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="dateTo">
              Date To
            </label>
            <input
              type="date"
              id="dateTo"
              name="dateTo"
              value={filters.dateTo}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="user">
              User
            </label>
            <input
              type="text"
              id="user"
              name="user"
              value={filters.user}
              onChange={handleFilterChange}
              placeholder="Email or username"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleResetFilters}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Reset Filters
          </button>
          <button
            onClick={handleApplyFilters}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading audit logs...</div>
      ) : logs.length === 0 ? (
        <div className="text-center py-8">No logs found matching your criteria</div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{log.timestamp}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{log.user}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {log.entity} {log.entityId && `(${log.entityId})`}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing page {page} of {totalPages}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AuditLogs;