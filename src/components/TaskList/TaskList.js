import React from 'react';
import './styles.css';

import Task from '../Task/Task';

const TaskList = ({ taskList }) => {
    return (
        <div className="task-list">
            {taskList.map((task) => {
                return <Task task={task} />;
            })}
        </div>
    );
};

export default TaskList;
