import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Shield, 
  UserCheck, 
  Briefcase,
  ChevronDown,
  Save,
  X,
  Trash2,
  CheckCircle,
  XCircle
} from 'lucide-react';

const UserEdit = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

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
          employee: {
            firstName: 'Sarah',
            lastName: 'Johnson'
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value,
      employee: {
        ...prev.employee,
        [name]: value
      }
    }));
  };

  const handleRoleChange = (e) => {
    setUser(prev => ({
      ...prev,
      role: e.target.value
    }));
  };

  const handleStatusToggle = () => {
    setUser(prev => ({
      ...prev,
      isActive: !prev.isActive
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('User updated successfully!');
      setTimeout(() => navigate(`/users/${userId}`), 1500);
    } catch (err) {
      setError('Failed to update user. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to deactivate this user?')) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setSuccess('User deactivated successfully!');
        setTimeout(() => navigate('/users'), 1500);
      } catch (err) {
        setError('Failed to deactivate user.');
      }
    }
  };

  if (loading) return <div className="text-center py-8">Loading user...</div>;
  if (!user) return <div className="text-center py-8">User not found</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <User className="h-6 w-6 mr-2" /> Edit User
        </h1>
        <button 
          onClick={() => navigate(`/users/${userId}`)}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <X className="h-5 w-5 mr-1" /> Cancel
        </button>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" /> {success}
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg flex items-center">
          <XCircle className="h-5 w-5 mr-2" /> {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={user.employee.firstName || ''}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={user.employee.lastName || ''}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={user.email || ''}
                  onChange={handleChange}
                  className="flex-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User Role</label>
                <div className="relative">
                  <select
                    value={user.role}
                    onChange={handleRoleChange}
                    className="w-full border rounded-md px-3 py-2 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="ADMIN">Administrator</option>
                    <option value="HR">HR Manager</option>
                    <option value="MANAGER">Department Manager</option>
                    <option value="EMPLOYEE">Employee</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Status</label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={handleStatusToggle}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${user.isActive ? 'bg-green-500' : 'bg-gray-200'}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${user.isActive ? 'translate-x-6' : 'translate-x-1'}`}
                    />
                  </button>
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-5 w-5 mr-1" /> Deactivate User
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-70"
            >
              <Save className="h-5 w-5 mr-1" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;