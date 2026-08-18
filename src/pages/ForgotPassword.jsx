import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPassword, getCurrentUser } from '../services/authApi';
import './Auth.css';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    // Clear error when user starts typing
    if (errors.email) {
      setErrors(prev => ({
        ...prev,
        email: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccess('');
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await forgotPassword(email);
      
      if (result.success) {
        setSuccess(result.message || 'Password reset token has been sent to your email');
        setEmail('');
      } else {
        setServerError(result.message || 'Failed to send reset email');
      }
    } catch (error) {
      setServerError(error.response?.data?.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Forgot Password</h2>
        
        {serverError && <div className="error-message">{serverError}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        
        <div className="auth-links">
          <p>
            Remember your password? <Link to="/login">Login here</Link>
          </p>
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

