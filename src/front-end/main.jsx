import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import routing components
import './index.css';
import App from './App.jsx'; // Import the App component (Login page)
import Dashboard from './Dashboard.jsx'; // Import the Dashboard component
import NewUser from './NewUser.jsx'; // Import the NewUser component (Create Account page)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>  {/* Wrap the app in Router to enable routing */}
      <Routes>
        <Route path="/" element={<App />} />  {/* Login page route */}
        <Route path="/dashboard" element={<Dashboard />} />  {/* Dashboard page route */}
        <Route path="/new-user" element={<NewUser />} />  {/* New User page route */}
      </Routes>
    </Router>
  </StrictMode>,
);
