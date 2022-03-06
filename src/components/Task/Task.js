import React from 'react';
import './styles.css';

const Task = ({ task }) => {
    return <div className="task">{task.event}</div>;
};

export default Task;
