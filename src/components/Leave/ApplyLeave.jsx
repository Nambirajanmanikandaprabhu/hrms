import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ApplyLeave = () => {
  const navigate = useNavigate();
  const [leaveData, setLeaveData] = useState({
    leaveType: 'annual',
    startDate: '',
    endDate: '',
    reason: '',
    contactDuringLeave: '',
    documents: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filePreview, setFilePreview] = useState([]);

  const leaveTypes = [
    { value: 'annual', label: 'Annual Leave' },
    { value: 'sick', label: 'Sick Leave' },
    { value: 'maternity', label: 'Maternity Leave' },
    { value: 'paternity', label: 'Paternity Leave' },
    { value: 'unpaid', label: 'Unpaid Leave' },
    { value: 'other', label: 'Other' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFilePreview(files.map(file => ({
      name: file.name,
      size: (file.size / 1024).toFixed(2) + ' KB',
      type: file.type.split('/')[1] || file.type
    })));
    
    // Convert files to base64 for submission
    const promises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
      });
    });

    Promise.all(promises).then(base64Files => {
      setLeaveData(prev => ({
        ...prev,
        documents: base64Files
      }));
    });
  };

  const removeDocument = (index) => {
    const updatedFiles = [...filePreview];
    updatedFiles.splice(index, 1);
    setFilePreview(updatedFiles);
    
    const updatedDocs = [...leaveData.documents];
    updatedDocs.splice(index, 1);
    setLeaveData(prev => ({ ...prev, documents: updatedDocs }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // API call to submit leave request would go here
      console.log('Submitting leave request:', leaveData);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate('/leave/my-requests', {
        state: { success: 'Leave request submitted successfully!' }
      });
    } catch (error) {
      console.error('Error submitting leave request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateDays = () => {
    if (leaveData.startDate && leaveData.endDate) {
      const start = new Date(leaveData.startDate);
      const end = new Date(leaveData.endDate);
      const diffTime = Math.abs(end - start);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }
    return 0;
  };

  return (
    <div className="leave-application-container">
      <h1>Apply for Leave</h1>
      
      <form onSubmit={handleSubmit} className="leave-form">
        <div className="form-section">
          <div className="form-group">
            <label>Leave Type <span className="required">*</span></label>
            <select
              name="leaveType"
              value={leaveData.leaveType}
              onChange={handleChange}
              required
            >
              {leaveTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="date-range-group">
            <div className="form-group">
              <label>Start Date <span className="required">*</span></label>
              <input
                type="date"
                name="startDate"
                value={leaveData.startDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <div className="form-group">
              <label>End Date <span className="required">*</span></label>
              <input
                type="date"
                name="endDate"
                value={leaveData.endDate}
                onChange={handleChange}
                min={leaveData.startDate || new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <div className="days-counter">
              <span>Total Days:</span>
              <span className="days-value">{calculateDays()}</span>
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <div className="form-group">
            <label>Reason for Leave <span className="required">*</span></label>
            <textarea
              name="reason"
              value={leaveData.reason}
              onChange={handleChange}
              rows="4"
              required
              placeholder="Please provide details about your leave request"
            />
          </div>
          
          <div className="form-group">
            <label>Emergency Contact During Leave</label>
            <input
              type="text"
              name="contactDuringLeave"
              value={leaveData.contactDuringLeave}
              onChange={handleChange}
              placeholder="Phone number or email"
            />
          </div>
        </div>
        
        <div className="form-section">
          <div className="form-group">
            <label>Supporting Documents</label>
            <div className="file-upload-container">
              <label className="file-upload-label">
                <input
                  type="file"
                  onChange={handleFileChange}
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="file-input"
                />
                <span className="upload-button">Choose Files</span>
                <span className="file-upload-text">
                  {filePreview.length > 0 
                    ? `${filePreview.length} file(s) selected` 
                    : 'No files chosen'}
                </span>
              </label>
              
              {filePreview.length > 0 && (
                <div className="file-preview-container">
                  <h4>Selected Files:</h4>
                  <ul className="file-list">
                    {filePreview.map((file, index) => (
                      <li key={index} className="file-item">
                        <span className="file-name">{file.name}</span>
                        <span className="file-info">{file.type} • {file.size}</span>
                        <button
                          type="button"
                          onClick={() => removeDocument(index)}
                          className="remove-file-btn"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <p className="file-hint">
              Maximum 5 files (PDF, Word, JPG, PNG) up to 5MB each
            </p>
          </div>
        </div>
        
        <div className="form-actions">
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Leave Request'}
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate('/leave/my-requests')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyLeave;