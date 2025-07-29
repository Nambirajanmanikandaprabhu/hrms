import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AttendanceReport = () => {
  const [reportParams, setReportParams] = useState({
    startDate: '',
    endDate: '',
    reportType: 'daily',
    department: 'all'
  });

  // Mock data - replace with API call in real implementation
  const mockReportData = [
    { name: 'Jun 1', present: 45, late: 5, absent: 2 },
    { name: 'Jun 2', present: 43, late: 7, absent: 2 },
    { name: 'Jun 3', present: 47, late: 3, absent: 2 },
    { name: 'Jun 4', present: 46, late: 4, absent: 2 },
    { name: 'Jun 5', present: 48, late: 2, absent: 2 },
  ];

  const handleParamChange = (e) => {
    const { name, value } = e.target;
    setReportParams(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateReport = () => {
    // API call to generate report would go here
    console.log('Generating report with:', reportParams);
  };

  return (
    <div className="attendance-report-page">
      <h1>Attendance Reports</h1>
      
      <div className="report-controls">
        <div className="control-group">
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={reportParams.startDate}
            onChange={handleParamChange}
          />
        </div>
        
        <div className="control-group">
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={reportParams.endDate}
            onChange={handleParamChange}
          />
        </div>
        
        <div className="control-group">
          <label>Report Type:</label>
          <select
            name="reportType"
            value={reportParams.reportType}
            onChange={handleParamChange}
          >
            <option value="daily">Daily Summary</option>
            <option value="weekly">Weekly Summary</option>
            <option value="monthly">Monthly Summary</option>
          </select>
        </div>
        
        <div className="control-group">
          <label>Department:</label>
          <select
            name="department"
            value={reportParams.department}
            onChange={handleParamChange}
          >
            <option value="all">All Departments</option>
            <option value="engineering">Engineering</option>
            <option value="marketing">Marketing</option>
            <option value="hr">Human Resources</option>
          </select>
        </div>
        
        <button 
          onClick={handleGenerateReport}
          className="generate-btn"
        >
          Generate Report
        </button>
      </div>
      
      <div className="report-results">
        <h2>Attendance Overview</h2>
        
        <div className="chart-container">
          <BarChart
            width={800}
            height={400}
            data={mockReportData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="present" fill="#4CAF50" />
            <Bar dataKey="late" fill="#FFC107" />
            <Bar dataKey="absent" fill="#F44336" />
          </BarChart>
        </div>
        
        <div className="stats-summary">
          <div className="stat-card">
            <h3>Average Attendance</h3>
            <p className="stat-value">94.5%</p>
          </div>
          <div className="stat-card">
            <h3>Total Late Arrivals</h3>
            <p className="stat-value">21</p>
          </div>
          <div className="stat-card">
            <h3>Total Absences</h3>
            <p className="stat-value">10</p>
          </div>
        </div>
        
        <div className="export-options">
          <button className="export-btn pdf">Export as PDF</button>
          <button className="export-btn excel">Export as Excel</button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;