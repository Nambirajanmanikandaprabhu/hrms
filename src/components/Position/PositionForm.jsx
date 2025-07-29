import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PositionForm = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    description: '',
    requirements: '',
    minSalary: '',
    maxSalary: '',
    currency: 'USD'
  });
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(isEdit);

  useEffect(() => {
    // Mock departments for selection
    const mockDepartments = ['Engineering', 'Marketing', 'Human Resources', 'Finance'];
    setDepartments(mockDepartments);

    if (isEdit) {
      // Mock position data for edit
      const mockPosition = {
        id: id,
        title: 'Software Engineer',
        department: 'Engineering',
        description: 'Develop and maintain software applications',
        requirements: 'Bachelor\'s degree in Computer Science\n3+ years of experience\nProficiency in JavaScript and React',
        minSalary: 80000,
        maxSalary: 120000,
        currency: 'USD'
      };
      setFormData(mockPosition);
      setIsLoading(false);
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isEdit ? 'Updating position:' : 'Creating position:', formData);
    navigate('/positions');
  };

  if (isLoading) return <p>Loading position data...</p>;

  return (
    <div className="position-form-page">
      <h1>{isEdit ? 'Edit Position' : 'Add New Position'}</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Position Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
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
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>
        
        <div className="form-group">
          <label>Requirements (one per line)</label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            rows="4"
          />
        </div>
        
        <div className="salary-fields">
          <div className="form-group">
            <label>Minimum Salary</label>
            <input
              type="number"
              name="minSalary"
              value={formData.minSalary}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Maximum Salary</label>
            <input
              type="number"
              name="maxSalary"
              value={formData.maxSalary}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Currency</label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            {isEdit ? 'Update Position' : 'Create Position'}
          </button>
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => navigate('/positions')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PositionForm;