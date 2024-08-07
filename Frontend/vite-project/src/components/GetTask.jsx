import React, { useEffect, useState } from 'react';
import '../assets/styles/GetTask.css'; // Import the CSS

const GetTasks = ({ userId }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    if (!userId) {
      console.error('No userId provided');
      return;
    }
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

  useEffect(() => {
    fetchTasks();
  }, [userId]); // Fetch tasks whenever userId changes

  return (
    <div className="get-tasks-container">
      <div className="tasks-list">
        {tasks.map(task => (
          <div className="task-card" key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
            <p className="priority">Priority: {task.priority}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetTasks;
