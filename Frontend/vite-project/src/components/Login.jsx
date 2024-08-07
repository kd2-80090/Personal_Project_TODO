import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Auth.css';
import InputField from './InputField';
import Button from './Button';
import { login } from '../api/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response && response.id) {
        // Save userId to localStorage
        localStorage.setItem('userId', response.id);
        // Redirect to the tasks page with user ID
        navigate(`/tasks/${response.id}`);
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <InputField
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <InputField
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
