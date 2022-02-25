import React, { useState } from 'react';

import './App.css';
import data from './data.json';

//components
import Header from './components/Header/Header';
import TaskList from './components/TaskList/TaskList';

function App() {
    const [taskList, setTaskList] = useState(data);

    return (
        <div className="App">
            <Header />
            <TaskList taskList={taskList} />
        </div>
    );
}

export default App;
