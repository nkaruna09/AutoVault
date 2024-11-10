import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Navigation after user creation
import './NewUser.css';

const NewUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Account created successfully!');
        navigate('/'); // Redirect to login after successful account creation
      } else {
        setErrorMessage(data.message || 'Registration failed.');
      }
    } catch (err) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="new-user-container">
      <h1>Create New Account</h1>
      <form onSubmit={handleSubmit} className="new-user-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default NewUser;
