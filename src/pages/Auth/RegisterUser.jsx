import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { post } from '../../services/api';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['ADMIN', 'HR', 'MANAGER', 'EMPLOYEE']),
  employeeId: z.string().uuid().optional(),
});

export default function RegisterUser() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'EMPLOYEE',
    employeeId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    try {
      const { confirmPassword, ...dataToValidate } = formData;
      registerSchema.parse(dataToValidate);

      if (formData.password !== formData.confirmPassword) {
        setErrors({ confirmPassword: 'Passwords do not match' });
        return false;
      }

      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};
        if (error.errors) { // Added safety check
          error.errors.forEach(err => {
            newErrors[err.path[0]] = err.message;
          });
        }
        setErrors(newErrors);
      } else {
        console.error('Unexpected validation error:', error);
      }
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const { confirmPassword, ...apiData } = formData;
      const response = await post('/users', apiData);
      alert(`${response.data.user.email} registered successfully`);
      navigate('/users');
    } catch (error) {
      console.error('Registration error:', error);

      let errorMessage = 'An error occurred during registration';
      if (error.response) {
        if (error.response.status === 409) {
          errorMessage = 'User with this email already exists';
        } else if (error.response.status === 400 && error.response.data?.errors) {
          setErrors(error.response.data.errors);
          errorMessage = 'Please fix the form errors';
        } else {
          errorMessage = error.response.data?.message || errorMessage;
        }
      }

      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Register New User</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="user@company.com"
              required
              style={styles.input}
            />
            {errors.email && <div style={styles.error}>{errors.email}</div>}
          </div>

          {/* Password */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 8 characters"
              required
              style={styles.input}
            />
            {errors.password && <div style={styles.error}>{errors.password}</div>}
          </div>

          {/* Confirm Password */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={styles.input}
            />
            {errors.confirmPassword && <div style={styles.error}>{errors.confirmPassword}</div>}
          </div>

          {/* Role */}
          <div style={styles.formGroup}>
            <label style={styles.label}>User Role</label>
            <select 
              name="role" 
              value={formData.role} 
              onChange={handleChange}
              style={styles.select}
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="MANAGER">Manager</option>
              <option value="HR">HR</option>
              <option value="ADMIN">Admin</option>
            </select>
            {errors.role && <div style={styles.error}>{errors.role}</div>}
          </div>

          {/* Employee ID */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Employee ID (optional)</label>
            <input
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="UUID of existing employee"
              style={styles.input}
            />
            {errors.employeeId && <div style={styles.error}>{errors.employeeId}</div>}
            <div style={styles.hint}>
              Only provide this if linking to an existing employee record
            </div>
          </div>

          {/* Submit */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            style={isSubmitting ? styles.submitButtonDisabled : styles.submitButton}
          >
            {isSubmitting ? 'Registering...' : 'Register User'}
          </button>
        </form>

        <div style={styles.backLink}>
          <Link to="/users" style={styles.link}>← Back to users list</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    padding: '20px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '2rem',
    width: '100%',
    maxWidth: '500px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '1.5rem',
    color: '#2d3748',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: '#4a5568',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #e2e8f0',
    borderRadius: '4px',
    fontSize: '16px',
    transition: 'border-color 0.2s',
  },
  select: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #e2e8f0',
    borderRadius: '4px',
    fontSize: '16px',
    backgroundColor: 'white',
  },
  error: {
    color: '#e53e3e',
    fontSize: '14px',
    marginTop: '0.25rem',
  },
  hint: {
    fontSize: '12px',
    color: '#718096',
    marginTop: '0.25rem',
  },
  submitButton: {
    backgroundColor: '#4299e1',
    color: 'white',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: '0.5rem',
  },
  submitButtonDisabled: {
    backgroundColor: '#a0aec0',
    color: 'white',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'not-allowed',
    marginTop: '0.5rem',
  },
  backLink: {
    marginTop: '1.5rem',
    textAlign: 'center',
  },
  link: {
    color: '#4299e1',
    textDecoration: 'none',
    fontWeight: '500',
  },
};