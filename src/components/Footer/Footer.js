import React, { useEffect, useState } from 'react';
import './styles.css';

const Footer = ({ taskList }) => {
    const [countAll, setCountAll] = useState(0);
    const [countOpen, setCountOpen] = useState(0);
    const [countOverdue, setCountOverdue] = useState(0);

    useEffect(() => {
        if (!taskList) return;

        const now = new Date();

        setCountAll(taskList.length);
        setCountOpen(taskList.filter(item => !item.finished).length);
        setCountOverdue(taskList.filter(item => {
            if (item.duedate && !item.finished) { // Finished due dates don't count
                const date = new Date(item.duedate);
                return date < now;
            }
            return false;
        }).length);
    }, [taskList]);

    return (
        <footer>
            STATISTICS:
            <span className="label">All Tasks: {countAll}</span>
            <span className="label">Open Tasks: {countOpen}</span>
            <span className="label">Done Tasks: {countAll - countOpen}</span>
            <span className="label">Overdue Tasks: {countOverdue}</span>
        </footer >
    );
};

export default Footer;
