import { useTaskContext } from "./Components/Context/TaskContext";
import Button from "./Components/Button";
import TaskItem from "./Components/Task/index";

export interface Task {
  id: number;
  title: string;
  state: string;
}

const App = () => {
  const {
    taskInputValue,
    setTaskInputValue,
    taskToShow,
    addTask,
    deleteAllCompletedTasks,
    filterCompletedTasks,
    showAllTasks,
  } = useTaskContext();

  return (
    <main>
      <h1>Your Daily Tasks</h1>
      <div className="inputContainer">
        <input
          type="text"
          onChange={(e) => setTaskInputValue(e.target.value)}
          value={taskInputValue}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <Button action={addTask} label={"+"} />
      </div>
      <div className="taskContainer">
        <h2>Task List</h2>
        <ul>
          {taskToShow &&
            taskToShow.map((task, index) => (
              <TaskItem
                index={index}
                key={index}
                item={task}
                className={
                  task.state === "todo" ? "task task--todo" : "task task--done"
                }
              />
            ))}
        </ul>
      </div>
      <div className="buttonContainers">
        <Button
          action={deleteAllCompletedTasks}
          label={"Deletes completed tasks"}
        />
        <Button action={filterCompletedTasks} label={"Completed tasks"} />
        <Button action={showAllTasks} label={"All tasks"} />
      </div>
    </main>
  );
};

export default App;
