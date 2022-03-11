import React, { useEffect, useState } from 'react';
import './App.css';
import FilterPanel from './components/FilterPanel/FilterPanel';

// components
import Header from './components/Header/Header';
import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator';
import TaskList from './components/TaskList/TaskList';

// hooks
import useDataManager from './hooks/useDataManager';
import useConfigManager from "./hooks/useConfigManager";

function App() {
  const { currentConfig, updateSelectedFilterId } = useConfigManager();
  const { taskList, getBoredAPIActivity, isLoading, loadingError, addTask, updateTask, deleteTask } = useDataManager(); // Instantiating our data manager custom hook
  const [inputVal, setInputVal] = useState(""); // bound to the input field
  const [leftPanelVisible, setLeftPanelVisible] = useState(true);
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(1);  // Set the last known filter
  const [filteredTaskList, setFilteredTaskList] = useState([]); // The array we render

  // Called if we get a new value for our current app config
  useEffect(() => {
    if (!currentConfig) return;

    setSelectedFilterIndex(currentConfig.selectedFilterId);
  }, [currentConfig]);

  // Debug only
  useEffect(() => {
    if (!loadingError) return;
    console.log(":: got an error from api:", loadingError);
  }, [loadingError]);

  // Called every time the state of our task list changes or
  // we selected a new filter from the left menu bar 
  useEffect(() => {
    switch (selectedFilterIndex) {
      case 1: { // Only not finished todos
        const filtered = taskList.filter(item => !item.finished);
        setFilteredTaskList(filtered);
        break;
      }
      case 2: { // Finished todos only
        const filtered = taskList.filter(item => item.finished);
        setFilteredTaskList(filtered);
        break;
      }
      default: { // All tasks
        setFilteredTaskList([...taskList]);
        break;
      }
    }
  }, [taskList, selectedFilterIndex]);

  /**
   * Toggles the state for the left menu aka filter pane
   */
  const toggleLeftPanel = () => {
    const newState = !leftPanelVisible
    setLeftPanelVisible(newState);
  }

  /**
   * Click event for Tiffany's special button
   */
  const onLifeControlClicked = async () => {
    const todo = await getBoredAPIActivity();
    setInputVal(todo);
  };

  /**
   * Event handler for the filter panel items to use on selection changes
   * @param {*} newFilterId index of the selected filter item
   */
  const onFilterSelectionChanged = (newFilterId) => {
    // setSelectedFilterIndex(newFilterId);
    updateSelectedFilterId(newFilterId);
  }

  /**
   * Event handler for button to add a new task 
   * @returns nothing
   */
  const onSaveClicked = async () => {
    const todo = inputVal.trim();
    if (todo.length === 0) return;

    // id will be added automatically by the api server
    await addTask({ event: todo, finished: false });

    if (!loadingError) {
      setInputVal("");  // Adding the task worked fine, so we clear the input field
    }
  }

  return (
    <div className="app">
      <div className='header-area'><Header toggleLeftPanel={toggleLeftPanel} /></div>
      <div className="content-area">
        <div className={`leftPanel${leftPanelVisible ? "" : " hidden"}`}>
          <div>
            <FilterPanel selectedIndex={selectedFilterIndex} onChange={onFilterSelectionChanged} />
          </div>
        </div>
        <div className="contentPanel">
          <div className="contentpanel-content">
            <TaskList taskList={filteredTaskList} onUpdate={updateTask} onDelete={deleteTask} />
          </div>

          <div className="contentpanel-inputArea">
            <input type="search" placeholder='Add a todo...' onChange={evt => setInputVal(evt.target.value)} value={inputVal} />

            <LoadingIndicator running={isLoading} />

            <button className="btnAdd" onClick={onSaveClicked}>Add Todo</button>
            <button className="btnLife" onClick={onLifeControlClicked}>Control My Life :)</button>
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;
