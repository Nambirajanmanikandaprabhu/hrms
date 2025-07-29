import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TrainingProgramsList = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    // Simulate API call
    const fetchPrograms = async () => {
      try {
        const mockData = [
          { id: 1, name: 'New Hire Orientation', category: 'Onboarding', duration: '2 days', status: 'Active', participants: 24 },
          { id: 2, name: 'Leadership Development', category: 'Management', duration: '6 weeks', status: 'Active', participants: 12 },
          { id: 3, name: 'Diversity & Inclusion', category: 'HR', duration: '1 day', status: 'Archived', participants: 45 },
          { id: 4, name: 'Technical Skills Upgrade', category: 'IT', duration: '4 weeks', status: 'Active', participants: 18 },
        ];
        setPrograms(mockData);
      } catch (error) {
        console.error('Error fetching training programs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const filteredPrograms = programs.filter(program => {
    const matchesStatus = statusFilter === 'All' || program.status === statusFilter;
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         program.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Training Programs</h1>
        <Link
          to="/training/programs/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Create New Program
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <input
            type="text"
            placeholder="Search programs..."
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Filter by status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Archived">Archived</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading training programs...</div>
      ) : filteredPrograms.length === 0 ? (
        <div className="text-center py-8">No programs found matching your criteria</div>
      ) : (
        <div className="grid gap-4">
          {filteredPrograms.map((program) => (
            <div key={program.id} className="border rounded p-4 hover:shadow-md transition">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">
                    <Link to={`/training/programs/${program.id}`} className="text-blue-600 hover:underline">
                      {program.name}
                    </Link>
                  </h2>
                  <p className="text-gray-600">{program.category} • {program.duration}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    program.status === 'Active' ? 'bg-green-100 text-green-800' :
                    program.status === 'Archived' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {program.status}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    {program.participants} participant{program.participants !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <Link
                  to={`/training/programs/${program.id}/enrollments`}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                >
                  View Enrollments
                </Link>
                <Link
                  to={`/training/programs/${program.id}/edit`}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainingProgramsList;