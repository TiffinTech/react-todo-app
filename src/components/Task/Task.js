import React from 'react';
import './styles.css';

/**
 * Renders an single task item
 * @param {*} task The component's task to render 
 * @param {*} onUpdate Event handler to call on an task update 
 * @param {*} onClick Event handler to forward the current task as selected 
 * @returns JSX-Content for an single task item
 */
const Task = ({ task, selectedTask, onUpdate, onClick }) => {
    const onTaskStatusChanged = () => {
        onUpdate({ ...task, finished: !task.finished })
    }

    const onItemClicked = evt => {
        if (evt.target.tagName === "INPUT") {
            return;
        }
        onClick(task);
    }

    let dateStr = null;
    let overdue = false;

    if (task && task.duedate) {
        const date = new Date(task.duedate);
        overdue = date < new Date();
        dateStr = date.toLocaleDateString();
    }

    const classStr = `line-two${overdue ? " overdue" : ""}`;

    return (
        <div className={`task${task.finished ? " done" : ""}${selectedTask?.id === task.id ? " selected" : ""}`} onClick={onItemClicked}>
            <div className='task-content'>
                <input type="checkbox" checked={task.finished} onChange={onTaskStatusChanged} />
                <div className="text">{task.event}
                    {dateStr && <div className={classStr}>{dateStr}</div>}
                </div>

            </div>

        </div>);
};

export default Task;
