import React, { useEffect, useState } from 'react';
import CSS from './Footer.module.css';

import { useAtom } from 'jotai';
import { taskListAtom, inEditModeAtom } from "../../atoms/atoms";
import { taskIsOverdueHelper } from "../Task/Task.js"; // Should be moved somewhere else...

const Footer = () => {
    const [countAll, setCountAll] = useState(0);
    const [countOpen, setCountOpen] = useState(0);
    const [countOverdue, setCountOverdue] = useState(0);

    const [isInEditMode] = useAtom(inEditModeAtom);
    const [taskList] = useAtom(taskListAtom);

    useEffect(() => {
        if (!taskList) return;

        setCountAll(taskList.length);
        setCountOpen(taskList.filter(item => !item.finished).length);
        setCountOverdue(taskList.filter(item => {
            if (item.duedate && !item.finished) { // Finished due dates don't count
                const date = new Date(item.duedate);
                return taskIsOverdueHelper(date);
            }
            return false;
        }).length);
    }, [taskList]);

    return (
        <footer>
            STATISTICS:
            <span className={CSS.label}>All Tasks: {countAll}</span>
            <span className={CSS.label}>Open Tasks: {countOpen}</span>
            <span className={CSS.label}>Done Tasks: {countAll - countOpen}</span>
            <span className={CSS.label}>Overdue Tasks: {countOverdue}</span>
            <span className={CSS.editMode}>{isInEditMode ? "editing" : ""}</span>
        </footer >
    );
};

export default Footer;
