import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const JobApplicationsList = () => {
  const { id } = useParams();
  const [applications, setApplications] = useState([]);
  const [jobTitle, setJobTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    // Simulate API calls
    const fetchData = async () => {
      try {
        // Fetch job title
        const mockJobData = {
          id: 1,
          title: 'Frontend Developer'
        };
        setJobTitle(mockJobData.title);
        
        // Fetch applications
        const mockApplications = [
          { id: 1, candidateName: 'John Doe', email: 'john@example.com', appliedDate: '2023-05-20', status: 'New', resume: 'john_doe_resume.pdf' },
          { id: 2, candidateName: 'Jane Smith', email: 'jane@example.com', appliedDate: '2023-05-18', status: 'Interview', resume: 'jane_smith_resume.pdf' },
          { id: 3, candidateName: 'Robert Johnson', email: 'robert@example.com', appliedDate: '2023-05-15', status: 'Rejected', resume: 'robert_johnson_resume.pdf' },
        ];
        setApplications(mockApplications);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const filteredApplications = statusFilter === 'All' 
    ? applications 
    : applications.filter(app => app.status === statusFilter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Interview': return 'bg-purple-100 text-purple-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Hired': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/internal/jobs" className="text-blue-600 hover:underline">
          &larr; Back to All Jobs
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-2">
        Applications for: {jobTitle || 'Loading...'}
      </h1>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Filter by status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="All">All</option>
            <option value="New">New</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
            <option value="Hired">Hired</option>
          </select>
        </div>
        <span className="text-gray-600">
          {filteredApplications.length} application{filteredApplications.length !== 1 ? 's' : ''}
        </span>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading applications...</div>
      ) : filteredApplications.length === 0 ? (
        <div className="text-center py-8">No applications found</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/jobs/${id}/applications/${application.id}`} className="text-blue-600 hover:underline">
                      {application.candidateName}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{application.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{application.appliedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(application.status)}`}>
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <a 
                        href={`/resumes/${application.resume}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        View Resume
                      </a>
                      <Link
                        to={`/jobs/${id}/applications/${application.id}/schedule-interview`}
                        className="text-green-600 hover:underline text-sm"
                      >
                        Schedule
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

export default JobApplicationsList;