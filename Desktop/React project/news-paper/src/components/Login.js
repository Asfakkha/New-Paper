// src/LoginForm.jsx
import React, { useState } from 'react';
import './LoginForm.css'; // Import CSS for styling
import { useNavigate } from 'react-router-dom'; // For redirection in React Router v6

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate(); // Hook from react-router-dom for redirection

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setErrorMessage('Both fields are required.');
      return;
    }

    try {                                  
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password as JSON
      });

      const data = await response.json(); // Parse JSON response
      if (response.ok) {
        // Success: Store the JWT token in localStorage
        localStorage.setItem('token', data.data); // Store the JWT token

        // Set success message and redirect to the home page
        setSuccessMessage('Logged in successfully!');
        setErrorMessage('');
        
        setTimeout(() => {
            navigate('/');
          }, 1000);
      } else {
        // Show error message from the server response
        setErrorMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button className="btn btn-dark" type="submit">Login</button>
        </form>

        {/* Show error message if login fails */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Show success message on successful login */}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default Login;
