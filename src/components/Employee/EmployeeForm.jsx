import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    department: '',
    position: '',
    hireDate: '',
    salary: '',
    status: 'active',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    },
    onboardingTasks: []
  });
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Complete paperwork', assigned: false },
    { id: 2, name: 'Equipment setup', assigned: false },
    { id: 3, name: 'Orientation session', assigned: false },
    { id: 4, name: 'Training program', assigned: false },
  ]);
  const [departments] = useState(['Engineering', 'HR', 'Marketing', 'Finance', 'Operations']);
  const [isLoading, setIsLoading] = useState(isEditMode);

  // Load employee data in edit mode
  useEffect(() => {
    if (isEditMode) {
      // Mock data - replace with API call in real implementation
      const mockEmployee = {
        id: id,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-123-4567',
        address: '123 Main St, City, Country',
        department: 'Engineering',
        position: 'Senior Developer',
        hireDate: '2020-05-15',
        salary: '85000',
        status: 'active',
        emergencyContact: {
          name: 'Jane Doe',
          relationship: 'Spouse',
          phone: '555-987-6543'
        },
        onboardingTasks: [1, 3] // IDs of assigned tasks
      };
      
      // Update form data
      setFormData(mockEmployee);
      
      // Update tasks selection
      setTasks(prevTasks => 
        prevTasks.map(task => ({
          ...task,
          assigned: mockEmployee.onboardingTasks.includes(task.id)
        }))
      );
      
      setIsLoading(false);
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmergencyContactChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [name]: value
      }
    }));
  };

  const handleTaskToggle = (taskId) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, assigned: !task.assigned } : task
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare the data to submit
    const submittedData = {
      ...formData,
      onboardingTasks: tasks.filter(task => task.assigned).map(task => task.id)
    };
    
    console.log('Form submitted:', submittedData);
    // Here you would typically make an API call to save the data
    
    // Navigate back to employee list after submission
    navigate('/employees');
  };

  if (isLoading) {
    return <p>Loading employee data...</p>;
  }

  return (
    <div className="employee-form-page">
      <h1>{isEditMode ? 'Edit Employee' : 'Add New Employee'}</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Personal Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h2>Emergency Contact</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Contact Name</label>
              <input
                type="text"
                name="name"
                value={formData.emergencyContact.name}
                onChange={handleEmergencyContactChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Relationship</label>
              <input
                type="text"
                name="relationship"
                value={formData.emergencyContact.relationship}
                onChange={handleEmergencyContactChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Contact Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.emergencyContact.phone}
                onChange={handleEmergencyContactChange}
                required
              />
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h2>Job Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Hire Date</label>
              <input
                type="date"
                name="hireDate"
                value={formData.hireDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Salary</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h2>Onboarding Tasks</h2>
          <div className="tasks-list">
            {tasks.map(task => (
              <div key={task.id} className="task-item">
                <input
                  type="checkbox"
                  id={`task-${task.id}`}
                  checked={task.assigned}
                  onChange={() => handleTaskToggle(task.id)}
                />
                <label htmlFor={`task-${task.id}`}>{task.name}</label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            {isEditMode ? 'Update Employee' : 'Create Employee'}
          </button>
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => navigate('/employees')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;