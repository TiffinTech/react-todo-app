import CSS from './Task.module.css';
import React from 'react';
import { useAtom } from 'jotai';
import { selectedTaskAtom, rightPanelVisibleAtom, inEditModeAtom, theModalAtom } from '../../atoms/atoms';
import { MODAL_STATUS } from '../Modal/Modal';
import useDataManager from '../../hooks/useDataManager';

export const taskIsOverdueHelper = (checkDate) => { // type: Date
    checkDate.setHours(1, 1, 1, 1);
    const now = new Date().setHours(1, 1, 1, 1);
    const overdue = checkDate < now;
    return overdue;
}

/**
 * Renders an single task item
 * @param {*} task The component's task to render 
 * @returns JSX-Content for an single task item
 */
const Task = ({ task }) => {
    const { updateTask } = useDataManager();

    const [selectedTask, setSelectedTask] = useAtom(selectedTaskAtom);
    const [isInEditMode] = useAtom(inEditModeAtom);
    const [theModal] = useAtom(theModalAtom);
    const [isRightPanelVisible, setRightPanelVisible] = useAtom(rightPanelVisibleAtom);

    /**
    * Updates a task, triggered by the right (edit) panel
    */
    const onTaskStatusChanged = async () => {
        const newTask = { ...task, finished: !task.finished };
        await updateTask(newTask);

        if (selectedTask.id === task.id) {
            // to update the right panel, we have to reset the selected item
            setSelectedTask(newTask);
        }
    }

    const onItemClicked = async (evt) => {
        if (evt.target.tagName === "INPUT") return; // We don't care about the input element
        if (selectedTask && (selectedTask.id === task.id) && isRightPanelVisible) return; // If we are the selected task, we just skip the click

        if (isInEditMode && (selectedTask.id !== task.id)) {
            const choice = await theModal.current.showModal({
                title: 'Cancel Editing Process',
                content: 'Do you really want to cancel editing the record?',
                textOK: 'Yes',
                textCancel: 'No',
                showCancel: true,
                showOK: true,
            });
            if (!(choice === MODAL_STATUS.OK)) return;
        }

        setSelectedTask(task);
        setRightPanelVisible(true);
    }

    let dateStr = null;
    let overdue = false;

    if (task && task.duedate) {
        const date = new Date(task.duedate);
        overdue = taskIsOverdueHelper(date);
        dateStr = date.toLocaleDateString();
    }

    const classStr = `${CSS.lineTwo} ${overdue ? CSS.overdue : ""}`;

    return (
        <div className={`${CSS.task} ${task.finished ? CSS.done : ""} ${selectedTask?.id === task.id ? CSS.selected : ""}`} onClick={onItemClicked}>
            <div className={CSS.taskContent}>
                <input type="checkbox" checked={task.finished} onChange={onTaskStatusChanged} />
                <div className={CSS.text}>{task.event}
                    {dateStr && <div className={classStr}>{dateStr}</div>}
                </div>
            </div>
        </div>);
};

export default Task;
