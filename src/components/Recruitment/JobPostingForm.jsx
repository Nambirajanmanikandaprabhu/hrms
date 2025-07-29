import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const JobPostingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    status: 'Draft',
    postedDate: new Date().toISOString().split('T')[0],
    closingDate: '',
    description: '',
    responsibilities: [''],
    requirements: ['']
  });
  const [loading, setLoading] = useState(isEditing);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing) {
      // Simulate API call to fetch existing job
      const fetchJobPosting = async () => {
        try {
          // In a real app, this would be an API call
          const mockData = {
            id: 1,
            title: 'Frontend Developer',
            department: 'Engineering',
            location: 'Remote',
            status: 'Draft',
            postedDate: '2023-05-15',
            closingDate: '2023-06-15',
            description: 'We are looking for a skilled Frontend Developer to join our team...',
            responsibilities: [
              'Develop user interfaces with React.js',
              'Collaborate with design team to implement UI/UX',
              'Write clean, maintainable code',
              'Participate in code reviews'
            ],
            requirements: [
              '3+ years of experience with React',
              'Proficiency in JavaScript, HTML, CSS',
              'Experience with Redux or similar state management',
              'Bachelor\'s degree in Computer Science or related field'
            ]
          };
          setFormData(mockData);
        } catch (error) {
          console.error('Error fetching job posting:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchJobPosting();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.closingDate) newErrors.closingDate = 'Closing date is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    formData.responsibilities.forEach((item, index) => {
      if (!item.trim()) newErrors[`responsibility-${index}`] = 'Responsibility cannot be empty';
    });
    
    formData.requirements.forEach((item, index) => {
      if (!item.trim()) newErrors[`requirement-${index}`] = 'Requirement cannot be empty';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real app, this would be an API call
      console.log('Form submitted:', formData);
      // Simulate successful submission
      navigate('/internal/jobs');
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading job data...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/internal/jobs" className="text-blue-600 hover:underline">
          &larr; Back to All Jobs
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? 'Edit Job Posting' : 'Create New Job Posting'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="title">
              Job Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.title ? 'border-red-500' : ''}`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="department">
              Department*
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.department ? 'border-red-500' : ''}`}
            />
            {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="location">
              Location*
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.location ? 'border-red-500' : ''}`}
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Draft">Draft</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="postedDate">
              Posted Date
            </label>
            <input
              type="date"
              id="postedDate"
              name="postedDate"
              value={formData.postedDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="closingDate">
              Closing Date*
            </label>
            <input
              type="date"
              id="closingDate"
              name="closingDate"
              value={formData.closingDate}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.closingDate ? 'border-red-500' : ''}`}
            />
            {errors.closingDate && <p className="text-red-500 text-sm mt-1">{errors.closingDate}</p>}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Job Description*
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            className={`w-full p-2 border rounded ${errors.description ? 'border-red-500' : ''}`}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Responsibilities*</h3>
          {formData.responsibilities.map((item, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange('responsibilities', index, e.target.value)}
                className={`flex-1 p-2 border rounded ${errors[`responsibility-${index}`] ? 'border-red-500' : ''}`}
              />
              <button
                type="button"
                onClick={() => removeArrayItem('responsibilities', index)}
                className="ml-2 bg-red-500 text-white px-3 rounded hover:bg-red-600"
              >
                ×
              </button>
              {errors[`responsibility-${index}`] && (
                <p className="text-red-500 text-sm mt-1">{errors[`responsibility-${index}`]}</p>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('responsibilities')}
            className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 text-sm"
          >
            + Add Responsibility
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Requirements*</h3>
          {formData.requirements.map((item, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                className={`flex-1 p-2 border rounded ${errors[`requirement-${index}`] ? 'border-red-500' : ''}`}
              />
              <button
                type="button"
                onClick={() => removeArrayItem('requirements', index)}
                className="ml-2 bg-red-500 text-white px-3 rounded hover:bg-red-600"
              >
                ×
              </button>
              {errors[`requirement-${index}`] && (
                <p className="text-red-500 text-sm mt-1">{errors[`requirement-${index}`]}</p>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('requirements')}
            className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 text-sm"
          >
            + Add Requirement
          </button>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/internal/jobs')}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-3 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {isEditing ? 'Update Job Posting' : 'Create Job Posting'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobPostingForm;