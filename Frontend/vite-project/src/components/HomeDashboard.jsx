import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetTasks from './GetTask';
import TaskForm from './TaskForm';

const HomeDashboard = () => {
  const [userId, setUserId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // Function to handle adding new tasks
  const handleTaskAdded = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  // Function to fetch tasks from the server
  const fetchTasks = async () => {
    if (!userId) return;
    try {
      const response = await fetch(`http://localhost:8080/user/tasks/${userId}`, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.error('Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Refresh tasks after adding
  const refreshTasks = () => {
    fetchTasks();
  };

  useEffect(() => {
    // Check user ID from URL or authentication
    const currentUserId = localStorage.getItem('userId'); // Assuming you store userId in localStorage
    if (currentUserId) {
      setUserId(currentUserId);
      fetchTasks();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8080/user/logout', {
        method: 'POST',
        credentials: 'include',
      });
      localStorage.removeItem('userId'); // Clear userId from localStorage
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      {userId ? (
        <div>
          <h1>Welcome to the Dashboard</h1>
          <button onClick={handleLogout}>Logout</button>
          <TaskForm onTaskAdded={handleTaskAdded} refreshTasks={refreshTasks} userId={userId} />
          <GetTasks userId={userId} tasks={tasks} /> {/* Pass tasks directly */}
        </div>
      ) : (
        <div>
          <h1>Please Log In or Register</h1>
          <button onClick={() => navigate('/login')}>Go to Login</button>
          <button onClick={() => navigate('/register')}>Go to Register</button>
        </div>
      )}
    </div>
  );
};

export default HomeDashboard;
