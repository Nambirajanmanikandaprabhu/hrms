import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with API call in real implementation
  useEffect(() => {
    const mockEmployee = {
      id: id,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-123-4567',
      address: '123 Main St, City, Country',
      department: 'Engineering',
      position: 'Senior Developer',
      hireDate: '2020-05-15',
      salary: '$85,000',
      status: 'active',
      documents: [
        { name: 'Employment Contract', date: '2020-05-10' },
        { name: 'NDA Agreement', date: '2020-05-12' },
      ],
      emergencyContact: {
        name: 'Jane Doe',
        relationship: 'Spouse',
        phone: '555-987-6543'
      }
    };
    setEmployee(mockEmployee);
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return <p>Loading employee details...</p>;
  }

  if (!employee) {
    return <p>Employee not found</p>;
  }

  return (
    <div className="employee-detail-page">
      <div className="header-section">
        <h1>{employee.name}</h1>
        <div className="action-buttons">
          <Link to={`/employees/${id}/edit`} className="edit-btn">
            Edit Employee
          </Link>
          <Link to="/employees" className="back-btn">
            Back to List
          </Link>
        </div>
      </div>
      
      <div className="employee-details-container">
        <div className="personal-info-section">
          <h2>Personal Information</h2>
          <div className="info-grid">
            <div>
              <p><strong>Email:</strong> {employee.email}</p>
              <p><strong>Phone:</strong> {employee.phone}</p>
              <p><strong>Address:</strong> {employee.address}</p>
            </div>
            <div>
              <p><strong>Emergency Contact:</strong> {employee.emergencyContact.name}</p>
              <p><strong>Relationship:</strong> {employee.emergencyContact.relationship}</p>
              <p><strong>Contact Phone:</strong> {employee.emergencyContact.phone}</p>
            </div>
          </div>
        </div>
        
        <div className="job-info-section">
          <h2>Job Details</h2>
          <div className="info-grid">
            <div>
              <p><strong>Department:</strong> {employee.department}</p>
              <p><strong>Position:</strong> {employee.position}</p>
            </div>
            <div>
              <p><strong>Hire Date:</strong> {employee.hireDate}</p>
              <p><strong>Status:</strong> <span className={`status-badge ${employee.status}`}>{employee.status}</span></p>
            </div>
          </div>
        </div>
        
        <div className="salary-section">
          <h2>Salary Information</h2>
          <p><strong>Annual Salary:</strong> {employee.salary}</p>
        </div>
        
        <div className="documents-section">
          <h2>Documents</h2>
          <table>
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employee.documents.map((doc, index) => (
                <tr key={index}>
                  <td>{doc.name}</td>
                  <td>{doc.date}</td>
                  <td>
                    <button className="download-btn">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;