import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const UploadCertificate = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    program: '',
    completionDate: '',
    file: null
  });
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      file: e.target.files[0]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.program.trim()) newErrors.program = 'Program name is required';
    if (!formData.completionDate) newErrors.completionDate = 'Completion date is required';
    if (!formData.file) newErrors.file = 'Please select a certificate file';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setUploading(true);
      // Simulate API call
      setTimeout(() => {
        console.log('Certificate uploaded:', formData);
        setUploading(false);
        navigate(`/employees/${employeeId}/training`);
      }, 1500);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to={`/employees/${employeeId}/training`} className="text-blue-600 hover:underline">
          &larr; Back to Training Records
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">Upload Training Certificate</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="program">
            Training Program*
          </label>
          <input
            type="text"
            id="program"
            name="program"
            value={formData.program}
            onChange={handleChange}
            placeholder="Enter the name of the training program"
            className={`w-full p-2 border rounded ${errors.program ? 'border-red-500' : ''}`}
          />
          {errors.program && <p className="text-red-500 text-sm mt-1">{errors.program}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="completionDate">
            Completion Date*
          </label>
          <input
            type="date"
            id="completionDate"
            name="completionDate"
            value={formData.completionDate}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.completionDate ? 'border-red-500' : ''}`}
          />
          {errors.completionDate && <p className="text-red-500 text-sm mt-1">{errors.completionDate}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="file">
            Certificate File*
          </label>
          <div className={`border-2 border-dashed rounded-lg p-4 ${errors.file ? 'border-red-500' : 'border-gray-300'}`}>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              className="sr-only"
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <label htmlFor="file" className="cursor-pointer">
              <div className="text-center">
                {formData.file ? (
                  <p className="text-blue-600">{formData.file.name}</p>
                ) : (
                  <>
                    <p className="mb-1">Drag and drop certificate file here or click to select</p>
                    <p className="text-sm text-gray-500">PDF, JPG, PNG (Max 5MB)</p>
                  </>
                )}
              </div>
            </label>
          </div>
          {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file}</p>}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate(`/employees/${employeeId}/training`)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-3 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Certificate'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadCertificate;