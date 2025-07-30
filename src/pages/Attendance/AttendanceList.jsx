import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Clock, Calendar, Filter, Download, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const AttendanceList = () => {
  const { user, hasRole } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterStatus, setFilterStatus] = useState('all');

  const attendanceRecords = [
    {
      id: '1',
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      date: '2024-01-15',
      clockIn: '09:00:00',
      clockOut: '17:30:00',
      totalHours: '8.5',
      status: 'Present',
      overtime: '0.5',
      department: 'Engineering'
    },
    // ... other records
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Present': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Late': return <AlertCircle className="h-4 w-4 text-orange-600" />;
      case 'Absent': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-800';
      case 'Late': return 'bg-orange-100 text-orange-800';
      case 'Absent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRecords = attendanceRecords.filter(record => {
    if (filterStatus !== 'all' && record.status.toLowerCase() !== filterStatus) {
      return false;
    }
    return true;
  });

  if (hasRole(['employee'])) {
    return (
      <div className="space-y-6">
        {/* Employee view */}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Admin/HR/Manager view */}
    </div>
  );
};

export default AttendanceList;