import React, { useState } from 'react';
import './Signup.css';
import Logo from '../../olx-logo.png';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/config'; // Import directly
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    // Validation for all fields
    if (!username) validationErrors.username = 'Username is required';
    if (!email) validationErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) validationErrors.email = 'Email is invalid';
    if (!phone) validationErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(phone)) validationErrors.phone = 'Phone number must be 10 digits';
    if (!password) validationErrors.password = 'Password is required';
    else if (password.length < 6) validationErrors.password = 'Password must be at least 6 characters long';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: username });
      await addDoc(collection(db, 'users'), {
        uid: result.user.uid,
        username: username,
        email: email,
        phone: phone,
      });
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="name"
          />
          <br />
          {errors.username && <span className="error">{errors.username}</span>}

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
          {errors.email && <span className="error">{errors.email}</span>}

          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
          />
          <br />
          {errors.phone && <span className="error">{errors.phone}</span>}

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
          {errors.password && <span className="error">{errors.password}</span>}

          <br />
          <button>Signup</button>
        </form>
        <br />
        <button onClick={handleLoginClick}>Login</button>
      </div>
    </div>
  );
}

export default Signup;
