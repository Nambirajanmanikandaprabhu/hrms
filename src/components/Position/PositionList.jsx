import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PositionList = () => {
  const [positions, setPositions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API call
    const mockPositions = [
      { id: 1, title: 'Software Engineer', department: 'Engineering', minSalary: 80000, maxSalary: 120000 },
      { id: 2, title: 'Marketing Specialist', department: 'Marketing', minSalary: 60000, maxSalary: 90000 },
      { id: 3, title: 'HR Manager', department: 'Human Resources', minSalary: 70000, maxSalary: 110000 },
    ];
    setPositions(mockPositions);
    setIsLoading(false);
  }, []);

  const filteredPositions = positions.filter(pos => 
    pos.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pos.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="position-list-page">
      <h1>Positions</h1>
      
      <div className="controls">
        <input
          type="text"
          placeholder="Search positions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link to="/positions/new" className="add-btn">
          Add Position
        </Link>
      </div>
      
      {isLoading ? (
        <p>Loading positions...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Department</th>
              <th>Salary Range</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPositions.map(pos => (
              <tr key={pos.id}>
                <td>{pos.title}</td>
                <td>{pos.department}</td>
                <td>${pos.minSalary.toLocaleString()} - ${pos.maxSalary.toLocaleString()}</td>
                <td>
                  <Link to={`/positions/${pos.id}`} className="view-btn">
                    View
                  </Link>
                  <Link to={`/positions/${pos.id}/edit`} className="edit-btn">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PositionList;