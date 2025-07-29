import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const DisciplinaryActionForm = () => {        
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [formData, setFormData] = useState({
    employeeId: '',
    type: 'Verbal Warning',
    date: new Date().toISOString().split('T')[0],
    severity: 'Medium',
    status: 'Active',
    reason: '',
    description: '',
    consequences: '',
    resolution: '',
    documents: []
  });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(isEditing);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Simulate fetching employees
    const mockEmployees = [
      { id: 'EMP-1001', name: 'John Smith', position: 'Sales Associate', department: 'Sales' },
      { id: 'EMP-1002', name: 'Sarah Johnson', position: 'Marketing Manager', department: 'Marketing' },
      { id: 'EMP-1003', name: 'Michael Chen', position: 'Software Engineer', department: 'Engineering' },
    ];
    setEmployees(mockEmployees);

    if (isEditing) {
      // Simulate fetching existing action
      const mockAction = {
        id: 1,
        employeeId: 'EMP-1001',
        type: 'Written Warning',
        date: '2023-05-10',
        severity: 'Medium',
        status: 'Active',
        reason: 'Repeated tardiness and unexcused absences',
        description: 'Employee has been late to work 5 times in the past month without proper notification or excuse.',
        consequences: 'This written warning will be placed in the employee file. Further violations may result in suspension or termination.',
        resolution: '',
        documents: ['warning_letter.pdf', 'attendance_record.pdf']
      };
      setFormData(mockAction);
      setLoading(false);
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...files.map(file => file.name)]
    }));
  };

  const removeDocument = (index) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.employeeId) newErrors.employeeId = 'Employee is required';
    if (!formData.reason.trim()) newErrors.reason = 'Reason is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.consequences.trim()) newErrors.consequences = 'Consequences are required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real app, this would be an API call
      console.log('Form submitted:', formData);
      navigate('/disciplinary/actions');
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading disciplinary action data...</div>;
  }

  const selectedEmployee = employees.find(emp => emp.id === formData.employeeId);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/disciplinary/actions" className="text-blue-600 hover:underline">
          &larr; Back to Disciplinary Actions
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? 'Edit Disciplinary Action' : 'Create New Disciplinary Action'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="employeeId">
              Employee*
            </label>
            <select
              id="employeeId"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.employeeId ? 'border-red-500' : ''}`}
            >
              <option value="">Select an employee</option>
              {employees.map(employee => (
                <option key={employee.id} value={employee.id}>
                  {employee.name} ({employee.position}, {employee.department})
                </option>
              ))}
            </select>
            {errors.employeeId && <p className="text-red-500 text-sm mt-1">{errors.employeeId}</p>}
          </div>

          {selectedEmployee && (
            <div className="bg-gray-50 p-3 rounded">
              <p className="font-medium">Selected Employee:</p>
              <p>{selectedEmployee.name}</p>
              <p>{selectedEmployee.position}, {selectedEmployee.department}</p>
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="type">
              Action Type*
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Verbal Warning">Verbal Warning</option>
              <option value="Written Warning">Written Warning</option>
              <option value="Suspension">Suspension</option>
              <option value="Final Warning">Final Warning</option>
              <option value="Termination">Termination</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="date">
              Date*
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="severity">
              Severity*
            </label>
            <select
              id="severity"
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="status">
              Status*
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Active">Active</option>
              <option value="Resolved">Resolved</option>
              <option value="Appealed">Appealed</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="reason">
            Reason for Action*
          </label>
          <input
            type="text"
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.reason ? 'border-red-500' : ''}`}
            placeholder="Briefly describe the reason for this action"
          />
          {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Detailed Description*
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={`w-full p-2 border rounded ${errors.description ? 'border-red-500' : ''}`}
            placeholder="Provide a detailed description of the incident or behavior"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="consequences">
            Consequences*
          </label>
          <textarea
            id="consequences"
            name="consequences"
            value={formData.consequences}
            onChange={handleChange}
            rows="3"
            className={`w-full p-2 border rounded ${errors.consequences ? 'border-red-500' : ''}`}
            placeholder="Describe the consequences of this action and any future implications"
          />
          {errors.consequences && <p className="text-red-500 text-sm mt-1">{errors.consequences}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="resolution">
            Resolution (if applicable)
          </label>
          <textarea
            id="resolution"
            name="resolution"
            value={formData.resolution}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border rounded"
            placeholder="Describe how this issue can be resolved"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Attach Documents</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <input
              type="file"
              id="documents"
              name="documents"
              onChange={handleFileUpload}
              className="sr-only"
              multiple
            />
            <label htmlFor="documents" className="cursor-pointer">
              <div className="text-center">
                <p className="mb-1">Drag and drop files here or click to select</p>
                <p className="text-sm text-gray-500">PDF, DOCX, JPG, PNG (Max 10MB each)</p>
              </div>
            </label>
          </div>
          {formData.documents.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium mb-1">Attached files:</p>
              <ul className="space-y-1">
                {formData.documents.map((doc, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-sm">{doc}</span>
                    <button
                      type="button"
                      onClick={() => removeDocument(index)}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/disciplinary/actions')}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-3 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {isEditing ? 'Update Disciplinary Action' : 'Create Disciplinary Action'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DisciplinaryActionForm;