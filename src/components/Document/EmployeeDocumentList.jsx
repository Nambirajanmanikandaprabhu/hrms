import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const EmployeeDocumentsList = () => {
  const { employeeId } = useParams();
  const [documents, setDocuments] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate API calls
    const fetchData = async () => {
      try {
        // Fetch employee data
        const mockEmployee = {
          id: employeeId,
          name: 'Alex Johnson',
          position: 'Product Manager'
        };
        setEmployee(mockEmployee);
        
        // Fetch documents
        const mockDocuments = [
          { id: 1, name: 'Employment Contract', type: 'Contract', uploadDate: '2022-01-15', expiryDate: null, confidential: true },
          { id: 2, name: 'NDA Agreement', type: 'Legal', uploadDate: '2022-01-16', expiryDate: '2025-01-16', confidential: true },
          { id: 3, name: 'Performance Review 2022', type: 'Review', uploadDate: '2023-01-10', expiryDate: null, confidential: false },
          { id: 4, name: 'Training Certificate - Project Management', type: 'Certificate', uploadDate: '2022-06-20', expiryDate: '2024-06-20', confidential: false },
        ];
        setDocuments(mockDocuments);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [employeeId]);

  const filteredDocuments = documents.filter(doc => {
    const matchesFilter = filter === 'All' || doc.type === filter;
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDeleteDocument = (docId) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId));
  };

  const toggleConfidential = (docId) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === docId ? { ...doc, confidential: !doc.confidential } : doc
    ));
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading documents...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/employees" className="text-blue-600 hover:underline">
          &larr; Back to Employees
        </Link>
      </div>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Employee Documents</h1>
          <h2 className="text-xl text-gray-600">
            {employee.name} • {employee.position}
          </h2>
        </div>
        <Link
          to={`/employees/${employeeId}/documents/upload`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload Document
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <input
            type="text"
            placeholder="Search documents..."
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Filter by type:</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="All">All</option>
            <option value="Contract">Contract</option>
            <option value="Legal">Legal</option>
            <option value="Review">Review</option>
            <option value="Certificate">Certificate</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {filteredDocuments.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow">
          No documents found matching your criteria
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidential</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/employees/${employeeId}/documents/${doc.id}`} className="text-blue-600 hover:underline">
                      {doc.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{doc.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{doc.uploadDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{doc.expiryDate || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleConfidential(doc.id)}
                      className={`px-2 py-1 text-xs rounded-full ${
                        doc.confidential ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {doc.confidential ? 'Yes' : 'No'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <a 
                        href={`/documents/${doc.id}/download`} 
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Download
                      </a>
                      <button
                        onClick={() => handleDeleteDocument(doc.id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeDocumentsList;