import { useTaskContext } from "./Components/Context/TaskContext";
import Button from "./Components/Button";
import TaskItem from "./Components/Task/index";
import { useState, useRef } from "react";
import Sun from "./Components/Sun/index.jsx";
import Moon from "./Components/Moon/index.jsx";

export interface Task {
  id: number;
  title: string;
  state: string;
}

interface ButtonParams {
  label: string;
  action: () => void;
}

const App = () => {
  const {
    taskInputValue,
    setTaskInputValue,
    taskToShow,
    addTask,
    deleteAllCompletedTasks,
    filterCompletedTasks,
    filterActiveTasks,
    showAllTasks,
    setActiveState,
  } = useTaskContext();

  const [theme, setTheme] = useState<string>("Dark");
  const containerRef = useRef(null);

  const handleSetTheme = () => {
    theme === "Dark" ? setTheme("Light") : setTheme("Dark");
  };

  const buttons: ButtonParams[] = [
    { label: "All", action: showAllTasks },
    {
      label: "Active",
      action: filterActiveTasks,
    },
    {
      label: "Completed",
      action: filterCompletedTasks,
    },
  ];

  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(0);

  const handleButtonClick = (index: number) => {
    buttons[index].action();
    setActiveState(buttons[index].label);
    setActiveButtonIndex(index);
  };

  return (
    <div className={`App App--${theme}`}>
      <main>
        <header>
          <h1>TODO</h1>
          <button onClick={() => handleSetTheme()}>
            {theme === "Dark" ? <Sun /> : <Moon />}
          </button>
        </header>
        <div className="inputContainer">
          <input
            type="text"
            onChange={(e) => setTaskInputValue(e.target.value)}
            value={taskInputValue}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Create a new todo..."
          />
        </div>
        <div className="taskContainer">
          <ul ref={containerRef}>
            {taskToShow &&
              taskToShow.map((task, index) => (
                <TaskItem
                  index={index}
                  key={index}
                  item={task}
                  className={
                    task.state === "Active"
                      ? "task task--todo"
                      : "task task--done"
                  }
                />
              ))}
          </ul>
          <div className="buttons">
            <span>
              {taskToShow.length != 0
                ? `${taskToShow.length} items left`
                : "No items left"}
            </span>
            <div className="buttonContainers">
              {taskToShow &&
                buttons.map((button, index) => (
                  <Button
                    key={index}
                    className={"filterButton"}
                    isActive={activeButtonIndex === index}
                    action={() => handleButtonClick(index)}
                    label={button.label}
                  />
                ))}
            </div>
            <Button
              action={deleteAllCompletedTasks}
              label={"Clear Completed"}
            />
          </div>
        </div>

        <span className="comment">Drag and drop to reorder list</span>
      </main>
    </div>
  );
};

export default App;
