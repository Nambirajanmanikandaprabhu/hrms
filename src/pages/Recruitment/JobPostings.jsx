import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Eye, Edit, Trash2, MapPin, Clock, Users, Briefcase, DollarSign, Calendar } from 'lucide-react';

const JobPostings = () => {
  const { hasRole } = useAuth();
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    // Mock data - replace with API call
    const mockJobPostings = [
      {
        id: '1',
        title: 'Senior Software Engineer',
        description: 'We are looking for an experienced software engineer to join our growing team...',
        requirements: ['5+ years experience', 'React/Node.js', 'AWS knowledge'],
        department: { name: 'Engineering', id: '1' },
        position: { title: 'Senior Software Engineer', id: '1' },
        salaryMin: 90000,
        salaryMax: 120000,
        location: 'New York, NY',
        employmentType: 'FULL_TIME',
        status: 'OPEN',
        postedAt: '2024-01-15T09:00:00Z',
        expiresAt: '2024-03-15T23:59:59Z',
        applications: 23,
        views: 156
      },
      {
        id: '2',
        title: 'Marketing Specialist',
        description: 'Join our marketing team to drive brand awareness and customer acquisition...',
        requirements: ['3+ years marketing experience', 'Digital marketing skills', 'Analytics tools'],
        department: { name: 'Marketing', id: '3' },
        position: { title: 'Marketing Specialist', id: '4' },
        salaryMin: 60000,
        salaryMax: 80000,
        location: 'San Francisco, CA',
        employmentType: 'FULL_TIME',
        status: 'OPEN',
        postedAt: '2024-01-20T10:30:00Z',
        expiresAt: '2024-04-20T23:59:59Z',
        applications: 45,
        views: 289
      },
      {
        id: '3',
        title: 'HR Coordinator',
        description: 'Support our HR team with recruitment, onboarding, and employee relations...',
        requirements: ['2+ years HR experience', 'HRIS knowledge', 'Strong communication'],
        department: { name: 'Human Resources', id: '2' },
        position: { title: 'HR Coordinator', id: '3' },
        salaryMin: 50000,
        salaryMax: 65000,
        location: 'Chicago, IL',
        employmentType: 'FULL_TIME',
        status: 'CLOSED',
        postedAt: '2024-01-10T14:15:00Z',
        expiresAt: '2024-02-10T23:59:59Z',
        applications: 67,
        views: 234
      }
    ];

    setTimeout(() => {
      setJobPostings(mockJobPostings);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'OPEN': return 'bg-green-100 text-green-800';
      case 'CLOSED': return 'bg-red-100 text-red-800';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
      case 'ON_HOLD': return 'bg-yellow-100 text-yellow-800';
      case 'CANCELLED': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEmploymentTypeColor = (type) => {
    switch (type) {
      case 'FULL_TIME': return 'bg-blue-100 text-blue-800';
      case 'PART_TIME': return 'bg-purple-100 text-purple-800';
      case 'CONTRACT': return 'bg-orange-100 text-orange-800';
      case 'INTERN': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredJobs = jobPostings.filter(job => {
    if (activeTab === 'all') return true;
    return job.status.toLowerCase() === activeTab;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      setJobPostings(jobPostings.filter(job => job.id !== id));
    }
  };

  const JobPostingModal = ({ job, onClose, onSave }) => {
    const [formData, setFormData] = useState({
      title: job?.title || '',
      description: job?.description || '',
      requirements: job?.requirements?.join('\n') || '',
      departmentId: job?.department?.id || '',
      salaryMin: job?.salaryMin || '',
      salaryMax: job?.salaryMax || '',
      location: job?.location || '',
      employmentType: job?.employmentType || 'FULL_TIME',
      expiresAt: job?.expiresAt ? job.expiresAt.split('T')[0] : ''
    });

    const departments = [
      { id: '1', name: 'Engineering' },
      { id: '2', name: 'Human Resources' },
      { id: '3', name: 'Marketing' },
      { id: '4', name: 'Finance' },
      { id: '5', name: 'Sales' }
    ];

    const handleSubmit = (e) => {
      e.preventDefault();
      const processedData = {
        ...formData,
        requirements: formData.requirements.split('\n').filter(req => req.trim()),
        salaryMin: parseFloat(formData.salaryMin) || 0,
        salaryMax: parseFloat(formData.salaryMax) || 0
      };
      onSave(processedData);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {job ? 'Edit Job Posting' : 'Create Job Posting'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Requirements (one per line)</label>
              <textarea
                value={formData.requirements}
                onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                placeholder="Enter each requirement on a new line"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  value={formData.departmentId}
                  onChange={(e) => setFormData({...formData, departmentId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select department</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type</label>
                <select
                  value={formData.employmentType}
                  onChange={(e) => setFormData({...formData, employmentType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="FULL_TIME">Full Time</option>
                  <option value="PART_TIME">Part Time</option>
                  <option value="CONTRACT">Contract</option>
                  <option value="INTERN">Intern</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Salary</label>
                <input
                  type="number"
                  value={formData.salaryMin}
                  onChange={(e) => setFormData({...formData, salaryMin: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Salary</label>
                <input
                  type="number"
                  value={formData.salaryMax}
                  onChange={(e) => setFormData({...formData, salaryMax: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., New York, NY"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expires At</label>
              <input
                type="date"
                value={formData.expiresAt}
                onChange={(e) => setFormData({...formData, expiresAt: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {job ? 'Update' : 'Create'} Job Posting
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Postings</h1>
          <p className="text-gray-600">Manage job openings and recruitment</p>
        </div>
        {hasRole(['admin', 'hr']) && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Post New Job</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'all', name: 'All Jobs', count: jobPostings.length },
              { id: 'open', name: 'Open', count: jobPostings.filter(j => j.status === 'OPEN').length },
              { id: 'closed', name: 'Closed', count: jobPostings.filter(j => j.status === 'CLOSED').length },
              { id: 'in_progress', name: 'In Progress', count: jobPostings.filter(j => j.status === 'IN_PROGRESS').length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.name}</span>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Job Postings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    <span>{job.department?.name}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(job.status)}`}>
                  {job.status}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEmploymentTypeColor(job.employmentType)}`}>
                  {job.employmentType.replace('_', ' ')}
                </span>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>

            {job.requirements && job.requirements.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Key Requirements:</h4>
                <div className="flex flex-wrap gap-1">
                  {job.requirements.slice(0, 3).map((req, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {req}
                    </span>
                  ))}
                  {job.requirements.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      +{job.requirements.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                {job.salaryMin && job.salaryMax && (
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Posted {new Date(job.postedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{job.applications} applications</span>
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{job.views} views</span>
                </div>
              </div>

              {hasRole(['admin', 'hr']) && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => console.log('View applications for job:', job.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setEditingJob(job)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No job postings found</h3>
          <p className="text-gray-600">
            {activeTab === 'all' 
              ? 'No job postings have been created yet.' 
              : `No ${activeTab.replace('_', ' ')} job postings found.`
            }
          </p>
        </div>
      )}

      {/* Modals */}
      {showCreateModal && (
        <JobPostingModal
          onClose={() => setShowCreateModal(false)}
          onSave={(data) => {
            const newJob = {
              id: Date.now().toString(),
              ...data,
              status: 'OPEN',
              postedAt: new Date().toISOString(),
              applications: 0,
              views: 0,
              department: { name: 'Engineering', id: data.departmentId } // Mock department lookup
            };
            setJobPostings([newJob, ...jobPostings]);
          }}
        />
      )}

      {editingJob && (
        <JobPostingModal
          job={editingJob}
          onClose={() => setEditingJob(null)}
          onSave={(data) => {
            setJobPostings(jobPostings.map(job => 
              job.id === editingJob.id 
                ? { ...job, ...data }
                : job
            ));
          }}
        />
      )}
    </div>
  );
};

export default JobPostings;