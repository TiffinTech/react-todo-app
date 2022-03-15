import React from 'react';
import './styles.css';

/**
 * Renders an single task item
 * @param {*} task The component's task to render 
 * @param {*} onUpdate Event handler to call on an task update 
 * @param {*} onClick Event handler to forward the current task as selected 
 * @returns JSX-Content for an single task item
 */
const Task = ({ task, onUpdate, onClick }) => {
    const onTaskStatusChanged = () => {
        onUpdate({ ...task, finished: !task.finished })
    }

    const onItemClicked = evt => {
        if (evt.target.tagName === "INPUT") {
            return;
        }
        onClick(task);
    }

    return (
        <div className={`task${task.finished ? " done" : ""}`} onClick={onItemClicked}>
            <div className='task-content'>
                <input type="checkbox" checked={task.finished} onChange={onTaskStatusChanged} />
                <div>{task.event}</div>
            </div>

        </div>);
};

export default Task;
