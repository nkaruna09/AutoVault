// LoginForm.jsx
import { useState } from 'react';



function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/register', { // Adjust URL if needed for production
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // If login is successful, redirect to the dashboard
      window.location.href = data.redirectTo; // Redirect to /dashboard
    } else {
      // Show error message if login fails
      setErrorMessage(data.message || 'Something went wrong!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <input type="submit" value="Login" />
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <a href="#" className="forgot-password">
          Forgot your password?
        </a>
      </div>
    </div>
  );
}

export default Register;
