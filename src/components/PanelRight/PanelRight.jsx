import './styles.css';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import useDataManager from '../../hooks/useDataManager';
import { MODAL_STATUS } from '../Modal/Modal';
import {
    theModalAtom,
    selectedTaskAtom,
    rightPanelVisibleAtom,
    inEditModeAtom,
} from '../../atoms/atoms';

/**
 * This panel manages the editing of a selected task
 * @returns
 */
const PanelRight = () => {
    const { updateTask, deleteTask, loadingError } = useDataManager();
    const [taskCopy, setTaskCopy] = useState(null); // Our copy to edit

    const [isInEditMode, setIsInEditmode] = useAtom(inEditModeAtom);
    const [selectedTask, setSelectedTask] = useAtom(selectedTaskAtom);
    const [, setRightPanelVisible] = useAtom(rightPanelVisibleAtom);
    const [theModal] = useAtom(theModalAtom);

    // Every time we get a new selectedTask we make a deep copy
    // of this object to edit without destroying the original
    useEffect(() => {
        setTaskCopy(JSON.parse(JSON.stringify(selectedTask)));
        setIsInEditmode(false); // Reset the changed marker
    }, [selectedTask, setIsInEditmode]);

    const onContentChanged = (evt, field) => {
        if (!selectedTask) return; // not current item set

        switch (field) {
            case 'duedate': {
                if (evt.target.value.length > 0) {
                    const date = new Date(evt.target.value);
                    setTaskCopy({ ...taskCopy, duedate: date.toISOString() });
                } else {
                    setTaskCopy({ ...taskCopy, duedate: null });
                }
                break;
            }
            case 'event': {
                setTaskCopy({ ...taskCopy, event: evt.target.value });
                break;
            }
            default: {
            }
        }

        // If we just started editing, we set the edit marker
        !isInEditMode && setIsInEditmode(true);
    };

    /**
     * Updates a task, triggered by the right (edit) panel
     * @param {*} todo The todo object to update
     */
    const onSaveClicked = async () => {
        await updateTask(taskCopy);

        if (selectedTask.id === taskCopy.id) {
            // to update the right panel, we have to reset the selected item
            setSelectedTask(taskCopy);
        }
    };

    const onCancelClicked = async () => {
        const choice = await theModal.current.showModal({
            title: 'Cancel Editing Process',
            content: 'Do you really want to cancel editing the record?',
            textOK: 'Yes',
            textCancel: 'No',
            showCancel: true,
            showOK: true,
        });
        if (choice === MODAL_STATUS.OK) {
            setTaskCopy(JSON.parse(JSON.stringify(selectedTask)));
            setIsInEditmode(false);
        }
    };

    const onDeleteClicked = async () => {
        const choice = await theModal.current.showModal({
            title: 'Delete Current Entry',
            content: 'Do you really want to delete the current record?',
            textOK: 'Yes',
            textCancel: 'No',
            showCancel: true,
            showOK: true,
        });
        if (!(choice === MODAL_STATUS.OK)) return;

        // I'm not sure, auto-selecting the next task after deleting makes sense...
        // let newSelected;
        // if (filteredTaskList.length === 1) {
        //     // this was the last task in the list
        //     newSelected = null;
        // } else {
        //     const pos = filteredTaskList.findIndex((item) => item.id === selectedTask.id);
        //     newSelected =
        //         pos + 1 === filteredTaskList.length
        //             ? filteredTaskList[0]
        //             : filteredTaskList[pos + 1];
        // }

        await deleteTask(selectedTask);

        if (!loadingError) {
            setSelectedTask(null); // Clear the current selection
            // setSelectedTask(newSelected);
        }
    };

    let dueDateVal = '';
    if (taskCopy && taskCopy.duedate) {
        // as value for the date input field, we need the format yyyy-mm-dd
        dueDateVal = new Date(taskCopy.duedate).toISOString().slice(0, 10);
    }

    return (
        <div className="panel-right">
            <div className="container">
                <div className="close" onClick={() => setRightPanelVisible(false)}>
                    ×
                </div>
                <div className="edit-area">
                    <div className="field">
                        <label>Todo</label>
                        <textarea
                            className="ta-input"
                            value={taskCopy?.event || ''}
                            disabled={!selectedTask}
                            onChange={(evt) => onContentChanged(evt, 'event')}
                        ></textarea>
                    </div>
                    <div className="field">
                        <label>Due Date</label>
                        <input
                            type="date"
                            value={dueDateVal}
                            disabled={!selectedTask}
                            onChange={(evt) => onContentChanged(evt, 'duedate')}
                        />
                    </div>
                </div>
                <div className="button-bar">
                    <button className="del" disabled={!selectedTask} onClick={onDeleteClicked}>
                        Delete
                    </button>
                    <button
                        className="cancel"
                        onClick={onCancelClicked}
                        disabled={!isInEditMode}
                    >
                        Cancel
                    </button>

                    <button onClick={onSaveClicked} disabled={!isInEditMode}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PanelRight;
