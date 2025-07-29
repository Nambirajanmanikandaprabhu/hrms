import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const EmployeeTrainingRecords = () => {
  const { employeeId } = useParams();
  const [records, setRecords] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    // Simulate API calls
    const fetchData = async () => {
      try {
        // Fetch employee data
        const mockEmployee = {
          id: employeeId,
          name: 'Emily Rodriguez',
          position: 'HR Specialist',
          department: 'Human Resources'
        };
        setEmployee(mockEmployee);
        
        // Fetch training records
        const mockRecords = [
          { id: 1, program: 'New Hire Orientation', completionDate: '2022-05-15', status: 'Completed', certificate: 'orientation_cert.pdf' },
          { id: 2, program: 'Diversity & Inclusion', completionDate: '2022-08-20', status: 'Completed', certificate: 'diversity_cert.pdf' },
          { id: 3, program: 'Leadership Development', completionDate: null, status: 'In Progress', certificate: null },
          { id: 4, program: 'Advanced HR Analytics', completionDate: null, status: 'Enrolled', certificate: null },
        ];
        setRecords(mockRecords);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [employeeId]);

  const filteredRecords = statusFilter === 'All' 
    ? records 
    : records.filter(record => record.status === statusFilter);

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading training records...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to={`/employees/${employeeId}`} className="text-blue-600 hover:underline">
          &larr; Back to Employee Profile
        </Link>
      </div>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Training Records</h1>
          <h2 className="text-xl text-gray-600">
            {employee.name} • {employee.position} • {employee.department}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Filter by status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Enrolled">Enrolled</option>
          </select>
          <Link
            to={`/employees/${employeeId}/training/upload`}
            className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700"
          >
            Upload Certificate
          </Link>
        </div>
      </div>

      {filteredRecords.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow">
          No training records found for the selected filter
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Training Program</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/training/programs/${record.id}`} className="text-blue-600 hover:underline">
                      {record.program}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      record.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      record.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{record.completionDate || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.certificate ? (
                      <a 
                        href={`/certificates/${record.certificate}`} 
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-gray-500">Not available</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.status !== 'Completed' && (
                      <button className="text-red-600 hover:underline text-sm">
                        Withdraw
                      </button>
                    )}
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

export default EmployeeTrainingRecords;