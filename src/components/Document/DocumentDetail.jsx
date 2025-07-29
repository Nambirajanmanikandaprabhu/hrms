import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const DocumentDetail = () => {
  const { employeeId, documentId } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    expiryDate: '',
    confidential: false
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Simulate API call
    const fetchDocument = async () => {
      try {
        const mockData = {
          id: documentId,
          name: 'Employment Contract',
          type: 'Contract',
          uploadDate: '2022-01-15',
          expiryDate: null,
          confidential: true,
          uploadedBy: 'HR Manager',
          fileSize: '2.4 MB',
          fileType: 'PDF'
        };
        setDocument(mockData);
        setFormData({
          name: mockData.name,
          type: mockData.type,
          expiryDate: mockData.expiryDate || '',
          confidential: mockData.confidential
        });
      } catch (error) {
        console.error('Error fetching document:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [documentId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Document name is required';
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setDocument(prev => ({
        ...prev,
        ...formData
      }));
      setEditing(false);
      // In real app, this would be an API call to save changes
    }
  };

  const handleDelete = () => {
    // In real app, this would be an API call
    console.log('Document deleted:', documentId);
    navigate(`/employees/${employeeId}/documents`);
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading document details...</div>;
  }

  if (!document) {
    return <div className="container mx-auto px-4 py-8 text-center">Document not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to={`/employees/${employeeId}/documents`} className="text-blue-600 hover:underline">
          &larr; Back to Documents
        </Link>
      </div>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            {editing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`p-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
              />
            ) : (
              document.name
            )}
          </h1>
          {errors.name && <p className="text-red-500">{errors.name}</p>}
          <p className="text-gray-600">Uploaded on {document.uploadDate} by {document.uploadedBy}</p>
        </div>
        <div className="flex space-x-3">
          {!editing && (
            <>
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Edit Details
              </button>
              <a 
                href={`/documents/${documentId}/download`} 
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Download
              </a>
            </>
          )}
          {editing && (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditing(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Document Information</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700">Type</h3>
              {editing ? (
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mt-1"
                >
                  <option value="Contract">Contract</option>
                  <option value="Legal">Legal</option>
                  <option value="Review">Review</option>
                  <option value="Certificate">Certificate</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p>{document.type}</p>
              )}
            </div>

            <div>
              <h3 className="font-medium text-gray-700">File Details</h3>
              <p>Type: {document.fileType}</p>
              <p>Size: {document.fileSize}</p>
            </div>

            <div>
              <h3 className="font-medium text-gray-700">Expiry Date</h3>
              {editing ? (
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mt-1"
                />
              ) : (
                <p>{document.expiryDate || 'N/A'}</p>
              )}
            </div>

            <div>
              <h3 className="font-medium text-gray-700">Confidential</h3>
              {editing ? (
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="confidential"
                    checked={formData.confidential}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2">Mark as confidential</span>
                </label>
              ) : (
                <span className={`px-2 py-1 rounded-full text-sm ${
                  document.confidential ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {document.confidential ? 'Yes' : 'No'}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Document Preview</h2>
          <div className="bg-gray-100 rounded-lg flex items-center justify-center h-64">
            <p className="text-gray-500">PDF preview would be displayed here</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Danger Zone</h2>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete Document
          </button>
        </div>
        <p className="text-gray-600 mt-2">
          Deleting this document will permanently remove it from the system. This action cannot be undone.
        </p>
      </div>
    </div>
  );
};

export default DocumentDetail;