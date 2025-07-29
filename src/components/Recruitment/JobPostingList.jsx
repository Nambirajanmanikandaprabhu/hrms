import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const JobPostingsList = ({ isInternal = false }) => {
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate API call
    const fetchJobPostings = async () => {
      try {
        // In a real app, this would be an API call
        const mockData = [
          { id: 1, title: 'Frontend Developer', department: 'Engineering', location: 'Remote', status: 'Open', postedDate: '2023-05-15', closingDate: '2023-06-15' },
          { id: 2, title: 'HR Manager', department: 'Human Resources', location: 'New York', status: 'Closed', postedDate: '2023-04-10', closingDate: '2023-05-10' },
          { id: 3, title: 'Backend Engineer', department: 'Engineering', location: 'San Francisco', status: 'Open', postedDate: '2023-06-01', closingDate: '2023-07-01' },
        ];
        setJobPostings(mockData);
      } catch (error) {
        console.error('Error fetching job postings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobPostings();
  }, []);

  const filteredJobs = jobPostings.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {isInternal ? 'All Job Postings' : 'Current Openings'}
        </h1>
        {isInternal && (
          <Link
            to="/jobs/create"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Create New Job Posting
          </Link>
        )}
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search jobs..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-8">Loading job postings...</div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-8">No job postings found</div>
      ) : (
        <div className="grid gap-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="border rounded p-4 hover:shadow-md transition">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">
                    {isInternal ? (
                      <Link to={`/jobs/${job.id}`} className="text-blue-600 hover:underline">
                        {job.title}
                      </Link>
                    ) : (
                      job.title
                    )}
                  </h2>
                  <p className="text-gray-600">{job.department} • {job.location}</p>
                </div>
                <div className="text-right">
                  {isInternal && (
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      job.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {job.status}
                    </span>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    Posted: {job.postedDate} • Closes: {job.closingDate}
                  </p>
                </div>
              </div>
              {!isInternal && job.status === 'Open' && (
                <div className="mt-4">
                  <Link
                    to={`/jobs/${job.id}/apply`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition inline-block"
                  >
                    Apply Now
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobPostingsList;