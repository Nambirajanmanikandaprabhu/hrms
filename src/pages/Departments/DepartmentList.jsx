import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Search, Plus, Users, Edit, Trash2, Building2, MapPin, DollarSign } from 'lucide-react';

const DepartmentList = () => {
  const { hasRole } = useAuth();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);

  useEffect(() => {
    // Mock data - replace with API call
    const mockDepartments = [
      {
        id: '1',
        name: 'Engineering',
        description: 'Software development and technical operations',
        manager: { firstName: 'Sarah', lastName: 'Johnson', id: '1' },
        employeeCount: 45,
        budget: 2500000,
        location: 'New York',
        isActive: true,
        createdAt: '2020-01-15T09:00:00Z'
      },
      {
        id: '2',
        name: 'Human Resources',
        description: 'Employee relations, recruitment, and HR policies',
        manager: { firstName: 'Mike', lastName: 'Wilson', id: '2' },
        employeeCount: 12,
        budget: 800000,
        location: 'New York',
        isActive: true,
        createdAt: '2020-01-15T09:00:00Z'
      },
      {
        id: '3',
        name: 'Marketing',
        description: 'Brand management, digital marketing, and customer acquisition',
        manager: { firstName: 'Emily', lastName: 'Davis', id: '3' },
        employeeCount: 28,
        budget: 1200000,
        location: 'San Francisco',
        isActive: true,
        createdAt: '2020-02-01T09:00:00Z'
      },
      {
        id: '4',
        name: 'Finance',
        description: 'Financial planning, accounting, and budget management',
        manager: { firstName: 'Alex', lastName: 'Brown', id: '4' },
        employeeCount: 18,
        budget: 900000,
        location: 'Chicago',
        isActive: true,
        createdAt: '2020-02-15T09:00:00Z'
      },
      {
        id: '5',
        name: 'Sales',
        description: 'Revenue generation and customer relationship management',
        manager: { firstName: 'Lisa', lastName: 'Thompson', id: '5' },
        employeeCount: 35,
        budget: 1800000,
        location: 'Los Angeles',
        isActive: true,
        createdAt: '2020-03-01T09:00:00Z'
      }
    ];

    setTimeout(() => {
      setDepartments(mockDepartments);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (dept.manager && `${dept.manager.firstName} ${dept.manager.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartments(departments.filter(dept => dept.id !== id));
    }
  };

  const DepartmentModal = ({ department, onClose, onSave }) => {
    const [formData, setFormData] = useState({
      name: department?.name || '',
      description: department?.description || '',
      managerId: department?.manager?.id || '',
      location: department?.location || '',
      budget: department?.budget || '',
      isActive: department?.isActive ?? true
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {department ? 'Edit Department' : 'Create Department'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget
              </label>
              <input
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                Active Department
              </label>
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
                {department ? 'Update' : 'Create'}
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
          <h1 className="text-2xl font-bold text-gray-900">Departments</h1>
          <p className="text-gray-600">Manage organizational departments and structure</p>
        </div>
        {hasRole(['admin', 'hr']) && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Department</span>
          </button>
        )}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Department Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((department) => (
          <div key={department.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{department.name}</h3>
                  <p className="text-sm text-gray-600">{department.employeeCount} employees</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                department.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {department.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{department.description}</p>

            <div className="space-y-2 mb-4">
              {department.manager && (
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Manager: {department.manager.firstName} {department.manager.lastName}</span>
                </div>
              )}
              {department.location && (
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{department.location}</span>
                </div>
              )}
              {hasRole(['admin', 'hr']) && department.budget && (
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span>${department.budget.toLocaleString()} budget</span>
                </div>
              )}
            </div>

            {hasRole(['admin', 'hr']) && (
              <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setEditingDepartment(department)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(department.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredDepartments.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No departments found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}

      {/* Modals */}
      {showCreateModal && (
        <DepartmentModal
          onClose={() => setShowCreateModal(false)}
          onSave={(data) => {
            const newDepartment = {
              id: Date.now().toString(),
              ...data,
              employeeCount: 0,
              createdAt: new Date().toISOString()
            };
            setDepartments([...departments, newDepartment]);
          }}
        />
      )}

      {editingDepartment && (
        <DepartmentModal
          department={editingDepartment}
          onClose={() => setEditingDepartment(null)}
          onSave={(data) => {
            setDepartments(departments.map(dept => 
              dept.id === editingDepartment.id 
                ? { ...dept, ...data }
                : dept
            ));
          }}
        />
      )}
    </div>
  );
};

export default DepartmentList;