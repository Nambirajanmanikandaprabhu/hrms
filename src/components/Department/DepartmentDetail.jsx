import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const DepartmentDetail = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API call
    const mockDepartment = {
      id: id,
      name: 'Engineering',
      manager: 'John Doe',
      description: 'Responsible for product development and engineering',
      employees: [
        { id: 1, name: 'Alice Brown', position: 'Senior Developer' },
        { id: 2, name: 'Charlie Green', position: 'Frontend Developer' },
        { id: 3, name: 'David White', position: 'Backend Developer' },
      ],
      hierarchy: {
        manager: 'John Doe',
        teams: [
          { name: 'Frontend', lead: 'Charlie Green' },
          { name: 'Backend', lead: 'David White' },
          { name: 'QA', lead: 'Eve Black' }
        ]
      }
    };
    setDepartment(mockDepartment);
    setIsLoading(false);
  }, [id]);

  if (isLoading) return <p>Loading department...</p>;
  if (!department) return <p>Department not found</p>;

  return (
    <div className="department-detail-page">
      <div className="header">
        <h1>{department.name} Department</h1>
        <Link to={`/departments/${id}/edit`} className="edit-btn">
          Edit Department
        </Link>
      </div>
      
      <div className="section">
        <h2>Overview</h2>
        <p><strong>Manager:</strong> {department.manager}</p>
        <p><strong>Description:</strong> {department.description}</p>
        <p><strong>Total Employees:</strong> {department.employees.length}</p>
      </div>
      
      <div className="section">
        <h2>Employees</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {department.employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.position}</td>
                <td>
                  <Link to={`/employees/${emp.id}`} className="view-btn">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="section">
        <h2>Organizational Hierarchy</h2>
        <div className="hierarchy">
          <div className="level">
            <div className="node manager">{department.hierarchy.manager}</div>
          </div>
          <div className="level teams">
            {department.hierarchy.teams.map(team => (
              <div key={team.name} className="team">
                <div className="node lead">{team.lead}</div>
                <div className="team-name">{team.name} Team</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Link to="/departments" className="back-btn">
        Back to Departments
      </Link>
    </div>
  );
};

export default DepartmentDetail;