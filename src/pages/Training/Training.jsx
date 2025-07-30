import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { BookOpen, Play, CheckCircle, Clock, Award, Plus, Users, TrendingUp } from 'lucide-react';

const Training = () => {
  const { user, hasRole } = useAuth();
  const [trainingPrograms, setTrainingPrograms] = useState([]);
  const [trainingRecords, setTrainingRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('programs');

  useEffect(() => {
    // Mock data - replace with API calls
    const mockPrograms = [
      {
        id: '1',
        name: 'React Advanced Development',
        description: 'Advanced concepts in React including hooks, context, and performance optimization',
        duration: 40, // hours
        isActive: true,
        enrolledCount: 25,
        completedCount: 18,
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        name: 'Leadership Fundamentals',
        description: 'Essential leadership skills for managers and team leads',
        duration: 20,
        isActive: true,
        enrolledCount: 15,
        completedCount: 12,
        createdAt: '2024-01-15T00:00:00Z'
      },
      {
        id: '3',
        name: 'Data Privacy & Security',
        description: 'Understanding GDPR, data protection, and cybersecurity best practices',
        duration: 8,
        isActive: true,
        enrolledCount: 45,
        completedCount: 40,
        createdAt: '2024-02-01T00:00:00Z'
      },
      {
        id: '4',
        name: 'Project Management Essentials',
        description: 'Agile methodologies, project planning, and team coordination',
        duration: 30,
        isActive: true,
        enrolledCount: 20,
        completedCount: 15,
        createdAt: '2024-01-20T00:00:00Z'
      }
    ];

    const mockRecords = [
      {
        id: '1',
        employee: { firstName: 'John', lastName: 'Doe', employeeId: 'EMP001' },
        program: { name: 'React Advanced Development', id: '1' },
        enrolledAt: '2024-01-15T10:00:00Z',
        startedAt: '2024-01-16T09:00:00Z',
        completedAt: '2024-02-15T17:30:00Z',
        score: 92,
        certificate: 'cert-react-advanced-john-doe.pdf',
        notes: 'Excellent performance, demonstrated advanced understanding'
      },
      {
        id: '2',
        employee: { firstName: 'Sarah', lastName: 'Wilson', employeeId: 'EMP002' },
        program: { name: 'Leadership Fundamentals', id: '2' },
        enrolledAt: '2024-01-20T14:30:00Z',
        startedAt: '2024-01-22T10:00:00Z',
        completedAt: null,
        score: null,
        certificate: null,
        notes: 'In progress - 60% completed'
      }
    ];

    setTimeout(() => {
      setTrainingPrograms(mockPrograms);
      setTrainingRecords(mockRecords);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (record) => {
    if (record.completedAt) return 'bg-green-100 text-green-800';
    if (record.startedAt) return 'bg-blue-100 text-blue-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  const getStatusText = (record) => {
    if (record.completedAt) return 'Completed';
    if (record.startedAt) return 'In Progress';
    return 'Enrolled';
  };

  const getStatusIcon = (record) => {
    if (record.completedAt) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (record.startedAt) return <Play className="h-4 w-4 text-blue-600" />;
    return <Clock className="h-4 w-4 text-yellow-600" />;
  };

  const filteredRecords = trainingRecords.filter(record => {
    if (hasRole(['employee']) && record.employee.employeeId !== user?.employeeId) {
      return false;
    }
    return true;
  });

  const handleEnroll = (programId) => {
    const newRecord = {
      id: Date.now().toString(),
      employee: { 
        firstName: user.name.split(' ')[0], 
        lastName: user.name.split(' ')[1] || '', 
        employeeId: user.employeeId || 'EMP999' 
      },
      program: trainingPrograms.find(p => p.id === programId),
      enrolledAt: new Date().toISOString(),
      startedAt: null,
      completedAt: null,
      score: null,
      certificate: null,
      notes: 'Recently enrolled'
    };
    setTrainingRecords([newRecord, ...trainingRecords]);
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
          <h1 className="text-2xl font-bold text-gray-900">Training & Development</h1>
          <p className="text-gray-600">
            {hasRole(['employee']) 
              ? 'Enhance your skills with our training programs' 
              : 'Manage employee training and development programs'
            }
          </p>
        </div>
        {hasRole(['admin', 'hr']) && (
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Add Program</span>
          </button>
        )}
      </div>

      {/* Training Statistics (Admin/HR View) */}
      {hasRole(['admin', 'hr', 'manager']) && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Programs</p>
                <p className="text-2xl font-bold text-gray-900">{trainingPrograms.filter(p => p.isActive).length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Enrollments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {trainingPrograms.reduce((sum, p) => sum + p.enrolledCount, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {trainingPrograms.reduce((sum, p) => sum + p.completedCount, 0)}
                </p>
              </div>
              <Award className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round((trainingPrograms.reduce((sum, p) => sum + p.completedCount, 0) / 
                    trainingPrograms.reduce((sum, p) => sum + p.enrolledCount, 0)) * 100)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>
      )}

      {/* Employee Progress (Employee View) */}
      {hasRole(['employee']) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Enrolled Programs</h3>
              <BookOpen className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {filteredRecords.length}
            </div>
            <p className="text-sm text-gray-600">Active enrollments</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Completed</h3>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600 mb-2">
              {filteredRecords.filter(r => r.completedAt).length}
            </div>
            <p className="text-sm text-gray-600">Programs completed</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Certificates</h3>
              <Award className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {filteredRecords.filter(r => r.certificate).length}
            </div>
            <p className="text-sm text-gray-600">Earned certificates</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'programs', name: 'Training Programs', icon: BookOpen },
              { id: 'records', name: hasRole(['employee']) ? 'My Training' : 'Training Records', icon: Award }
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
          {activeTab === 'programs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trainingPrograms.map((program) => (
                <div key={program.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{program.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{program.description}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      program.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {program.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Duration: {program.duration} hours</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{program.enrolledCount} enrolled</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        <span>{program.completedCount} completed</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {Math.round((program.completedCount / program.enrolledCount) * 100)}% completion rate
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Created {new Date(program.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center space-x-2">
                      {hasRole(['employee']) && (
                        <button
                          onClick={() => handleEnroll(program.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          Enroll
                        </button>
                      )}
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'records' && (
            <div className="space-y-4">
              {filteredRecords.map((record) => (
                <div key={record.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      {!hasRole(['employee']) && (
                        <h3 className="text-lg font-semibold text-gray-900">
                          {record.employee.firstName} {record.employee.lastName}
                        </h3>
                      )}
                      <h4 className="text-md font-medium text-gray-800 mb-2">{record.program.name}</h4>
                      <p className="text-sm text-gray-600">{record.notes}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(record)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(record)}`}>
                        {getStatusText(record)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-500">Enrolled</div>
                      <div className="font-medium">{new Date(record.enrolledAt).toLocaleDateString()}</div>
                    </div>
                    {record.startedAt && (
                      <div>
                        <div className="text-sm text-gray-500">Started</div>
                        <div className="font-medium">{new Date(record.startedAt).toLocaleDateString()}</div>
                      </div>
                    )}
                    {record.completedAt && (
                      <div>
                        <div className="text-sm text-gray-500">Completed</div>
                        <div className="font-medium">{new Date(record.completedAt).toLocaleDateString()}</div>
                      </div>
                    )}
                  </div>

                  {record.completedAt && (
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-4">
                        {record.score && (
                          <div className="flex items-center space-x-2">
                            <Award className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm font-medium">Score: {record.score}%</span>
                          </div>
                        )}
                        {record.certificate && (
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-green-600">Certificate earned</span>
                          </div>
                        )}
                      </div>
                      {record.certificate && (
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          Download Certificate
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Empty States */}
      {activeTab === 'programs' && trainingPrograms.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No training programs available</h3>
          <p className="text-gray-600">Training programs will appear here when they are created</p>
        </div>
      )}

      {activeTab === 'records' && filteredRecords.length === 0 && (
        <div className="text-center py-12">
          <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No training records found</h3>
          <p className="text-gray-600">
            {hasRole(['employee']) 
              ? 'Enroll in training programs to see your progress here' 
              : 'Training records will appear here when employees enroll in programs'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Training;