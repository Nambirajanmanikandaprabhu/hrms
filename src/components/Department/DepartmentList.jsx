import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API call
    const mockDepartments = [
      { id: 1, name: 'Engineering', manager: 'John Doe', employeeCount: 15 },
      { id: 2, name: 'Marketing', manager: 'Jane Smith', employeeCount: 8 },
      { id: 3, name: 'Human Resources', manager: 'Bob Johnson', employeeCount: 5 },
    ];
    setDepartments(mockDepartments);
    setIsLoading(false);
  }, []);

  const filteredDepartments = departments.filter(dept => 
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="department-list-page">
      <h1>Departments</h1>
      
      <div className="controls">
        <input
          type="text"
          placeholder="Search departments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link to="/departments/new" className="add-btn">
          Add Department
        </Link>
      </div>
      
      {isLoading ? (
        <p>Loading departments...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Manager</th>
              <th>Employees</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDepartments.map(dept => (
              <tr key={dept.id}>
                <td>{dept.name}</td>
                <td>{dept.manager}</td>
                <td>{dept.employeeCount}</td>
                <td>
                  <Link to={`/departments/${dept.id}`} className="view-btn">
                    View
                  </Link>
                  <Link to={`/departments/${dept.id}/edit`} className="edit-btn">
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

export default DepartmentList;