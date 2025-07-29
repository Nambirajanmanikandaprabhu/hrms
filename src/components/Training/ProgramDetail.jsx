import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProgramDetail = () => {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    // Simulate API calls
    const fetchData = async () => {
      try {
        // Fetch program details
        const mockProgram = {
          id: 1,
          name: 'Leadership Development',
          category: 'Management',
          duration: '6 weeks',
          status: 'Active',
          description: 'This program is designed to develop leadership skills for mid-level managers...',
          objectives: [
            'Develop strategic thinking',
            'Enhance team management skills',
            'Improve decision-making capabilities'
          ],
          prerequisites: 'Minimum 2 years in management role',
          createdDate: '2023-01-15',
          updatedDate: '2023-05-20'
        };
        setProgram(mockProgram);
        
        // Fetch enrollments
        const mockEnrollments = [
          { id: 1, employeeName: 'John Smith', department: 'Marketing', enrollmentDate: '2023-02-10', status: 'In Progress', completion: '40%' },
          { id: 2, employeeName: 'Sarah Johnson', department: 'Sales', enrollmentDate: '2023-02-15', status: 'Completed', completion: '100%' },
          { id: 3, employeeName: 'Michael Chen', department: 'Engineering', enrollmentDate: '2023-03-01', status: 'In Progress', completion: '25%' },
        ];
        setEnrollments(mockEnrollments);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading program details...</div>;
  }

  if (!program) {
    return <div className="container mx-auto px-4 py-8 text-center">Program not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/training/programs" className="text-blue-600 hover:underline">
          &larr; Back to Programs
        </Link>
      </div>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">{program.name}</h1>
          <p className="text-gray-600">{program.category} • {program.duration}</p>
        </div>
        <div className="flex space-x-3">
          <Link
            to={`/training/programs/${program.id}/edit`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit Program
          </Link>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Enroll Employees
          </button>
        </div>
      </div>

      <div className="mb-6">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          program.status === 'Active' ? 'bg-green-100 text-green-800' :
          program.status === 'Archived' ? 'bg-gray-100 text-gray-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {program.status}
        </span>
      </div>

      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('details')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'details' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Program Details
          </button>
          <button
            onClick={() => setActiveTab('enrollments')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'enrollments' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Enrollments ({enrollments.length})
          </button>
        </nav>
      </div>

      {activeTab === 'details' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700 mb-6">{program.description}</p>
            
            <h3 className="text-lg font-semibold mb-2">Learning Objectives</h3>
            <ul className="list-disc pl-5 mb-6 text-gray-700">
              {program.objectives.map((obj, index) => (
                <li key={index}>{obj}</li>
              ))}
            </ul>
            
            <h3 className="text-lg font-semibold mb-2">Prerequisites</h3>
            <p className="text-gray-700">{program.prerequisites}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-700">Created Date</h3>
              <p>{program.createdDate}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Last Updated</h3>
              <p>{program.updatedDate}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'enrollments' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          {enrollments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No enrollments yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollment Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {enrollments.map((enrollment) => (
                    <tr key={enrollment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/employees/${enrollment.id}`} className="text-blue-600 hover:underline">
                          {enrollment.employeeName}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{enrollment.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{enrollment.enrollmentDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          enrollment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          enrollment.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {enrollment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${
                              enrollment.completion === '100%' ? 'bg-green-600' : 'bg-blue-600'
                            }`} 
                            style={{ width: enrollment.completion }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 mt-1">{enrollment.completion}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-red-600 hover:underline text-sm">
                          Withdraw
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgramDetail;