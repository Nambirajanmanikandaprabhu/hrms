import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Shield, 
  UserCheck, 
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Edit
} from 'lucide-react';

const UserDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        const mockUser = {
          id: userId,
          email: 'admin@company.com',
          role: 'ADMIN',
          isActive: true,
          createdAt: '2022-01-15T08:30:00Z',
          lastLoginAt: '2023-05-20T14:45:00Z',
          employee: {
            firstName: 'Sarah',
            lastName: 'Johnson',
            phone: '+1 (555) 123-4567',
            department: {
              name: 'Executive'
            },
            position: {
              title: 'Chief Administrator'
            }
          }
        };
        setUser(mockUser);
      } catch (error) {
        console.error('Failed to fetch user', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  const getRoleDetails = (role) => {
    switch(role) {
      case 'ADMIN': 
        return { icon: <Shield className="h-5 w-5 text-purple-600" />, label: 'Administrator' };
      case 'HR': 
        return { icon: <UserCheck className="h-5 w-5 text-blue-600" />, label: 'HR Manager' };
      case 'MANAGER': 
        return { icon: <Briefcase className="h-5 w-5 text-green-600" />, label: 'Department Manager' };
      default: 
        return { icon: <User className="h-5 w-5 text-gray-600" />, label: 'Employee' };
    }
  };

  if (loading) return <div className="text-center py-8">Loading user details...</div>;
  if (!user) return <div className="text-center py-8">User not found</div>;

  const roleDetails = getRoleDetails(user.role);

  return (
    <div className="container mx-auto px-4 py-6">
      <button 
        onClick={() => navigate('/users')}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Users
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center">
            <User className="h-5 w-5 mr-2" />
            {user.employee.firstName} {user.employee.lastName}
          </h2>
          <button
            onClick={() => navigate(`/users/${user.id}/edit`)}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
          >
            <Edit className="h-4 w-4 mr-1" /> Edit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <div className="col-span-1">
            <div className="flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <User className="h-12 w-12 text-gray-500" />
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {user.isActive ? 'Active' : 'Inactive'}
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {user.employee.firstName} {user.employee.lastName}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="mt-1 text-sm text-gray-900 flex items-center">
                    <Mail className="h-4 w-4 mr-1 text-gray-500" /> {user.email}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Role</h3>
                  <p className="mt-1 text-sm text-gray-900 flex items-center">
                    {roleDetails.icon} <span className="ml-1">{roleDetails.label}</span>
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {user.employee.phone || 'Not provided'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Department</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {user.employee.department?.name || 'Not assigned'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Position</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {user.employee.position?.title || 'Not assigned'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Account Created</h3>
                  <p className="mt-1 text-sm text-gray-900 flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-gray-500" />
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Last Login</h3>
                  <p className="mt-1 text-sm text-gray-900 flex items-center">
                    {user.lastLoginAt ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                        {new Date(user.lastLoginAt).toLocaleString()}
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 mr-1 text-gray-500" />
                        Never logged in
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;