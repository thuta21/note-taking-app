import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper.js';
import { register } from './api.js';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    // Name validation
    if (!name) {
      validationErrors.name = 'Please enter your name';
    }

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

    try {
      const response = await register({ name, email, password });

      if (response.status === 200) {
        navigate('/login');  // Redirect to login after successful registration
      }
    } catch (error) {
      setError({ api: error.response.data.message });
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSubmit}>
            <h4 className="text-2xl mb-7">Register</h4>

            <input
              type="text"
              placeholder="Name"
              className={`input-box ${error.name ? 'border-red-500' : ''}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error.name && <p className="text-red-500 text-sm">{error.name}</p>}

            <input
              type="text"
              placeholder="Email"
              className={`input-box ${error.email ? 'border-red-500' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && <p className="text-red-500 text-sm">{error.email}</p>}

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error.password && <p className="text-red-500 text-sm">{error.password}</p>}

            {error.api && <p className="text-red-500 text-sm">{error.api}</p>}

            <button type="submit" className="btn-primary">
              Register
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary underline">
                Login Here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
