import React, {useState} from 'react';
import { useEffect } from "react";

import './App.css';

// components
import Header from './components/Header/Header';
import TaskList from './components/TaskList/TaskList';

// hooks
import useDataManager from './hooks/useDataManager';

function App() {
  const {taskList} = useDataManager(); // Instantiating our data manager custom hook
  const [dataAPI, setData] = useState(null);

  const fetchData = () => {
    return fetch('https://www.boredapi.com/api/activity')
    .then((response) => response.json())
    .then((dataAPI) => {
      setData([dataAPI])
    })
  }

 useEffect(() => {
  fetchData()
 }, [])


  return (
    <div className="App">
      <Header />
      <TaskList taskList={taskList} />
      <h1>THIS API IS CONTROLLING MY LIFE</h1>

        {dataAPI &&
          dataAPI.map(({ activity }) => (
            <div key={activity}>
              <h3>{activity}</h3>
            </div>
          ))}

    </div>
  );
}

export default App;
