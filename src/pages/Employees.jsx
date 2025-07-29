import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  Users,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Building,
  Star,
  Award,
  TrendingUp,
  ChevronDown,
  MoreVertical,
  UserCheck,
  UserX,
  Briefcase,
  X,
  CheckCircle2,
  AlertCircle,
  Clock
} from 'lucide-react';

const Card = ({ children, className = '', padding = 'default', ...props }) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8'
  };
  
  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 ${paddingClasses[padding]} ${className}`} {...props}>
      {children}
    </div>
  );
};

const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:ring-4 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-200 shadow-lg hover:shadow-xl hover:scale-105',
    outline: 'border-2 border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus:ring-blue-200 hover:scale-105',
    ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-200',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-200 shadow-lg hover:shadow-xl'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className={`bg-white rounded-2xl shadow-2xl border border-slate-200/60 ${sizeClasses[size]} w-full max-h-[90vh] overflow-y-auto animate-slideInUp`}>
        <div className="flex items-center justify-between p-6 border-b border-slate-200/60">
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-slate-600" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const departments = ['All', 'Engineering', 'Human Resources', 'Marketing', 'Sales', 'Finance', 'Operations'];

  // Mock data with Indian context
  const mockEmployees = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@company.in',
      phone: '+91 98765 43210',
      role: 'Senior Software Engineer',
      department: 'Engineering',
      joinDate: '2022-03-15',
      status: 'active',
      salary: 1250000,
      location: 'Bangalore, Karnataka',
      manager: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      performance: 94,
      experience: '5 years',
      skills: ['React', 'Node.js', 'Python', 'AWS']
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@company.in',
      phone: '+91 87654 32109',
      role: 'Engineering Manager',
      department: 'Engineering',
      joinDate: '2020-01-10',
      status: 'active',
      salary: 2100000,
      location: 'Mumbai, Maharashtra',
      manager: 'Amit Gupta',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b820?w=100&h=100&fit=crop&crop=face',
      performance: 98,
      experience: '8 years',
      skills: ['Leadership', 'JavaScript', 'Team Management', 'Agile']
    },
    {
      id: 3,
      name: 'Arjun Patel',
      email: 'arjun.patel@company.in',
      phone: '+91 76543 21098',
      role: 'UI/UX Designer',
      department: 'Marketing',
      joinDate: '2023-07-20',
      status: 'active',
      salary: 850000,
      location: 'Pune, Maharashtra',
      manager: 'Sneha Reddy',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      performance: 89,
      experience: '3 years',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research']
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      email: 'sneha.reddy@company.in',
      phone: '+91 65432 10987',
      role: 'Marketing Director',
      department: 'Marketing',
      joinDate: '2019-09-05',
      status: 'active',
      salary: 1800000,
      location: 'Hyderabad, Telangana',
      manager: 'Vikram Singh',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      performance: 96,
      experience: '7 years',
      skills: ['Digital Marketing', 'Strategy', 'Analytics', 'Brand Management']
    },
    {
      id: 5,
      name: 'Vikram Singh',
      email: 'vikram.singh@company.in',
      phone: '+91 54321 09876',
      role: 'Sales Executive',
      department: 'Sales',
      joinDate: '2023-02-12',
      status: 'inactive',
      salary: 720000,
      location: 'Delhi, NCR',
      manager: 'Ravi Mehta',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      performance: 78,
      experience: '2 years',
      skills: ['Sales', 'CRM', 'Negotiation', 'Lead Generation']
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEmployees(mockEmployees);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'All' || employee.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (sortBy === 'salary') {
      aValue = Number(aValue);
      bValue = Number(bValue);
    }
    
    if (sortBy === 'joinDate') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleDeleteEmployee = (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== employeeId));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(salary);
  };

  const getStatusConfig = (status) => {
    return status === 'active' 
      ? { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: CheckCircle2 }
      : { bg: 'bg-red-100', text: 'text-red-700', icon: AlertCircle };
  };

  const getDepartmentColor = (department) => {
    const colors = {
      'Engineering': 'from-blue-500 to-blue-600',
      'Marketing': 'from-purple-500 to-purple-600',
      'Sales': 'from-green-500 to-green-600',
      'Human Resources': 'from-pink-500 to-pink-600',
      'Finance': 'from-amber-500 to-amber-600',
      'Operations': 'from-indigo-500 to-indigo-600'
    };
    return colors[department] || 'from-slate-500 to-slate-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-600 font-medium">Loading employees...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Employee Management
            </h1>
            <p className="text-slate-600 mt-2 text-lg">
              Manage and view employee information • {employees.length} total employees
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Employee</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Total Employees</p>
                <p className="text-2xl font-bold text-slate-900">{employees.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600">
                <UserCheck className="h-8 w-8 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Active</p>
                <p className="text-2xl font-bold text-slate-900">
                  {employees.filter(emp => emp.status === 'active').length}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600">
                <Building className="h-8 w-8 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Departments</p>
                <p className="text-2xl font-bold text-slate-900">{departments.length - 1}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Avg Performance</p>
                <p className="text-2xl font-bold text-slate-900">91%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 w-full border-2 border-slate-200 rounded-xl bg-white/80 backdrop-blur-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200"
                />
              </div>
              
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-3 border-2 border-slate-200 rounded-xl bg-white/80 backdrop-blur-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="px-4 py-3 border-2 border-slate-200 rounded-xl bg-white/80 backdrop-blur-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all duration-200"
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="joinDate-desc">Newest First</option>
                <option value="joinDate-asc">Oldest First</option>
                <option value="salary-desc">Highest Salary</option>
                <option value="salary-asc">Lowest Salary</option>
              </select>
              
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>More Filters</span>
              </Button>
            </div>
          </div>
        </Card>

        {/* Employee Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedEmployees.map((employee, index) => {
            const statusConfig = getStatusConfig(employee.status);
            const StatusIcon = statusConfig.icon;
            
            return (
              <Card 
                key={employee.id} 
                className="p-6 hover:scale-105 transition-all duration-300 group relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${getDepartmentColor(employee.department)} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={employee.avatar}
                        alt={employee.name}
                        className="w-12 h-12 rounded-full object-cover ring-4 ring-white shadow-lg"
                      />
                      <div>
                        <h3 className="font-bold text-slate-900 group-hover:text-slate-800">
                          {employee.name}
                        </h3>
                        <p className="text-sm text-slate-600">{employee.role}</p>
                      </div>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 hover:bg-slate-100 rounded-lg">
                      <MoreVertical className="h-4 w-4 text-slate-400" />
                    </button>
                  </div>

                  {/* Department Badge */}
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getDepartmentColor(employee.department)} mb-4`}>
                    <Building className="h-3 w-3 mr-1" />
                    {employee.department}
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Mail className="h-4 w-4" />
                      <span>{employee.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <MapPin className="h-4 w-4" />
                      <span>{employee.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {formatDate(employee.joinDate)}</span>
                    </div>
                  </div>

                  {/* Salary & Performance */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Salary</p>
                      <p className="text-lg font-bold text-slate-900">{formatSalary(employee.salary)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-600">Performance</p>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-amber-500 fill-current" />
                        <span className="text-lg font-bold text-slate-900">{employee.performance}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${statusConfig.bg}`}>
                      <StatusIcon className={`h-4 w-4 ${statusConfig.text}`} />
                      <span className={`text-sm font-medium ${statusConfig.text} capitalize`}>
                        {employee.status}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">{employee.experience}</span>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-slate-600 mb-2">Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {employee.skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-lg">
                          {skill}
                        </span>
                      ))}
                      {employee.skills.length > 3 && (
                        <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-lg">
                          +{employee.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleViewEmployee(employee)}
                      className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="text-sm font-medium">View</span>
                    </button>
                    <button className="flex items-center justify-center p-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors duration-200">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteEmployee(employee.id)}
                      className="flex items-center justify-center p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {sortedEmployees.length === 0 && (
          <Card className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No employees found</h3>
            <p className="text-slate-600 mb-4">Try adjusting your search or filter criteria</p>
            <Button variant="outline">Clear Filters</Button>
          </Card>
        )}

        {/* Employee Detail Modal */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Employee Details"
          size="xl"
        >
          {selectedEmployee && (
            <div className="space-y-8">
              {/* Header */}
              <div className="flex items-start space-x-6">
                <img
                  src={selectedEmployee.avatar}
                  alt={selectedEmployee.name}
                  className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-xl"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        {selectedEmployee.name}
                      </h3>
                      <p className="text-lg text-slate-600 mb-2">{selectedEmployee.role}</p>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${getDepartmentColor(selectedEmployee.department)}`}>
                        <Building className="h-4 w-4 mr-2" />
                        {selectedEmployee.department}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-600">Performance Score</p>
                      <div className="flex items-center space-x-1">
                        <Award className="h-5 w-5 text-amber-500" />
                        <span className="text-2xl font-bold text-slate-900">{selectedEmployee.performance}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Personal Information</span>
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                      <Mail className="h-5 w-5 text-slate-500" />
                      <div>
                        <p className="text-sm font-medium text-slate-600">Email</p>
                        <p className="text-slate-900">{selectedEmployee.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                      <Phone className="h-5 w-5 text-slate-500" />
                      <div>
                        <p className="text-sm font-medium text-slate-600">Phone</p>
                        <p className="text-slate-900">{selectedEmployee.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                      <MapPin className="h-5 w-5 text-slate-500" />
                      <div>
                        <p className="text-sm font-medium text-slate-600">Location</p>
                        <p className="text-slate-900">{selectedEmployee.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Employment Information */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
                    <Briefcase className="h-5 w-5" />
                    <span>Employment Information</span>
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                      <Building className="h-5 w-5 text-slate-500" />
                      <div>
                        <p className="text-sm font-medium text-slate-600">Department</p>
                        <p className="text-slate-900">{selectedEmployee.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                      <Calendar className="h-5 w-5 text-slate-500" />
                      <div>
                        <p className="text-sm font-medium text-slate-600">Join Date</p>
                        <p className="text-slate-900">{formatDate(selectedEmployee.joinDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                      <Users className="h-5 w-5 text-slate-500" />
                      <div>
                        <p className="text-sm font-medium text-slate-600">Manager</p>
                        <p className="text-slate-900">{selectedEmployee.manager}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Salary Information */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Compensation</span>
                  </h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-sm font-medium text-slate-600 mb-1">Annual Salary</p>
                      <p className="text-2xl font-bold text-slate-900">{formatSalary(selectedEmployee.salary)}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-sm font-medium text-slate-600 mb-1">Performance Bonus</p>
                      <p className="text-2xl font-bold text-slate-900">{formatSalary(selectedEmployee.salary * 0.15)}</p>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Status</span>
                  </h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-600 mb-1">Employment Status</p>
                          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusConfig(selectedEmployee.status).bg}`}>
                            <StatusIcon className={`h-4 w-4 ${getStatusConfig(selectedEmployee.status).text}`} />
                            <span className={`text-sm font-medium ${getStatusConfig(selectedEmployee.status).text} capitalize`}>
                              {selectedEmployee.status}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-slate-600 mb-1">Experience</p>
                          <p className="text-slate-900">{selectedEmployee.experience}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-sm font-medium text-slate-600 mb-1">Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedEmployee.skills.map((skill, i) => (
                          <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-lg">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-slate-200/60">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Close
                </Button>
                <Button>
                  Edit Employee
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Employees;