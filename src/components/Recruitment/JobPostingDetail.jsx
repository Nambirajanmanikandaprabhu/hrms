import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const JobPostingDetail = ({ isInternal = false }) => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchJobPosting = async () => {
      try {
        // In a real app, this would be an API call
        const mockData = {
          id: 1,
          title: 'Frontend Developer',
          department: 'Engineering',
          location: 'Remote',
          status: 'Open',
          postedDate: '2023-05-15',
          closingDate: '2023-06-15',
          description: 'We are looking for a skilled Frontend Developer to join our team...',
          responsibilities: [
            'Develop user interfaces with React.js',
            'Collaborate with design team to implement UI/UX',
            'Write clean, maintainable code',
            'Participate in code reviews'
          ],
          requirements: [
            '3+ years of experience with React',
            'Proficiency in JavaScript, HTML, CSS',
            'Experience with Redux or similar state management',
            'Bachelor\'s degree in Computer Science or related field'
          ]
        };
        setJob(mockData);
      } catch (error) {
        console.error('Error fetching job posting:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobPosting();
  }, [id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading job details...</div>;
  }

  if (!job) {
    return <div className="container mx-auto px-4 py-8 text-center">Job posting not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to={isInternal ? '/internal/jobs' : '/jobs'} className="text-blue-600 hover:underline">
          &larr; Back to {isInternal ? 'All Jobs' : 'Open Positions'}
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
            <p className="text-gray-600 mb-1">{job.department} • {job.location}</p>
            <p className="text-sm text-gray-500">
              Posted: {job.postedDate} • Closes: {job.closingDate}
            </p>
          </div>
          {isInternal && (
            <Link
              to={`/jobs/${job.id}/edit`}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Edit Posting
            </Link>
          )}
        </div>

        {isInternal && (
          <div className="mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              job.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {job.status}
            </span>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Job Description</h2>
          <p className="text-gray-700 mb-4">{job.description}</p>
          
          <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
          <ul className="list-disc pl-5 mb-4 text-gray-700">
            {job.responsibilities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          
          <h3 className="text-lg font-semibold mb-2">Requirements</h3>
          <ul className="list-disc pl-5 text-gray-700">
            {job.requirements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {!isInternal && job.status === 'Open' && (
          <div className="mt-6">
            <Link
              to={`/jobs/${job.id}/apply`}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-block text-lg"
            >
              Apply for this Position
            </Link>
          </div>
        )}

        {isInternal && (
          <div className="mt-8 pt-6 border-t">
            <Link
              to={`/jobs/${job.id}/applications`}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              View Applications ({/* Number would come from API */}3)
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPostingDetail;