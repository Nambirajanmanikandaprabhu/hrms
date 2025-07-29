import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const UploadDocument = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: 'Contract',
    expiryDate: '',
    confidential: false,
    file: null
  });
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
    if (!formData.name.trim()) newErrors.name = 'Document name is required';
    if (!formData.file) newErrors.file = 'Please select a file to upload';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setUploading(true);
      // Simulate API call
      setTimeout(() => {
        console.log('Document uploaded:', formData);
        setUploading(false);
        navigate(`/employees/${employeeId}/documents`);
      }, 1500);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to={`/employees/${employeeId}/documents`} className="text-blue-600 hover:underline">
          &larr; Back to Documents
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">Upload New Document</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Document Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="type">
              Document Type*
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Contract">Contract</option>
              <option value="Legal">Legal</option>
              <option value="Review">Review</option>
              <option value="Certificate">Certificate</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="expiryDate">
              Expiry Date (if applicable)
            </label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="confidential"
              name="confidential"
              checked={formData.confidential}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="confidential" className="ml-2 block text-gray-700">
              Confidential Document
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="file">
            Select File*
          </label>
          <div className={`border-2 border-dashed rounded-lg p-4 ${errors.file ? 'border-red-500' : 'border-gray-300'}`}>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              className="sr-only"
            />
            <label htmlFor="file" className="cursor-pointer">
              <div className="text-center">
                {formData.file ? (
                  <p className="text-blue-600">{formData.file.name}</p>
                ) : (
                  <>
                    <p className="mb-1">Drag and drop file here or click to select</p>
                    <p className="text-sm text-gray-500">PDF, DOCX, XLSX, JPG, PNG (Max 10MB)</p>
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
            onClick={() => navigate(`/employees/${employeeId}/documents`)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-3 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Document'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadDocument;