import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FileText, Upload, Download, Eye, Trash2, Filter, Search, File, Image, Archive } from 'lucide-react';

const Documents = () => {
  const { user, hasRole } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    // Mock data - replace with API call
    const mockDocuments = [
      {
        id: '1',
        title: 'Employee Handbook 2024',
        description: 'Updated company policies and procedures',
        fileName: 'employee-handbook-2024.pdf',
        fileSize: 2048576, // 2MB
        mimeType: 'application/pdf',
        documentType: 'POLICY',
        isConfidential: false,
        employee: null, // Company-wide document
        uploadedBy: { firstName: 'HR', lastName: 'Admin' },
        createdAt: '2024-01-15T10:00:00Z',
        expiresAt: null
      },
      {
        id: '2',
        title: 'John Doe - Employment Contract',
        description: 'Employment agreement and terms',
        fileName: 'john-doe-contract.pdf',
        fileSize: 1024000, // 1MB
        mimeType: 'application/pdf',
        documentType: 'CONTRACT',
        isConfidential: true,
        employee: { firstName: 'John', lastName: 'Doe', employeeId: 'EMP001' },
        uploadedBy: { firstName: 'Sarah', lastName: 'Wilson' },
        createdAt: '2024-01-10T14:30:00Z',
        expiresAt: null
      },
      {
        id: '3',
        title: 'Sarah Wilson - Resume',
        description: 'Updated resume and qualifications',
        fileName: 'sarah-wilson-resume.pdf',
        fileSize: 512000, // 512KB
        mimeType: 'application/pdf',
        documentType: 'RESUME',
        isConfidential: false,
        employee: { firstName: 'Sarah', lastName: 'Wilson', employeeId: 'EMP002' },
        uploadedBy: { firstName: 'Sarah', lastName: 'Wilson' },
        createdAt: '2024-01-08T09:15:00Z',
        expiresAt: null
      },
      {
        id: '4',
        title: 'Training Certificate - React Advanced',
        description: 'Completion certificate for React Advanced course',
        fileName: 'react-advanced-cert.pdf',
        fileSize: 256000, // 256KB
        mimeType: 'application/pdf',
        documentType: 'EDUCATION_CERTIFICATE',
        isConfidential: false,
        employee: { firstName: 'John', lastName: 'Doe', employeeId: 'EMP001' },
        uploadedBy: { firstName: 'John', lastName: 'Doe' },
        createdAt: '2024-01-05T16:45:00Z',
        expiresAt: '2027-01-05T23:59:59Z'
      }
    ];

    setTimeout(() => {
      setDocuments(mockDocuments);
      setLoading(false);
    }, 1000);
  }, []);

  const documentTypes = [
    'RESUME', 'ID_CARD', 'PASSPORT', 'DRIVING_LICENSE', 'EDUCATION_CERTIFICATE',
    'EXPERIENCE_LETTER', 'SALARY_SLIP', 'BANK_STATEMENT', 'CONTRACT', 'POLICY', 'OTHER'
  ];

  const getDocumentIcon = (mimeType) => {
    if (mimeType.includes('pdf')) return <FileText className="h-5 w-5 text-red-600" />;
    if (mimeType.includes('image')) return <Image className="h-5 w-5 text-blue-600" />;
    if (mimeType.includes('zip') || mimeType.includes('rar')) return <Archive className="h-5 w-5 text-purple-600" />;
    return <File className="h-5 w-5 text-gray-600" />;
  };

  const getDocumentTypeColor = (type) => {
    const colors = {
      'RESUME': 'bg-blue-100 text-blue-800',
      'CONTRACT': 'bg-green-100 text-green-800',
      'POLICY': 'bg-purple-100 text-purple-800',
      'EDUCATION_CERTIFICATE': 'bg-yellow-100 text-yellow-800',
      'ID_CARD': 'bg-red-100 text-red-800',
      'PASSPORT': 'bg-indigo-100 text-indigo-800',
      'OTHER': 'bg-gray-100 text-gray-800'
    };
    return colors[type] || colors['OTHER'];
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.fileName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || doc.documentType === filterType;
    
    // For employees, only show their own documents and public documents
    if (hasRole(['employee'])) {
      return matchesSearch && matchesType && (
        !doc.employee || 
        doc.employee.employeeId === user?.employeeId ||
        !doc.isConfidential
      );
    }
    
    return matchesSearch && matchesType;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(doc => doc.id !== id));
    }
  };

  const UploadModal = ({ onClose, onUpload }) => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      documentType: 'OTHER',
      isConfidential: false,
      employeeId: '',
      expiresAt: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onUpload(formData);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Document</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Document Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
              <select
                value={formData.documentType}
                onChange={(e) => setFormData({...formData, documentType: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {documentTypes.map(type => (
                  <option key={type} value={type}>{type.replace('_', ' ')}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">File</label>
              <input
                type="file"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expires At</label>
              <input
                type="date"
                value={formData.expiresAt}
                onChange={(e) => setFormData({...formData, expiresAt: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isConfidential"
                checked={formData.isConfidential}
                onChange={(e) => setFormData({...formData, isConfidential: e.target.checked})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isConfidential" className="ml-2 block text-sm text-gray-900">
                Confidential Document
              </label>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Upload Document
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
          <p className="text-gray-600">
            {hasRole(['employee']) 
              ? 'Access your personal documents and company policies' 
              : 'Manage employee documents and company files'
            }
          </p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Upload className="h-4 w-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Documents</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search by title, description, or filename..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              {documentTypes.map(type => (
                <option key={type} value={type}>{type.replace('_', ' ')}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Apply Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((document) => (
          <div key={document.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getDocumentIcon(document.mimeType)}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{document.title}</h3>
                  <p className="text-sm text-gray-600 truncate">{document.fileName}</p>
                </div>
              </div>
              {document.isConfidential && (
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                  Confidential
                </span>
              )}
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDocumentTypeColor(document.documentType)}`}>
                  {document.documentType.replace('_', ' ')}
                </span>
                <span className="text-xs text-gray-500">{formatFileSize(document.fileSize)}</span>
              </div>
              
              {document.description && (
                <p className="text-sm text-gray-600 line-clamp-2">{document.description}</p>
              )}
              
              {document.employee && (
                <p className="text-xs text-gray-500">
                  Employee: {document.employee.firstName} {document.employee.lastName}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span>Uploaded by {document.uploadedBy.firstName} {document.uploadedBy.lastName}</span>
              <span>{new Date(document.createdAt).toLocaleDateString()}</span>
            </div>

            {document.expiresAt && (
              <div className="mb-4">
                <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                  Expires: {new Date(document.expiresAt).toLocaleDateString()}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <Download className="h-4 w-4" />
                </button>
              </div>
              
              {(hasRole(['admin', 'hr']) || 
                (document.employee && document.employee.employeeId === user?.employeeId)) && (
                <button
                  onClick={() => handleDelete(document.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or upload a new document</p>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onUpload={(data) => {
            const newDocument = {
              id: Date.now().toString(),
              ...data,
              fileName: 'uploaded-file.pdf', // Mock filename
              fileSize: 1024000, // Mock file size
              mimeType: 'application/pdf', // Mock mime type
              uploadedBy: { firstName: user.name.split(' ')[0], lastName: user.name.split(' ')[1] || '' },
              createdAt: new Date().toISOString()
            };
            setDocuments([newDocument, ...documents]);
          }}
        />
      )}
    </div>
  );
};

export default Documents;