import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Calendar, Clock, Video, MapPin, Plus, Eye, Edit, Users } from 'lucide-react';

const InterviewList = () => {
  const { hasRole } = useAuth();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    // Mock data - replace with API call
    const mockInterviews = [
      {
        id: '1',
        application: {
          firstName: 'John',
          lastName: 'Smith',
          email: 'john.smith@email.com',
          jobPosting: { title: 'Senior Software Engineer' }
        },
        scheduledAt: '2024-02-15T10:00:00Z',
        duration: 60,
        location: 'Conference Room A',
        type: 'Technical',
        interviewers: ['Mike Johnson', 'Sarah Wilson'],
        status: 'scheduled',
        feedback: null,
        rating: null,
        createdAt: '2024-02-01T09:00:00Z'
      },
      {
        id: '2',
        application: {
          firstName: 'Emily',
          lastName: 'Davis',
          email: 'emily.davis@email.com',
          jobPosting: { title: 'Marketing Specialist' }
        },
        scheduledAt: '2024-02-10T14:30:00Z',
        duration: 45,
        location: 'Video Call',
        type: 'HR Screening',
        interviewers: ['Sarah Wilson'],
        status: 'completed',
        feedback: 'Strong communication skills, good cultural fit',
        rating: 4,
        createdAt: '2024-01-28T11:00:00Z'
      },
      {
        id: '3',
        application: {
          firstName: 'Alex',
          lastName: 'Brown',
          email: 'alex.brown@email.com',
          jobPosting: { title: 'Product Manager' }
        },
        scheduledAt: '2024-02-20T16:00:00Z',
        duration: 90,
        location: 'Conference Room B',
        type: 'Panel Interview',
        interviewers: ['David Brown', 'Mike Johnson', 'Lisa Thompson'],
        status: 'scheduled',
        feedback: null,
        rating: null,
        createdAt: '2024-02-05T10:30:00Z'
      }
    ];

    setTimeout(() => {
      setInterviews(mockInterviews);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'rescheduled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'HR Screening': return 'bg-purple-100 text-purple-800';
      case 'Technical': return 'bg-blue-100 text-blue-800';
      case 'Panel Interview': return 'bg-green-100 text-green-800';
      case 'Final Interview': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInterviews = interviews.filter(interview => {
    const matchesStatus = filterStatus === 'all' || interview.status === filterStatus;
    const matchesType = filterType === 'all' || interview.type === filterType;
    return matchesStatus && matchesType;
  });

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
          <h1 className="text-2xl font-bold text-gray-900">Interview Management</h1>
          <p className="text-gray-600">Schedule and manage candidate interviews</p>
        </div>
        {hasRole(['admin', 'hr']) && (
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Schedule Interview</span>
          </button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Interviews</p>
              <p className="text-2xl font-bold text-gray-900">{interviews.length}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-blue-600">
                {interviews.filter(i => i.status === 'scheduled').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {interviews.filter(i => i.status === 'completed').length}
              </p>
            </div>
            <Users className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-purple-600">
                {interviews.filter(i => i.rating).length > 0 
                  ? (interviews.filter(i => i.rating).reduce((sum, i) => sum + i.rating, 0) / 
                     interviews.filter(i => i.rating).length).toFixed(1)
                  : 'N/A'
                }
              </p>
            </div>
            <Video className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="rescheduled">Rescheduled</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="HR Screening">HR Screening</option>
              <option value="Technical">Technical</option>
              <option value="Panel Interview">Panel Interview</option>
              <option value="Final Interview">Final Interview</option>
            </select>
          </div>
        </div>
      </div>

      {/* Interviews List */}
      <div className="space-y-4">
        {filteredInterviews.map((interview) => (
          <div key={interview.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {interview.application.firstName} {interview.application.lastName}
                </h3>
                <p className="text-gray-600 mb-2">{interview.application.jobPosting.title}</p>
                <p className="text-sm text-gray-500">{interview.application.email}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(interview.type)}`}>
                  {interview.type}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(interview.status)}`}>
                  {interview.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{new Date(interview.scheduledAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                <span>{new Date(interview.scheduledAt).toLocaleTimeString()} ({interview.duration} min)</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                {interview.location === 'Video Call' ? (
                  <Video className="h-4 w-4 mr-2" />
                ) : (
                  <MapPin className="h-4 w-4 mr-2" />
                )}
                <span>{interview.location}</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm font-medium text-gray-900 mb-2">Interviewers</div>
              <div className="flex flex-wrap gap-2">
                {interview.interviewers.map((interviewer, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {interviewer}
                  </span>
                ))}
              </div>
            </div>

            {interview.feedback && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-900 mb-1">Feedback</div>
                <div className="text-sm text-gray-600">{interview.feedback}</div>
                {interview.rating && (
                  <div className="mt-2 flex items-center">
                    <span className="text-sm text-gray-600 mr-2">Rating:</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < interview.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({interview.rating}/5)</span>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Scheduled {new Date(interview.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-800 flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>View Details</span>
                </button>
                <button className="text-green-600 hover:text-green-800 flex items-center space-x-1">
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                {interview.status === 'scheduled' && (
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                    Join Interview
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredInterviews.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No interviews found</h3>
          <p className="text-gray-600">
            {filterStatus === 'all' && filterType === 'all'
              ? 'No interviews have been scheduled yet'
              : 'No interviews match your current filters'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default InterviewList;