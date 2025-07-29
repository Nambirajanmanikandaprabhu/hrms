import api from './api';

// Mock data for demonstration
const mockEmployees = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'Software Engineer',
    department: 'Engineering',
    status: 'active',
    joinDate: '2022-01-15',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    phone: '+1-555-0101',
    location: 'New York',
    salary: 95000,
    manager: 'Mike Johnson',
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    role: 'HR Manager',
    department: 'Human Resources',
    status: 'active',
    joinDate: '2021-03-10',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    phone: '+1-555-0102',
    location: 'New York',
    salary: 85000,
    manager: 'David Brown',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    role: 'Engineering Manager',
    department: 'Engineering',
    status: 'active',
    joinDate: '2020-06-20',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    phone: '+1-555-0103',
    location: 'San Francisco',
    salary: 120000,
    manager: 'David Brown',
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    role: 'Marketing Specialist',
    department: 'Marketing',
    status: 'active',
    joinDate: '2022-09-05',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
    phone: '+1-555-0104',
    location: 'Chicago',
    salary: 65000,
    manager: 'Lisa Thompson',
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@company.com',
    role: 'CEO',
    department: 'Executive',
    status: 'active',
    joinDate: '2019-01-01',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
    phone: '+1-555-0105',
    location: 'New York',
    salary: 250000,
    manager: null,
  },
];

export const employeeService = {
  async getEmployees(filters = {}) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredEmployees = [...mockEmployees];
        
        if (filters.search) {
          const searchTerm = filters.search.toLowerCase();
          filteredEmployees = filteredEmployees.filter(emp => 
            emp.name.toLowerCase().includes(searchTerm) ||
            emp.email.toLowerCase().includes(searchTerm) ||
            emp.role.toLowerCase().includes(searchTerm)
          );
        }
        
        if (filters.department) {
          filteredEmployees = filteredEmployees.filter(emp => 
            emp.department === filters.department
          );
        }
        
        if (filters.status) {
          filteredEmployees = filteredEmployees.filter(emp => 
            emp.status === filters.status
          );
        }
        
        resolve({
          data: filteredEmployees,
          total: filteredEmployees.length,
        });
      }, 500);
    });
  },

  async getEmployee(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const employee = mockEmployees.find(emp => emp.id === parseInt(id));
        if (employee) {
          resolve(employee);
        } else {
          reject(new Error('Employee not found'));
        }
      }, 300);
    });
  },

  async createEmployee(employeeData) {
    try {
      const response = await api.post('/employees', employeeData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create employee');
    }
  },

  async updateEmployee(id, employeeData) {
    try {
      const response = await api.put(`/employees/${id}`, employeeData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update employee');
    }
  },

  async deleteEmployee(id) {
    try {
      await api.delete(`/employees/${id}`);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete employee');
    }
  },
};