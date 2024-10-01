import React, { useState } from 'react';
import './SignupForm.css'; // Import CSS for styling
import { useNavigate } from 'react-router-dom'; // For redirection

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate(); // Hook from react-router-dom for redirection

  const handleSignup = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !email || !password) {
      setErrorMessage('All fields are required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }), // Send user details as JSON
      });

      const data = await response.json(); // Parse JSON response

      if (response.ok) {
        // Set success message and redirect to the login page
        setSuccessMessage('Signup successful! Redirecting to login...');
        setErrorMessage('');

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        // Show error message from the server response
        setErrorMessage(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
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
          <button className="btn btn-dark" type="submit">Signup</button>
        </form>

        {/* Show error message if signup fails */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Show success message on successful signup */}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default Signup;
