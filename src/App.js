import './App.css';

// components
import Header from './components/Header/Header';
import TaskList from './components/TaskList/TaskList';
import Activity from './components/Activity/Activity';

// hooks
import useDataManager from './hooks/useDataManager';

function App() {
  const {taskList} = useDataManager(); // Instantiating our data manager custom hook

  return (
    <div className="App">
      <Header />
      <TaskList taskList={taskList} />
      <Activity />
    </div>
  );
}

export default App;