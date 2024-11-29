// components/Login.js
import React, { useState, useContext } from 'react';
import FirebaseContext from '../../store/FirebaseContext'; // Adjust the path as needed
import { AuthContext } from '../../store/AuthContext'; // Adjust the path as needed
import Logo from '../../olx-logo.png';
import './Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { auth } = useContext(FirebaseContext);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset error states
    setEmailError('');
    setPasswordError('');

    let isValid = true;

    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    // Validate password
    if (!password.trim()) {
      setPasswordError('Password is required.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false;
    }

    // If validation fails, stop submission
    if (!isValid) return;

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error.message);
      setPasswordError('Invalid email or password.');
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          <br />
          {emailError && <span className="error">{emailError}</span>}
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
          <br />
          {passwordError && <span className="error">{passwordError}</span>}
          <br />
          <button type="submit">Login</button>
        </form>
        <br />
        <button onClick={handleSignupClick}>Signup</button>
      </div>
    </div>
  );
}

export default Login;
