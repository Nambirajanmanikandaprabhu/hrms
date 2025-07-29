import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const PositionDetail = () => {
  const { id } = useParams();
  const [position, setPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API call
    const mockPosition = {
      id: id,
      title: 'Software Engineer',
      department: 'Engineering',
      description: 'Develop and maintain software applications',
      requirements: [
        'Bachelor\'s degree in Computer Science',
        '3+ years of experience',
        'Proficiency in JavaScript and React'
      ],
      salaryRange: {
        min: 80000,
        max: 120000,
        currency: 'USD'
      },
      employees: [
        { id: 1, name: 'Alice Brown', level: 'Senior' },
        { id: 2, name: 'Charlie Green', level: 'Mid' },
      ]
    };
    setPosition(mockPosition);
    setIsLoading(false);
  }, [id]);

  if (isLoading) return <p>Loading position...</p>;
  if (!position) return <p>Position not found</p>;

  return (
    <div className="position-detail-page">
      <div className="header">
        <h1>{position.title}</h1>
        <Link to={`/positions/${id}/edit`} className="edit-btn">
          Edit Position
        </Link>
      </div>
      
      <div className="section">
        <h2>Details</h2>
        <p><strong>Department:</strong> {position.department}</p>
        <p><strong>Description:</strong> {position.description}</p>
        <p>
          <strong>Salary Range:</strong> 
          ${position.salaryRange.min.toLocaleString()} - ${position.salaryRange.max.toLocaleString()} {position.salaryRange.currency}
        </p>
      </div>
      
      <div className="section">
        <h2>Requirements</h2>
        <ul>
          {position.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>
      
      <div className="section">
        <h2>Current Employees</h2>
        {position.employees.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Level</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {position.employees.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.level}</td>
                  <td>
                    <Link to={`/employees/${emp.id}`} className="view-btn">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No employees currently in this position.</p>
        )}
      </div>
      
      <Link to="/positions" className="back-btn">
        Back to Positions
      </Link>
    </div>
  );
};

export default PositionDetail;