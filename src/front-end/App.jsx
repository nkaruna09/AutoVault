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


// import { useState } from 'react';
// import './App.css';

// function App() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Email:', email);
//     console.log('Password:', password);
//   };

//   return (
//     <div className="app-container">
//       <h1>AutoVault</h1>
//       <div className="login-container">
//         <div className="login-box">
//           <h2>Login</h2>
//           <form onSubmit={handleSubmit}>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <input type="submit" value="Login" />
//           </form>
//           <a href="#" className="forgot-password">
//             Forgot your password?
//           </a>
//         </div>
//       </div>
//       <p className="read-the-docs">
//         Enter your email if you forgot your password?
//       </p>
//     </div>
//   );
// }

// export default App;
