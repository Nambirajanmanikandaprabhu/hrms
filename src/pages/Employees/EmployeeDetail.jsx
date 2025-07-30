import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Mail, Phone, MapPin, Calendar, Building, User, FileText, Clock } from 'lucide-react';

const EmployeeDetail = () => {
  const { id } = useParams();

  const employee = {
    id: '1',
    name: 'John Doe',
    // ... other employee data
  };

  return (
    <div className="space-y-6">
      {/* Employee detail content */}
    </div>
  );
};

export default EmployeeDetail;