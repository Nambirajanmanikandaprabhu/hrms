// services/authService.js

export const authService = {
  async login(credentials) {
    const mockUsers = {
      'admin@company.com': {
        password: 'admin123',
        user: {
          id: 1,
          name: 'Admin User',
          email: 'admin@company.com',
          role: 'admin',
          permissions: ['all'],
          department: 'Management',
          position: 'CEO',
          joinDate: '2020-01-01',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
        },
        token: 'mock-admin-token-123'
      },
      'hr@company.com': {
        password: 'hr1234',
        user: {
          id: 2,
          name: 'HR Manager',
          email: 'hr@company.com',
          role: 'hr_manager',
          permissions: ['employees', 'recruitment'],
          department: 'Human Resources',
          position: 'HR Manager',
          joinDate: '2020-02-01',
          avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
        },
        token: 'mock-hr-token-123'
      },
      'manager@company.com': {
        password: 'manager123',
        user: {
          id: 3,
          name: 'Department Manager',
          email: 'manager@company.com',
          role: 'manager',
          permissions: ['team', 'attendance'],
          department: 'Operations',
          position: 'Operations Manager',
          joinDate: '2020-03-01',
          avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
        },
        token: 'mock-manager-token-123'
      },
      'employee@company.com': {
        password: 'emp123',
        user: {
          id: 4,
          name: 'Regular Employee',
          email: 'employee@company.com',
          role: 'employee',
          permissions: ['self'],
          department: 'Development',
          position: 'Software Developer',
          joinDate: '2020-04-01',
          avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
        },
        token: 'mock-employee-token-123'
      }
    };

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userData = mockUsers[credentials.email];

        if (!userData || userData.password !== credentials.password) {
          reject(new Error('Invalid email or password'));
          return;
        }

        resolve({
          user: userData.user,
          token: userData.token
        });
      }, 800); // Simulate API delay
    });
  },

  async verifyToken(token) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockTokens = {
          'mock-admin-token-123': {
            id: 1,
            name: 'Admin User',
            email: 'admin@company.com',
            role: 'admin',
            permissions: ['all'],
            department: 'Management',
            position: 'CEO',
            joinDate: '2020-01-01',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
          },
          'mock-hr-token-123': {
            id: 2,
            name: 'HR Manager',
            email: 'hr@company.com',
            role: 'hr_manager',
            permissions: ['employees', 'recruitment'],
            department: 'Human Resources',
            position: 'HR Manager',
            joinDate: '2020-02-01',
            avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
          },
          'mock-manager-token-123': {
            id: 3,
            name: 'Department Manager',
            email: 'manager@company.com',
            role: 'manager',
            permissions: ['team', 'attendance'],
            department: 'Operations',
            position: 'Operations Manager',
            joinDate: '2020-03-01',
            avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
          },
          'mock-employee-token-123': {
            id: 4,
            name: 'Regular Employee',
            email: 'employee@company.com',
            role: 'employee',
            permissions: ['self'],
            department: 'Development',
            position: 'Software Developer',
            joinDate: '2020-04-01',
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
          }
        };

        const user = mockTokens[token];
        if (!user) {
          reject(new Error('Invalid token'));
          return;
        }

        resolve(user);
      }, 300); // Simulate API delay
    });
  },

  async register(userData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: Math.floor(Math.random() * 1000) + 5,
          name: userData.name,
          email: userData.email,
          role: 'employee',
          permissions: ['self'],
          department: userData.department || 'General',
          position: userData.position || 'Employee',
          joinDate: new Date().toISOString().split('T')[0],
          avatar: 'https://randomuser.me/api/portraits/neutral/1.jpg'
        };

        resolve({
          user: newUser,
          token: `mock-new-user-token-${Math.random().toString(36).substr(2, 9)}`
        });
      }, 1000);
    });
  },

  async resetPassword(email) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: `Password reset link sent to ${email}`
        });
      }, 800);
    });
  },

  async updateProfile(userId, updates) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          id: userId,
          name: updates.name || 'Updated User',
          email: updates.email || 'updated@company.com',
          role: updates.role || 'employee',
          department: updates.department || 'General',
          position: updates.position || 'Employee',
          joinDate: updates.joinDate || new Date().toISOString().split('T')[0],
          avatar: updates.avatar || 'https://randomuser.me/api/portraits/neutral/2.jpg'
        };
        resolve(user);
      }, 600);
    });
  }
};
