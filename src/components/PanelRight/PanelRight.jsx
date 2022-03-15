import { useEffect, useRef, useState } from 'react';
import './styles.css';

/**
 * This panel manages the editing of a selected task
 * @returns
 */
const PanelRight = ({ toggleRightPanel, selectedTask, onUpdate, onDelete }) => {
    const somethingChanged = useRef(false);
    const [taskCopy, setTaskCopy] = useState(null); // Our copy to edit

    // Every time we get a new selectedTask we make a deep copy
    // of this object to edit without destroying the original
    useEffect(() => {
        setTaskCopy(JSON.parse(JSON.stringify(selectedTask)));
        somethingChanged.current = false; // Reset the changed marker
    }, [selectedTask]);

    const onContentChanged = (evt) => {
        if (!selectedTask) return; // not current item set

        !somethingChanged.current && (somethingChanged.current = true);
        setTaskCopy({ ...taskCopy, event: evt.target.value });
    };

    const onCancelClicked = () => {
        setTaskCopy(JSON.parse(JSON.stringify(selectedTask)));
        somethingChanged.current = false;
    };

    const onDeleteClicked = () => {
        onDelete(selectedTask);
    };

    return (
        <div className="panel-right">
            <div className="container">
                <div className="close" onClick={toggleRightPanel}>
                    ×
                </div>
                <div className="edit-area">
                    <label>Todo</label>
                    <textarea
                        className="ta-input"
                        value={taskCopy?.event || ''}
                        onChange={onContentChanged}
                    ></textarea>
                </div>
                <div className="button-bar">
                    <button className="del" onClick={onDeleteClicked}>
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
