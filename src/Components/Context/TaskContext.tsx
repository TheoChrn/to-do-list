import { Task } from "App";
import { reducer } from "../Reducer/TaskReducer";

import {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
  ReactNode,
} from "react";

interface TaskContext {
  taskToShow: Task[];
  isActive: boolean | string;
  setIsActive(value: string): void;
  setTaskToShow: (value: Task[]) => void;
  taskInputValue: string;
  setTaskInputValue: (value: string) => void;
  addTask: () => void;
  completeTask: (task: Task) => void;
  uncompleteTask: (task: Task) => void;
  deleteAllCompletedTasks: () => void;
  deleteTask: (task: Task) => void;
  filterCompletedTasks: () => void;
  filterActiveTasks: () => void;
  showAllTasks: () => void;
  moveTask: (fromIndex: number, toIndex: number) => void;
}

const tasksList: Task[] = [];

const TaskContext = createContext<TaskContext>({
  taskToShow: [],
  setTaskToShow: () => {},
  isActive: false,
  setIsActive: () => {},
  taskInputValue: "",
  setTaskInputValue: () => {},
  addTask: () => {},
  completeTask: () => {},
  uncompleteTask: () => {},
  deleteAllCompletedTasks: () => {},
  deleteTask: () => {},
  filterCompletedTasks: () => {},
  filterActiveTasks: () => {},
  showAllTasks: () => {},
  moveTask: () => {},
});

export const TaskContextProvider = ({ children }: { children: ReactNode }) => {
  const [taskInputValue, setTaskInputValue] = useState<string>("");
  const [state, dispatch] = useReducer(reducer, { tasks: tasksList });
  const [isActive, setIsActive] = useState("All");
  const [taskToShow, setTaskToShow] = useState<Task[]>(state.tasks);

  const addTask = () => {
    if (taskInputValue.trim() !== "") {
      const newTask = {
        id: Date.now(),
        title: taskInputValue,
        state: "Active",
      };
      dispatch({ type: "ADD_TASK", payload: newTask });
      setTaskInputValue("");
    }
  };

  const completeTask = (task: Task) => {
    task.state = "Completed";
    dispatch({ type: "COMPLETE_TASK", payload: task });
  };

  const uncompleteTask = (task: Task) => {
    task.state = "Active";
    dispatch({ type: "UNCOMPLETE_TASK", payload: task });
  };

  const deleteAllCompletedTasks = () => {
    const completedTasks = state.tasks.filter(
      (task) => task.state !== "Completed"
    );
    dispatch({ type: "DELETE_ALL_COMPLETED_TASKS", payload: completedTasks });
  };

  const deleteTask = (task: Task) => {
    dispatch({ type: "DELETE_TASK", payload: task });
  };

  const filterActiveTasks = () => {
    const filteredTasks = state.tasks.filter((task) => task.state === "Active");
    setTaskToShow(filteredTasks);
  };

  const filterCompletedTasks = () => {
    const filteredTasks = state.tasks.filter(
      (task) => task.state === "Completed"
    );
    setTaskToShow(filteredTasks);
    console.log(filteredTasks);

    console.log(taskToShow);
  };

  const moveTask = (fromIndex: number, toIndex: number) => {
    const updatedTasks = [...taskToShow];
    const movedTask = updatedTasks.splice(fromIndex, 1)[0];
    updatedTasks.splice(toIndex, 0, movedTask);
    setTaskToShow(updatedTasks);
  };

  const showAllTasks = () => {
    setTaskToShow(state.tasks);
  };

  useEffect(() => {
    if (isActive === "Completed") {
      setTaskToShow(state.tasks.filter((s) => s.state === "Completed"));
    } else if (isActive === "Active") {
      setTaskToShow(state.tasks.filter((s) => s.state === "Active"));
    } else {
      setTaskToShow([...state.tasks]);
    }
  }, [state.tasks]);

  return (
    <TaskContext.Provider
      value={{
        taskInputValue,
        setTaskInputValue,
        taskToShow,
        isActive,
        setIsActive,
        setTaskToShow,
        addTask,
        completeTask,
        uncompleteTask,
        deleteAllCompletedTasks,
        deleteTask,
        filterCompletedTasks,
        filterActiveTasks,
        showAllTasks,
        moveTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
