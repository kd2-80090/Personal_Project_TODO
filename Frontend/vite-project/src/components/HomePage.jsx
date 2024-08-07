import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Make sure to create and import the CSS for styling

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1>Welcome to TO-DO Application</h1>
      <p>Please choose an action to proceed:</p>
      <div className="button-group">
        <button onClick={() => navigate('/login')} className="nav-button">Go to Login</button>
        <button onClick={() => navigate('/register')} className="nav-button">Go to Register</button>
      </div>
    </div>
  );
};

export default HomePage;
