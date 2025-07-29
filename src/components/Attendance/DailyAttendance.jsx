import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DailyAttendance = () => {
  const [attendance, setAttendance] = useState({
    date: new Date().toISOString().split('T')[0],
    clockIn: '',
    clockOut: '',
    status: 'pending',
    notes: ''
  });
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClockIn = () => {
    setIsLoading(true);
    const now = new Date().toLocaleTimeString();
    setAttendance(prev => ({
      ...prev,
      clockIn: now,
      status: 'working'
    }));
    setIsClockedIn(true);
    setIsLoading(false);
    // API call to record clock-in would go here
  };

  const handleClockOut = () => {
    setIsLoading(true);
    const now = new Date().toLocaleTimeString();
    setAttendance(prev => ({
      ...prev,
      clockOut: now,
      status: 'completed'
    }));
    setIsClockedIn(false);
    setIsLoading(false);
    // API call to record clock-out would go here
  };

  const handleNoteChange = (e) => {
    setAttendance(prev => ({ ...prev, notes: e.target.value }));
  };

  return (
    <div className="attendance-page">
      <h1>Daily Attendance</h1>
      <div className="date-display">
        {new Date(attendance.date).toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </div>

      <div className="attendance-status">
        <div className="time-record">
          <span>Clock In:</span>
          <span className="time">{attendance.clockIn || '--:-- --'}</span>
        </div>
        <div className="time-record">
          <span>Clock Out:</span>
          <span className="time">{attendance.clockOut || '--:-- --'}</span>
        </div>
      </div>

      <div className="attendance-actions">
        {!isClockedIn ? (
          <button 
            onClick={handleClockIn} 
            disabled={isLoading}
            className="clock-in-btn"
          >
            {isLoading ? 'Processing...' : 'Clock In'}
          </button>
        ) : (
          <button 
            onClick={handleClockOut} 
            disabled={isLoading}
            className="clock-out-btn"
          >
            {isLoading ? 'Processing...' : 'Clock Out'}
          </button>
        )}
      </div>

      <div className="attendance-notes">
        <label>Notes:</label>
        <textarea
          value={attendance.notes}
          onChange={handleNoteChange}
          placeholder="Add any notes about your workday..."
        />
      </div>

      <div className="attendance-history-link">
        <button onClick={() => navigate('/attendance/history')}>
          View My Attendance History
        </button>
      </div>
    </div>
  );
};

export default DailyAttendance;