// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import HomeDashboard from './components/HomeDashboard';
import './App.css'; 
import HomePage from './components/HomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks/:userId" element={<HomeDashboard />} />
        {/* Remove or correct routes for GetTasks and TaskForm if they are not used */}
      </Routes>
    </Router>
  );
};

export default App;
