import React from 'react';
import './styles.css';

import Task from '../Task/Task';

/**
 * 
 * @param {*} taskList The list of all current and filtered tasks 
 * @param {*} onUpdate Event handler to trigger a task item update 
 * @param {*} onDelete Event handler to trigger a task item delete 
 * @returns JSX-Content for the rendered task list
 */
const TaskList = ({ taskList, onUpdate, onDelete }) => {
    return (
        <div className="task-list">
            {taskList.map((task, idx) => {
                return <Task key={idx} task={task} onUpdate={onUpdate} onDelete={onDelete} />;
            })}
        </div>
    );
};

export default TaskList;
