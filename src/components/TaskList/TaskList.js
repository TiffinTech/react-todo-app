import React from 'react';
import './styles.css';

import Task from '../Task/Task';

/**
 * 
 * @param {*} taskList The list of all current and filtered tasks 
 * @param {*} onUpdate Event handler to trigger a task item update 
 * @param {*} onClick Event handler to forward the current task as selected 
 * @returns JSX-Content for the rendered task list
 */
const TaskList = ({ taskList, selectedTask, onUpdate, onClick }) => {
    return (
        <div className="task-list">
            {taskList.map((task, idx) => {
                return <Task key={idx} task={task} selectedTask={selectedTask} onUpdate={onUpdate} onClick={onClick} />;
            })}
        </div>
    );
};

export default TaskList;
