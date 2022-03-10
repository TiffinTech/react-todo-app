import React, { useState, useEffect } from 'react';

import './App.css';

// components
import Header from './components/Header/Header';
import TaskList from './components/TaskList/TaskList';

// hooks
import useDataManager from './hooks/useDataManager';
import useConfigManager from './hooks/useConfigManager';

function App() {
  const { taskList } = useDataManager(); // Instantiating our data manager custom hook
  const { apiUrl } = useConfigManager();
  const [dataAPI, setData] = useState(null);

  // eslint-disable-next-line no-undef
  const fetchData = () => fetch(`${apiUrl}/activity`)
    .then((response) => response.json())
    .then(() => {
      setData([dataAPI]);
    });

  useEffect(() => {
    fetchData();
  });

  return (
    <div className="App">
      <Header />
      <TaskList taskList={taskList} />
      <h1>THIS API IS CONTROLLING MY LIFE</h1>

      {dataAPI
          && dataAPI.map(({ activity }) => (
            <div key={activity}>
              <h3>{activity}</h3>
            </div>
          ))}

    </div>
  );
}

export default App;
