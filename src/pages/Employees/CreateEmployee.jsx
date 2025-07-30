import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, User, Mail, Phone, MapPin, Building, Calendar } from 'lucide-react';

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    department: '',
    position: '',
    salary: '',
    joinDate: '',
    manager: '',
    employeeId: '',
    dateOfBirth: '',
    nationality: '',
    maritalStatus: '',
    emergencyContact: ''
  });

  const [errors, setErrors] = useState({});

  const departments = ['Engineering', 'Human Resources', 'Marketing', 'Finance', 'Sales', 'Operations'];
  const managers = ['Sarah Johnson', 'Mike Wilson', 'Emily Davis', 'Alex Brown'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    // ... other validations

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="space-y-6">
      {/* Employee form */}
    </div>
  );
};

export default CreateEmployee;