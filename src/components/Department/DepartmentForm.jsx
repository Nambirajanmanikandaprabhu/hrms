import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DepartmentForm = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    manager: '',
    description: ''
  });
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(isEdit);

  useEffect(() => {
    // Mock employees for manager selection
    const mockEmployees = [
      { id: 1, name: 'John Doe', position: 'Senior Manager' },
      { id: 2, name: 'Jane Smith', position: 'HR Director' },
      { id: 3, name: 'Bob Johnson', position: 'Engineering Lead' },
    ];
    setEmployees(mockEmployees);

    if (isEdit) {
      // Mock department data for edit
      const mockDepartment = {
        id: id,
        name: 'Engineering',
        manager: 'John Doe',
        description: 'Responsible for product development and engineering'
      };
      setFormData(mockDepartment);
      setIsLoading(false);
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isEdit ? 'Updating department:' : 'Creating department:', formData);
    navigate('/departments');
  };

  if (isLoading) return <p>Loading department data...</p>;

  return (
    <div className="department-form-page">
      <h1>{isEdit ? 'Edit Department' : 'Add New Department'}</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Department Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Manager</label>
          <select
            name="manager"
            value={formData.manager}
            onChange={handleChange}
            required
          >
            <option value="">Select Manager</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.name}>
                {emp.name} ({emp.position})
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            {isEdit ? 'Update Department' : 'Create Department'}
          </button>
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => navigate('/departments')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DepartmentForm;