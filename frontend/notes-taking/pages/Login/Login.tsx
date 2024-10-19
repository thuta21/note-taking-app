import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper.js';
import { login as loginApi } from './api';
import { useAuth } from '../../middleware/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    // Email validation
    if (!validateEmail(email)) {
      validationErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!password) {
      validationErrors.password = 'Please enter a password';
    }

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    setError({});
    setLoading(true);

    try {
      const response = await loginApi({ email, password });

      if (response.status === 200) {
        const token = response.data.token; // Get the token from the response
        const user = response.data.user; // Get user data from the response

        // Update AuthContext state and local storage
        login({ token, user });

        // Redirect to dashboard after successful login
        navigate('/dashboard');
      } else {
        setError({ api: 'Login failed. Please try again.' });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError({ api: error.response.data.message });
      } else {
        setError({ api: 'An error occurred. Please try again later.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border rounded bg-white px-7 py-10">
        <form onSubmit={handleSubmit}>
          <h4 className="text-2xl mb-7">Login</h4>

          <input
            type="text"
            placeholder="Email"
            className={`input-box ${error.email ? 'border-red-500' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          {error.email && <p className="text-red-500 text-sm">{error.email}</p>}

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          {error.password && <p className="text-red-500 text-sm">{error.password}</p>}

          {error.api && <p className="text-red-500 text-sm">{error.api}</p>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="text-sm text-center mt-4">
            Not registered yet?{' '}
            <Link to="/register" className="font-medium text-primary underline">
              Create an Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
