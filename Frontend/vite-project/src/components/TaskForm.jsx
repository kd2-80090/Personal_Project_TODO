import React, { useState } from 'react';
import '../assets/styles/TaskForm.css';

const TaskForm = ({ onTaskAdded, refreshTasks, userId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [priority, setPriority] = useState('low'); // Example priority

  const handleSubmit = async (event) => {
    event.preventDefault();

    const task = {
      id: new Date().getTime(), // Generate a unique ID
      title,
      description,
      completed,
      priority,
      userId, // Ensure userId is included
    };

    try {
      const response = await fetch('http://localhost:8080/tasks/addTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        const newTask = await response.json();
        onTaskAdded(newTask);
        if (refreshTasks) {
          refreshTasks(); // Call refreshTasks to re-fetch tasks
        }
        // Optionally clear the form fields
        setTitle('');
        setDescription('');
        setCompleted(false);
        setPriority('low');
      } else {
        console.error('Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="task-form-container">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="completed">Completed:</label>
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
