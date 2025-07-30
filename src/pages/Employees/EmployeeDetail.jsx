import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ArrowLeft, Edit, Mail, Phone, MapPin, Calendar, Building, User, 
  FileText, Clock, Award, BookOpen, AlertTriangle, DollarSign 
} from 'lucide-react';

const EmployeeDetail = () => {
  const { id } = useParams();
  const { hasRole } = useAuth();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Mock data - replace with API call
    const mockEmployee = {
      id: '1',
      employeeId: 'EMP001',
      firstName: 'John',
      lastName: 'Doe',
      middleName: 'Michael',
      email: 'john.doe@company.com',
      phone: '+1-555-0101',
      dateOfBirth: '1990-05-15',
      gender: 'MALE',
      maritalStatus: 'MARRIED',
      nationality: 'American',
      address: '123 Main St, Apt 4B',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zipCode: '10001',
      emergencyContactName: 'Jane Doe',
      emergencyContactPhone: '+1-555-0102',
      emergencyContactRelation: 'Spouse',
      department: { name: 'Engineering', id: '1' },
      position: { title: 'Senior Software Engineer', id: '1' },
      manager: { firstName: 'Mike', lastName: 'Johnson', id: '3' },
      employmentType: 'FULL_TIME',
      employmentStatus: 'ACTIVE',
      hireDate: '2022-01-15',
      probationEndDate: '2022-07-15',
      baseSalary: 95000,
      currency: 'USD',
      profilePicture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Experienced software engineer with expertise in React, Node.js, and cloud technologies.',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
      qualifications: ['B.S. Computer Science', 'AWS Certified Solutions Architect'],
      createdAt: '2022-01-15T09:00:00Z',
      updatedAt: '2024-01-15T10:30:00Z'
    };

    setTimeout(() => {
      setEmployee(mockEmployee);
      setLoading(false);
    }, 1000);
  }, [id]);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'attendance', name: 'Attendance', icon: Clock },
    { id: 'leave', name: 'Leave', icon: Calendar },
    { id: 'performance', name: 'Performance', icon: Award },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'training', name: 'Training', icon: BookOpen },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Employee not found</h3>
        <Link to="/employees" className="text-blue-600 hover:text-blue-800">
          ← Back to employees
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/employees"
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {employee.firstName} {employee.lastName}
            </h1>
            <p className="text-gray-600">{employee.employeeId} • {employee.position?.title}</p>
          </div>
        </div>
        {hasRole(['admin', 'hr']) && (
          <Link
            to={`/employees/${employee.id}/edit`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Edit className="h-4 w-4" />
            <span>Edit Employee</span>
          </Link>
        )}
      </div>

      {/* Employee Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-start space-x-6">
          <img
            src={employee.profilePicture}
            alt={`${employee.firstName} ${employee.lastName}`}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{employee.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{employee.phone}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{employee.city}, {employee.state}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Employment Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Building className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{employee.department?.name}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span>Joined {new Date(employee.hireDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <User className="h-4 w-4 text-gray-400 mr-2" />
                    <span>Reports to {employee.manager?.firstName} {employee.manager?.lastName}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
                <div className="space-y-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    employee.employmentStatus === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                    employee.employmentStatus === 'ON_LEAVE' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {employee.employmentStatus}
                  </span>
                  <div className="text-sm text-gray-600">
                    {employee.employmentType.replace('_', ' ')}
                  </div>
                  {hasRole(['admin', 'hr']) && (
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                      <span>${employee.baseSalary?.toLocaleString()}/year</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {employee.bio && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">About</h3>
            <p className="text-gray-700">{employee.bio}</p>
          </div>
        )}
        
        {employee.skills && employee.skills.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {employee.skills.map((skill, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
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
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date of Birth:</span>
                    <span>{new Date(employee.dateOfBirth).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Gender:</span>
                    <span>{employee.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Marital Status:</span>
                    <span>{employee.maritalStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Nationality:</span>
                    <span>{employee.nationality}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Name:</span>
                    <span>{employee.emergencyContactName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Phone:</span>
                    <span>{employee.emergencyContactPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Relation:</span>
                    <span>{employee.emergencyContactRelation}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Attendance Records</h3>
              <p className="text-gray-600">Attendance tracking will be displayed here</p>
            </div>
          )}

          {activeTab === 'leave' && (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Leave History</h3>
              <p className="text-gray-600">Leave requests and balances will be displayed here</p>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="text-center py-8">
              <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Performance Reviews</h3>
              <p className="text-gray-600">Performance evaluations will be displayed here</p>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Documents</h3>
              <p className="text-gray-600">Employee documents will be displayed here</p>
            </div>
          )}

          {activeTab === 'training' && (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Training Records</h3>
              <p className="text-gray-600">Training programs and certifications will be displayed here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;