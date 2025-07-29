import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DisciplinaryActionList = () => {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    // Simulate API call
    const fetchActions = async () => {
      try {
        const mockData = [
          { id: 1, employeeName: 'John Smith', type: 'Warning', date: '2023-05-10', status: 'Active', severity: 'Medium' },
          { id: 2, employeeName: 'Sarah Johnson', type: 'Suspension', date: '2023-04-15', status: 'Resolved', severity: 'High' },
          { id: 3, employeeName: 'Michael Chen', type: 'Verbal Warning', date: '2023-06-01', status: 'Active', severity: 'Low' },
          { id: 4, employeeName: 'Emily Rodriguez', type: 'Final Warning', date: '2023-03-20', status: 'Appealed', severity: 'High' },
        ];
        setActions(mockData);
      } catch (error) {
        console.error('Error fetching disciplinary actions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActions();
  }, []);

  const filteredActions = actions.filter(action => {
    const matchesStatus = statusFilter === 'All' || action.status === statusFilter;
    const matchesSearch = action.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         action.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-red-100 text-red-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Appealed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Disciplinary Actions</h1>
        <Link
          to="/disciplinary/actions/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Create New Action
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <input
            type="text"
            placeholder="Search actions..."
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Filter by status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Resolved">Resolved</option>
            <option value="Appealed">Appealed</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading disciplinary actions...</div>
      ) : filteredActions.length === 0 ? (
        <div className="text-center py-8">No actions found matching your criteria</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredActions.map((action) => (
                <tr key={action.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/employees/${action.id}`} className="text-blue-600 hover:underline">
                      {action.employeeName}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{action.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{action.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(action.severity)}`}>
                      {action.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(action.status)}`}>
                      {action.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Link
                        to={`/disciplinary/actions/${action.id}`}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        View
                      </Link>
                      <Link
                        to={`/disciplinary/actions/${action.id}/edit`}
                        className="text-green-600 hover:underline text-sm"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DisciplinaryActionList;