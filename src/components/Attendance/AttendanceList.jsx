import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AttendanceList = () => {
  const [attendances, setAttendances] = useState([]);
  const [filter, setFilter] = useState({
    date: '',
    employee: '',
    status: 'all'
  });
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API calls
    const mockEmployees = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
      { id: 3, name: 'Bob Johnson' }
    ];
    setEmployees(mockEmployees);

    const mockAttendances = [
      { 
        id: 1, 
        employeeId: 1, 
        employeeName: 'John Doe',
        date: '2023-06-01', 
        clockIn: '09:05 AM', 
        clockOut: '05:30 PM',
        status: 'completed',
        overtime: 0.5,
        workFromHome: false
      },
      { 
        id: 2, 
        employeeId: 2, 
        employeeName: 'Jane Smith',
        date: '2023-06-01', 
        clockIn: '08:55 AM', 
        clockOut: '--:-- --',
        status: 'working',
        overtime: 0,
        workFromHome: true
      }
    ];
    setAttendances(mockAttendances);
    setIsLoading(false);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const filteredAttendances = attendances.filter(att => {
    const matchesDate = !filter.date || att.date === filter.date;
    const matchesEmployee = !filter.employee || att.employeeName.toLowerCase().includes(filter.employee.toLowerCase());
    const matchesStatus = filter.status === 'all' || att.status === filter.status;
    return matchesDate && matchesEmployee && matchesStatus;
  });

  return (
    <div className="attendance-list-page">
      <h1>Attendance Records</h1>
      
      <div className="filters">
        <div className="filter-group">
          <label>Date:</label>
          <input 
            type="date" 
            name="date" 
            value={filter.date}
            onChange={handleFilterChange}
          />
        </div>
        
        <div className="filter-group">
          <label>Employee:</label>
          <input
            type="text"
            name="employee"
            value={filter.employee}
            onChange={handleFilterChange}
            placeholder="Search by name"
          />
        </div>
        
        <div className="filter-group">
          <label>Status:</label>
          <select 
            name="status" 
            value={filter.status}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="working">Working</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <p>Loading attendance records...</p>
      ) : (
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Employee</th>
              <th>Clock In</th>
              <th>Clock Out</th>
              <th>Status</th>
              <th>Overtime</th>
              <th>WFH</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendances.map(att => (
              <tr key={att.id}>
                <td>{att.date}</td>
                <td>{att.employeeName}</td>
                <td>{att.clockIn}</td>
                <td>{att.clockOut}</td>
                <td>
                  <span className={`status-badge ${att.status}`}>
                    {att.status}
                  </span>
                </td>
                <td>{att.overtime}h</td>
                <td>{att.workFromHome ? 'Yes' : 'No'}</td>
                <td>
                  <button 
                    onClick={() => navigate(`/attendance/${att.id}`)}
                    className="view-btn"
                  >
                    View/Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="report-link">
        <button onClick={() => navigate('/attendance/reports')}>
          Generate Attendance Reports
        </button>
      </div>
    </div>
  );
};

export default AttendanceList;