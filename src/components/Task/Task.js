import React from 'react';
import './styles.css';

/**
 * Renders an single task item
 * @param {*} task The component's task to render 
 * @param {*} onUpdate Event handler to call on an task update 
 * @param {*} onDelete Event handler to call, if the task has to delete itself 
 * @returns JSX-Content for an single task item
 */
const Task = ({ task, onUpdate, onDelete }) => {
    const onTaskStatusChanged = () => {
        onUpdate({ ...task, finished: !task.finished })
    }

    const onTaskDeleteClicked = (evt) => {
        evt.preventDefault();
        onDelete(task);
    }

    return (
        <div className={`task${task.finished ? " done" : ""}`}>
            <div className='task-content'>
                <input type="checkbox" checked={task.finished} onChange={onTaskStatusChanged} />
                <div>{task.event}</div>
            </div>
            <button onClick={onTaskDeleteClicked}>
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
            </button>
        </div>);
};

export default Task;
