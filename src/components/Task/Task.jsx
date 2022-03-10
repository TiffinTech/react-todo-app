import React from 'react';
import './styles.css';

function Task({ task }) {
  return <div className="task">{task.event}</div>;
}

export default Task;
