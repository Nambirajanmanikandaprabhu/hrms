import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const JobApplicationDetail = () => {
  const { id, applicationId } = useParams();
  const [application, setApplication] = useState(null);
  const [jobTitle, setJobTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');

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
        
        // Fetch application details
        const mockApplication = {
          id: 1,
          candidateName: 'John Doe',
          email: 'john@example.com',
          phone: '(555) 123-4567',
          appliedDate: '2023-05-20',
          status: 'Interview',
          resume: 'john_doe_resume.pdf',
          coverLetter: 'Dear Hiring Manager, I am excited to apply for the Frontend Developer position...',
          education: [
            { degree: 'B.Sc Computer Science', university: 'State University', year: '2015-2019' }
          ],
          experience: [
            { position: 'Frontend Developer', company: 'Tech Corp', duration: '2020-Present', description: 'Developed web applications using React...' }
          ],
          skills: ['JavaScript', 'React', 'HTML/CSS', 'Redux'],
          interviews: [
            { id: 1, date: '2023-06-01', time: '14:00', interviewer: 'Jane Smith', type: 'Technical' }
          ]
        };
        setApplication(mockApplication);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, applicationId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Interview': return 'bg-purple-100 text-purple-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Hired': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const updateStatus = (newStatus) => {
    setApplication(prev => ({
      ...prev,
      status: newStatus
    }));
    // In a real app, this would be an API call
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading application details...</div>;
  }

  if (!application) {
    return <div className="container mx-auto px-4 py-8 text-center">Application not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to={`/jobs/${id}/applications`} className="text-blue-600 hover:underline">
          &larr; Back to Applications
        </Link>
      </div>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">{application.candidateName}</h1>
          <h2 className="text-xl text-gray-600 mb-2">{jobTitle}</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
            {application.status}
          </span>
        </div>
        <div className="flex space-x-3">
          <a 
            href={`/resumes/${application.resume}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View Resume
          </a>
          <Link
            to={`/jobs/${id}/applications/${applicationId}/schedule-interview`}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Schedule Interview
          </Link>
        </div>
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
            Application Details
          </button>
          <button
            onClick={() => setActiveTab('interviews')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'interviews' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Interviews ({application.interviews.length})
          </button>
        </nav>
      </div>

      {activeTab === 'details' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Email:</span> {application.email}</p>
                <p><span className="font-medium">Phone:</span> {application.phone}</p>
                <p><span className="font-medium">Applied Date:</span> {application.appliedDate}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Update Status</h3>
              <div className="flex flex-wrap gap-2">
                {['New', 'Interview', 'Rejected', 'Hired'].map(status => (
                  <button
                    key={status}
                    onClick={() => updateStatus(status)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      application.status === status 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Cover Letter</h3>
            <div className="bg-gray-50 p-4 rounded">
              <p className="whitespace-pre-line">{application.coverLetter}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Education</h3>
              {application.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <p className="font-medium">{edu.degree}</p>
                  <p>{edu.university} • {edu.year}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Work Experience</h3>
              {application.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <p className="font-medium">{exp.position}</p>
                  <p>{exp.company} • {exp.duration}</p>
                  <p className="mt-1 text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {application.skills.map((skill, index) => (
                <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'interviews' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          {application.interviews.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No interviews scheduled yet
            </div>
          ) : (
            <div className="space-y-6">
              {application.interviews.map((interview) => (
                <div key={interview.id} className="border rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{interview.type} Interview</h3>
                      <p className="text-gray-600">
                        {interview.date} at {interview.time} with {interview.interviewer}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        to={`/jobs/${id}/applications/${applicationId}/interviews/${interview.id}/feedback`}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                      >
                        Add Feedback
                      </Link>
                      <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300">
                        Reschedule
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobApplicationDetail;