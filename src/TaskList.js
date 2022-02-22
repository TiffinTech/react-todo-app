import React from "react";
import Task from './Task';


const TaskList = ({taskList}) => {
    return (
        <div>
            {taskList.map(task => {
                return (
                    <Task task={task}/>
                )
            })}
        </div>
    );
};

export default TaskList; 