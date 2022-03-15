import React, { useEffect, useState } from 'react';
import './styles.css';

const Footer = ({ taskList }) => {
    const [countAll, setCountAll] = useState(0);
    const [countOpen, setCountOpen] = useState(0);

    useEffect(() => {
        if (!taskList) return;

        setCountAll(taskList.length);
        setCountOpen(taskList.filter(item => !item.finished).length);
    }, [taskList]);

    return (
        <footer>
            STATISTICS: <span className="label">All Tasks: {countAll}</span> <span className="label">Open Tasks: {countOpen}</span>  <span className="label">Done Tasks: {countAll - countOpen}</span>
        </footer >
    );
};

export default Footer;
