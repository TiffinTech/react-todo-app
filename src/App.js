import React, { useEffect, useState } from 'react';
import './App.css';
import FilterPanel from './components/FilterPanel/FilterPanel';

// components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator';
import TaskList from './components/TaskList/TaskList';

// hooks
import useDataManager from './hooks/useDataManager';
import useConfigManager from "./hooks/useConfigManager";
import PanelLeft from './components/PanelLeft/PanelLeft';
import PanelRight from './components/PanelRight/PanelRight';

function App() {
  const { currentConfig, toggleMode, updateSelectedFilterId } = useConfigManager();
  const { taskList, getBoredAPIActivity, isLoading, loadingError, addTask, updateTask, deleteTask } = useDataManager(); // Instantiating our data manager custom hook
  const [inputVal, setInputVal] = useState(""); // bound to the input field
  const [leftPanelVisible, setLeftPanelVisible] = useState(true);
  const [rightPanelVisible, setRightPanelVisible] = useState(false);
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(1);  // Set the last known filter
  const [filteredTaskList, setFilteredTaskList] = useState([]); // The array we render
  const [selectedTask, setSelectedTask] = useState(null); // The currently selected task item

  // Called if we get a new value for our current app config
  useEffect(() => {
    if (!currentConfig) return;
    setSelectedFilterIndex(currentConfig.selectedFilterId);
  }, [currentConfig]);

  // Debug only
  useEffect(() => {
    if (!loadingError) return;
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
   * Toggles the state for the right panel
   */
  const toggleRightPanel = () => {
    const newState = !rightPanelVisible
    setRightPanelVisible(newState);
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
    updateSelectedFilterId(newFilterId);
    setSelectedTask(null);  // reset currently selected task
  }

  /**
   * Event handler for button to add a new task 
   * @returns nothing
   */
  const onAddTodoClicked = async () => {
    const todo = inputVal.trim();
    if (todo.length === 0) return;

    // id will be added automatically by the api server
    await addTask({ event: todo, finished: false });

    if (!loadingError) {
      setInputVal("");  // Adding the task worked fine, so we clear the input field
    }
  }

  /**
   * Updates a task, triggered by the right (edit) panel
   * @param {*} todo The todo object to update
   */
  const onUpdateTodoClicked = async (todo) => {
    await updateTask(todo);

    if (selectedTask.id === todo.id) {
      // to update the right panel, we have to reset the selected item
      setSelectedTask(todo);
    }
  }

  const onTaskItemClicked = (item) => {
    if (!rightPanelVisible) toggleRightPanel();
    setSelectedTask(item);
  }

  const onItemDeleted = async (task) => {
    let newSelected;
    if (filteredTaskList.length === 1) { // this was the last task in the list
      newSelected = null;
    }
    else {
      const pos = filteredTaskList.findIndex(item => item.id === task.id);
      newSelected = pos + 1 === filteredTaskList.length ? filteredTaskList[0] : filteredTaskList[pos + 1];
    }

    await deleteTask(task);

    if (!loadingError) {
      setSelectedTask(newSelected);
    }
  }

  const cl = `app${leftPanelVisible ? "" : " hide-left"}${rightPanelVisible ? "" : " hide-right"}`

  return (
    <div className={cl}>
      <Header toggleLeftPanel={toggleLeftPanel} toggleMode={toggleMode}></Header>

      <PanelLeft>
        <FilterPanel selectedIndex={selectedFilterIndex} onChange={onFilterSelectionChanged} />
      </PanelLeft>

      <main>
        <div className="main-content">
          <TaskList taskList={filteredTaskList} selectedTask={selectedTask} onUpdate={updateTask} onClick={onTaskItemClicked} />
        </div>

        <div className="main-input">
          <input type="search" placeholder='Add a todo...' onChange={evt => setInputVal(evt.target.value)} value={inputVal} />

          <LoadingIndicator running={isLoading} />

          <button className="btnAdd" onClick={onAddTodoClicked}>Add Todo</button>
          <button className="btnLife" onClick={onLifeControlClicked}>Control My Life :)</button>
        </div>
      </main>

      {rightPanelVisible && <PanelRight
        toggleRightPanel={toggleRightPanel}
        selectedTask={selectedTask}
        onUpdate={onUpdateTodoClicked}
        onDelete={onItemDeleted}
        isOpen={rightPanelVisible} />}

      <Footer taskList={taskList}></Footer>
    </div >
  );
}

export default App;
