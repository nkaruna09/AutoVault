
//import { useState } from 'react';
import './App.css';
import LoginForm from './LoginForm'

function App() {

  return (
    <div className = 'app-container'>
      <h1>AutoVault</h1>

      <LoginForm></LoginForm>
      <p className="read-the-docs">
        Enter your email if you forgot your password?
      </p>
     </div>
  );
}

export default App;

