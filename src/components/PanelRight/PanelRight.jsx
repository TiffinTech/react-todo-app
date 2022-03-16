import { useEffect, useRef, useState } from 'react';
import './styles.css';

/**
 * This panel manages the editing of a selected task
 * @returns
 */
const PanelRight = ({ toggleRightPanel, selectedTask, onUpdate, onDelete, isOpen }) => {
    const somethingChanged = useRef(false);
    const [taskCopy, setTaskCopy] = useState(null); // Our copy to edit

    // Every time we get a new selectedTask we make a deep copy
    // of this object to edit without destroying the original
    useEffect(() => {
        setTaskCopy(JSON.parse(JSON.stringify(selectedTask)));
        somethingChanged.current = false; // Reset the changed marker
    }, [selectedTask]);

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

        !somethingChanged.current && (somethingChanged.current = true);
    };

    const onCancelClicked = () => {
        setTaskCopy(JSON.parse(JSON.stringify(selectedTask)));
        somethingChanged.current = false;
    };

    const onDeleteClicked = () => {
        onDelete(selectedTask);
    };

    let dueDateVal = '';
    if (taskCopy && taskCopy.duedate) {
        // as value for the date input field, we need the format yyyy-mm-dd
        dueDateVal = new Date(taskCopy.duedate).toISOString().slice(0, 10);
    }

    return (
        <div className="panel-right">
            <div className="container">
                <div className="close" onClick={toggleRightPanel}>
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
                        disabled={!somethingChanged.current}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => onUpdate(taskCopy)}
                        disabled={!somethingChanged.current}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PanelRight;
