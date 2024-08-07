// src/components/TasksPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TaskForm from './TaskForm';
import GetTasks from './GetTasks';

const TasksPage = () => {
  const { userId } = useParams();
  const [tasks, setTasks] = useState([]);

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <h1>Your Tasks</h1>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <GetTasks userId={userId} />
    </div>
  );
};

export default TasksPage;
