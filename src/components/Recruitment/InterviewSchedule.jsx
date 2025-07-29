import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const InterviewSchedule = () => {
  const { id, applicationId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    interviewer: '',
    type: 'Technical',
    location: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [candidateName, setCandidateName] = useState('');

  useEffect(() => {
    // Simulate fetching candidate name
    const mockCandidate = {
      id: applicationId,
      name: 'John Doe'
    };
    setCandidateName(mockCandidate.name);
  }, [applicationId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.interviewer.trim()) newErrors.interviewer = 'Interviewer is required';
    if (!formData.type) newErrors.type = 'Type is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        console.log('Interview scheduled:', formData);
        setLoading(false);
        navigate(`/jobs/${id}/applications/${applicationId}`);
      }, 1000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to={`/jobs/${id}/applications/${applicationId}`} className="text-blue-600 hover:underline">
          &larr; Back to Application
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-2">Schedule Interview</h1>
      <h2 className="text-xl text-gray-600 mb-6">Candidate: {candidateName}</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="date">
              Date*
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.date ? 'border-red-500' : ''}`}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="time">
              Time*
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.time ? 'border-red-500' : ''}`}
            />
            {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="interviewer">
              Interviewer*
            </label>
            <input
              type="text"
              id="interviewer"
              name="interviewer"
              value={formData.interviewer}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.interviewer ? 'border-red-500' : ''}`}
            />
            {errors.interviewer && <p className="text-red-500 text-sm mt-1">{errors.interviewer}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="type">
              Interview Type*
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.type ? 'border-red-500' : ''}`}
            >
              <option value="Technical">Technical</option>
              <option value="Behavioral">Behavioral</option>
              <option value="Cultural Fit">Cultural Fit</option>
              <option value="Panel">Panel</option>
              <option value="HR">HR</option>
            </select>
            {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Conference Room A or Zoom"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="notes">
            Notes/Instructions
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border rounded"
            placeholder="Any special instructions for the candidate or interviewer..."
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate(`/jobs/${id}/applications/${applicationId}`)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-3 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Scheduling...' : 'Schedule Interview'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InterviewSchedule;