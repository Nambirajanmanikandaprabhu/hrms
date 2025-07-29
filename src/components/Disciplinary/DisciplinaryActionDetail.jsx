import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const DisciplinaryActionDetail = () => {
  const { id } = useParams();
  const [action, setAction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState('');
  const [actionNotes, setActionNotes] = useState([]);

  useEffect(() => {
    // Simulate API calls
    const fetchData = async () => {
      try {
        // Fetch action details
        const mockAction = {
          id: 1,
          employeeName: 'John Smith',
          employeeId: 'EMP-1001',
          position: 'Sales Associate',
          department: 'Sales',
          type: 'Written Warning',
          date: '2023-05-10',
          status: 'Active',
          severity: 'Medium',
          reason: 'Repeated tardiness and unexcused absences',
          description: 'Employee has been late to work 5 times in the past month without proper notification or excuse. This follows a verbal warning given on 2023-04-15.',
          consequences: 'This written warning will be placed in the employee file. Further violations may result in suspension or termination.',
          resolution: '',
          documents: ['warning_letter.pdf', 'attendance_record.pdf']
        };
        setAction(mockAction);
        
        // Fetch action notes
        const mockNotes = [
          { id: 1, author: 'HR Manager', date: '2023-05-10', content: 'Initial warning issued to employee. Employee acknowledged receipt.' },
          { id: 2, author: 'Department Head', date: '2023-05-12', content: 'Follow-up meeting scheduled for 2023-05-20 to assess improvement.' },
        ];
        setActionNotes(mockNotes);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddNote = () => {
    if (notes.trim()) {
      const newNote = {
        id: actionNotes.length + 1,
        author: 'Current User', // In real app, this would be the logged in user
        date: new Date().toISOString().split('T')[0],
        content: notes
      };
      setActionNotes(prev => [...prev, newNote]);
      setNotes('');
    }
  };

  const updateStatus = (newStatus) => {
    setAction(prev => ({
      ...prev,
      status: newStatus
    }));
    // In real app, this would be an API call
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-red-100 text-red-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Appealed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading disciplinary action details...</div>;
  }

  if (!action) {
    return <div className="container mx-auto px-4 py-8 text-center">Disciplinary action not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/disciplinary/actions" className="text-blue-600 hover:underline">
          &larr; Back to Disciplinary Actions
        </Link>
      </div>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">{action.type}</h1>
          <h2 className="text-xl text-gray-600 mb-1">{action.employeeName} • {action.position}</h2>
          <p className="text-gray-600">{action.department} • Employee ID: {action.employeeId}</p>
        </div>
        <div className="flex space-x-3">
          <Link
            to={`/disciplinary/actions/${action.id}/edit`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit Action
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(action.severity)}`}>
            Severity: {action.severity}
          </span>
        </div>
        <div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(action.status)}`}>
            Status: {action.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3">Action Details</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700">Date Issued</h3>
              <p>{action.date}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Reason</h3>
              <p>{action.reason}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Description</h3>
              <p className="whitespace-pre-line">{action.description}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3">Consequences & Resolution</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700">Consequences</h3>
              <p className="whitespace-pre-line">{action.consequences}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Resolution</h3>
              {action.resolution ? (
                <p className="whitespace-pre-line">{action.resolution}</p>
              ) : (
                <p className="text-gray-500">No resolution recorded yet</p>
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Attached Documents</h3>
              {action.documents.length > 0 ? (
                <ul className="list-disc pl-5">
                  {action.documents.map((doc, index) => (
                    <li key={index}>
                      <a href={`/documents/${doc}`} className="text-blue-600 hover:underline">
                        {doc}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No documents attached</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">Update Status</h2>
        <div className="flex flex-wrap gap-2">
          {['Active', 'Resolved', 'Appealed'].map(status => (
            <button
              key={status}
              onClick={() => updateStatus(status)}
              className={`px-3 py-1 rounded-full text-sm ${
                action.status === status 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Mark as {status}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">Add Note</h2>
        <div className="flex">
          <textarea
            placeholder="Add a note about this disciplinary action..."
            className="flex-1 p-2 border rounded-l"
            rows="3"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <button
            onClick={handleAddNote}
            className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-3">Action Notes</h2>
        {actionNotes.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No notes yet</div>
        ) : (
          <div className="space-y-4">
            {actionNotes.map(note => (
              <div key={note.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-medium">{note.author}</p>
                  <p className="text-sm text-gray-500">{note.date}</p>
                </div>
                <p className="text-gray-700 whitespace-pre-line">{note.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DisciplinaryActionDetail;