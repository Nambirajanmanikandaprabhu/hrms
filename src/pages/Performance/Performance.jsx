import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Award, TrendingUp, Calendar, Plus, Eye, Edit, Star, Target, BarChart3 } from 'lucide-react';

const Performance = () => {
  const { user, hasRole } = useAuth();
  const [performanceReviews, setPerformanceReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('reviews');

  useEffect(() => {
    // Mock data - replace with API call
    const mockReviews = [
      {
        id: '1',
        employee: { firstName: 'John', lastName: 'Doe', employeeId: 'EMP001' },
        reviewer: { firstName: 'Mike', lastName: 'Johnson' },
        reviewPeriodStart: '2023-07-01',
        reviewPeriodEnd: '2023-12-31',
        overallRating: 'EXCEEDS_EXPECTATIONS',
        goals: ['Complete React migration', 'Mentor junior developers', 'Improve code quality'],
        achievements: 'Successfully led the React migration project, mentored 3 junior developers, and improved code coverage by 25%.',
        areasForImprovement: 'Focus on documentation and knowledge sharing',
        feedback: 'John has shown exceptional leadership and technical skills this period.',
        status: 'completed',
        submittedAt: '2024-01-15T10:00:00Z',
        approvedAt: '2024-01-16T14:30:00Z'
      },
      {
        id: '2',
        employee: { firstName: 'Sarah', lastName: 'Wilson', employeeId: 'EMP002' },
        reviewer: { firstName: 'David', lastName: 'Brown' },
        reviewPeriodStart: '2023-07-01',
        reviewPeriodEnd: '2023-12-31',
        overallRating: 'MEETS_EXPECTATIONS',
        goals: ['Improve recruitment metrics', 'Implement new HRIS', 'Enhance employee engagement'],
        achievements: 'Successfully implemented new HRIS system and improved time-to-hire by 20%.',
        areasForImprovement: 'Develop strategic thinking skills',
        feedback: 'Sarah has made solid progress in all key areas.',
        status: 'completed',
        submittedAt: '2024-01-10T09:15:00Z',
        approvedAt: '2024-01-12T11:45:00Z'
      }
    ];

    setTimeout(() => {
      setPerformanceReviews(mockReviews);
      setLoading(false);
    }, 1000);
  }, []);

  const getRatingColor = (rating) => {
    switch (rating) {
      case 'OUTSTANDING': return 'bg-purple-100 text-purple-800';
      case 'EXCEEDS_EXPECTATIONS': return 'bg-green-100 text-green-800';
      case 'MEETS_EXPECTATIONS': return 'bg-blue-100 text-blue-800';
      case 'BELOW_EXPECTATIONS': return 'bg-orange-100 text-orange-800';
      case 'UNSATISFACTORY': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingStars = (rating) => {
    const ratings = {
      'OUTSTANDING': 5,
      'EXCEEDS_EXPECTATIONS': 4,
      'MEETS_EXPECTATIONS': 3,
      'BELOW_EXPECTATIONS': 2,
      'UNSATISFACTORY': 1
    };
    return ratings[rating] || 0;
  };

  const filteredReviews = performanceReviews.filter(review => {
    if (hasRole(['employee']) && review.employee.employeeId !== user?.employeeId) {
      return false;
    }
    return true;
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
          <h1 className="text-2xl font-bold text-gray-900">Performance Management</h1>
          <p className="text-gray-600">
            {hasRole(['employee']) 
              ? 'Track your performance reviews and goals' 
              : 'Manage employee performance reviews and evaluations'
            }
          </p>
        </div>
        {hasRole(['admin', 'hr', 'manager']) && (
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="h-4 w-4" />
            <span>New Review</span>
          </button>
        )}
      </div>

      {/* Performance Summary (Employee View) */}
      {hasRole(['employee']) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Current Rating</h3>
              <Award className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < getRatingStars('EXCEEDS_EXPECTATIONS')
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-600">Exceeds Expectations</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Goals Progress</h3>
              <Target className="h-5 w-5 text-green-600" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Completed:</span>
                <span className="font-medium text-green-600">8/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Next Review</h3>
              <Calendar className="h-5 w-5 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">45 days</div>
            <p className="text-sm text-gray-600">Due: March 15, 2024</p>
          </div>
        </div>
      )}

      {/* Performance Analytics (Manager/HR View) */}
      {hasRole(['admin', 'hr', 'manager']) && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">3.8</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-600">23</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">7</p>
              </div>
              <TrendingUp className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'reviews', name: 'Performance Reviews', icon: Award },
              { id: 'goals', name: 'Goals & Objectives', icon: Target },
              { id: 'analytics', name: 'Analytics', icon: BarChart3 }
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
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      {!hasRole(['employee']) && (
                        <h3 className="text-lg font-semibold text-gray-900">
                          {review.employee.firstName} {review.employee.lastName}
                        </h3>
                      )}
                      <p className="text-gray-600">
                        Review Period: {new Date(review.reviewPeriodStart).toLocaleDateString()} - {new Date(review.reviewPeriodEnd).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        Reviewed by: {review.reviewer.firstName} {review.reviewer.lastName}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getRatingColor(review.overallRating)}`}>
                        {review.overallRating.replace('_', ' ')}
                      </span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < getRatingStars(review.overallRating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Goals & Objectives</h4>
                      <ul className="space-y-1">
                        {review.goals.map((goal, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <Target className="h-3 w-3 mr-2 text-blue-600" />
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Key Achievements</h4>
                      <p className="text-sm text-gray-600">{review.achievements}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Areas for Improvement</h4>
                        <p className="text-sm text-gray-600">{review.areasForImprovement}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Manager Feedback</h4>
                        <p className="text-sm text-gray-600">{review.feedback}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Completed on {new Date(review.approvedAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>View Details</span>
                      </button>
                      {hasRole(['admin', 'hr', 'manager']) && (
                        <button className="text-green-600 hover:text-green-800 flex items-center space-x-1">
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'goals' && (
            <div className="text-center py-8">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Goals & Objectives</h3>
              <p className="text-gray-600">Goal tracking and management will be displayed here</p>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="text-center py-8">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Performance Analytics</h3>
              <p className="text-gray-600">Performance metrics and analytics will be displayed here</p>
            </div>
          )}
        </div>
      </div>

      {filteredReviews.length === 0 && activeTab === 'reviews' && (
        <div className="text-center py-12">
          <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No performance reviews found</h3>
          <p className="text-gray-600">
            {hasRole(['employee']) 
              ? 'You don\'t have any performance reviews yet.' 
              : 'No performance reviews have been created yet.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Performance;