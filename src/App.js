import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai'

// components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator';
import FilterPanel from './components/FilterPanel/FilterPanel';
import TaskList from './components/TaskList/TaskList';
import PanelLeft from './components/PanelLeft/PanelLeft';
import PanelRight from './components/PanelRight/PanelRight';
import Modal from './components/Modal/Modal';

// hooks
import useDataManager from './hooks/useDataManager';

// Atom imports
import {
  theModalAtom,
  rightPanelVisibleAtom,
  leftPanelVisibleAtom,
  inEditModeAtom
} from "./atoms/atoms";

function App() {
  const theModalRef = useRef();
  const [inputVal, setInputVal] = useState(""); // bound to the input field
  const [isInEditMode] = useAtom(inEditModeAtom);

  // Instantiating our data manager custom hook
  const { getBoredAPIActivity, isLoading, loadingError, addTask } = useDataManager();

  // Instantiating the needed atoms
  const [leftPanelVisible] = useAtom(leftPanelVisibleAtom);
  const [rightPanelVisible] = useAtom(rightPanelVisibleAtom);
  const [, setTheModal] = useAtom(theModalAtom);

  // Initialize the atom TheModal with the ref of our Modal component
  useEffect(() => {
    setTheModal(theModalRef);
  }, [setTheModal]);

  /**
   * Click event for Tiffany's special button
   */
  const onLifeControlClicked = async () => {
    const todo = await getBoredAPIActivity();
    setInputVal(todo); // Set the boredAPI todo as input value
  };

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

  const cl = `app${leftPanelVisible ? "" : " hide-left"}${rightPanelVisible ? "" : " hide-right"}`

  return (
    <div className={cl}>
      <Header />
      <PanelLeft>
        <FilterPanel />
      </PanelLeft>
      <main>
        <div className="main-content">
          <TaskList />
        </div>

        <div className="main-input">
          <input
            type="search"
            placeholder='Add a todo...'
            onChange={evt => setInputVal(evt.target.value)}
            value={inputVal}
            disabled={isInEditMode} />

          <LoadingIndicator running={isLoading} />

          <button className="btnAdd" disabled={isInEditMode || !inputVal.trim().length} onClick={onAddTodoClicked}>Add Todo</button>
          <button className="btnLife" disabled={isInEditMode} onClick={onLifeControlClicked}>Control My Life :)</button>
        </div>
      </main>
      <PanelRight />
      <Footer />

      <Modal ref={theModalRef} />
    </div >
  );
}

export default App;
