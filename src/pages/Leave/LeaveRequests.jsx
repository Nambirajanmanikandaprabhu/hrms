import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Calendar, Plus, Filter, Clock, Check, X, Eye } from 'lucide-react';

const LeaveRequests = () => {
  const { user, hasRole } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [showApplyModal, setShowApplyModal] = useState(false);

  const leaveRequests = [
    {
      id: '1',
      employeeName: 'John Doe',
      // ... other leave data
    },
    // ... other requests
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Leave requests content */}
    </div>
  );
};

export default LeaveRequests;