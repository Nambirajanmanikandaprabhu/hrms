import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AttendanceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Mock data - replace with API call
    const mockAttendance = {
      id: id,
      employeeId: 1,
      employeeName: 'John Doe',
      date: '2023-06-01',
      clockIn: '09:05 AM',
      clockOut: '05:30 PM',
      status: 'completed',
      overtime: 0.5,
      workFromHome: false,
      notes: 'Had a meeting with client at 2PM'
    };
    setAttendance(mockAttendance);
    setIsLoading(false);
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAttendance(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    // API call to save changes would go here
    setIsEditing(false);
  };

  if (isLoading) return <p>Loading attendance record...</p>;
  if (!attendance) return <p>Attendance record not found</p>;

  return (
    <div className="attendance-detail-page">
      <div className="header">
        <h1>Attendance Record</h1>
        <div className="actions">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="save-btn">
                Save Changes
              </button>
              <button 
                onClick={() => setIsEditing(false)} 
                className="cancel-btn"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setIsEditing(true)} 
                className="edit-btn"
              >
                Edit Record
              </button>
              <button 
                onClick={() => navigate('/attendance/list')} 
                className="back-btn"
              >
                Back to List
              </button>
            </>
          )}
        </div>
      </div>

      <div className="attendance-info">
        <div className="info-row">
          <span className="label">Employee:</span>
          <span className="value">{attendance.employeeName}</span>
        </div>
        
        <div className="info-row">
          <span className="label">Date:</span>
          {isEditing ? (
            <input
              type="date"
              name="date"
              value={attendance.date}
              onChange={handleChange}
            />
          ) : (
            <span className="value">{attendance.date}</span>
          )}
        </div>
        
        <div className="time-section">
          <div className="time-row">
            <span className="label">Clock In:</span>
            {isEditing ? (
              <input
                type="time"
                name="clockIn"
                value={attendance.clockIn}
                onChange={handleChange}
              />
            ) : (
              <span className="value">{attendance.clockIn}</span>
            )}
          </div>
          
          <div className="time-row">
            <span className="label">Clock Out:</span>
            {isEditing ? (
              <input
                type="time"
                name="clockOut"
                value={attendance.clockOut}
                onChange={handleChange}
              />
            ) : (
              <span className="value">{attendance.clockOut}</span>
            )}
          </div>
        </div>
        
        <div className="status-section">
          <div className="status-row">
            <span className="label">Status:</span>
            {isEditing ? (
              <select
                name="status"
                value={attendance.status}
                onChange={handleChange}
              >
                <option value="pending">Pending</option>
                <option value="working">Working</option>
                <option value="completed">Completed</option>
              </select>
            ) : (
              <span className={`status-value ${attendance.status}`}>
                {attendance.status}
              </span>
            )}
          </div>
          
          <div className="overtime-row">
            <span className="label">Overtime (hours):</span>
            {isEditing ? (
              <input
                type="number"
                step="0.5"
                min="0"
                name="overtime"
                value={attendance.overtime}
                onChange={handleChange}
              />
            ) : (
              <span className="value">{attendance.overtime}</span>
            )}
          </div>
          
          <div className="wfh-row">
            <span className="label">Work From Home:</span>
            {isEditing ? (
              <input
                type="checkbox"
                name="workFromHome"
                checked={attendance.workFromHome}
                onChange={handleChange}
              />
            ) : (
              <span className="value">
                {attendance.workFromHome ? 'Yes' : 'No'}
              </span>
            )}
          </div>
        </div>
        
        <div className="notes-section">
          <span className="label">Notes:</span>
          {isEditing ? (
            <textarea
              name="notes"
              value={attendance.notes}
              onChange={handleChange}
              rows="3"
            />
          ) : (
            <p className="notes-value">
              {attendance.notes || 'No notes available'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceDetail;