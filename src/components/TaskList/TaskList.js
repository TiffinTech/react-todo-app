import React from 'react';
import CSS from './TaskList.module.css';

import { useAtom } from 'jotai';
import Task from '../Task/Task';
import { filteredTasksAtom } from '../../atoms/atoms';

/**
 * 
 * @returns JSX-Content for the rendered task list
 */
const TaskList = () => {
    const [filteredTaskList] = useAtom(filteredTasksAtom);

    return (
        <div className={CSS.taskList}>
            {filteredTaskList.map((task, idx) => {
                return <Task key={idx} task={task} />;
            })}
        </div>
    );
};

export default TaskList;
