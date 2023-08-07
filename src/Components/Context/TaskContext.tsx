import { Task } from "App";
import { reducer } from "../Reducer/TaskReducer";
import {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
  ReactNode,
  useRef,
} from "react";

interface TaskContext {
  taskToShow: Task[];
  setTaskToShow: (value: Task[]) => void;
  taskInputValue: string;
  setTaskInputValue: (value: string) => void;
  addTask: () => void;
  completeTask: (task: Task) => void;
  uncompleteTask: (task: Task) => void;
  deleteAllCompletedTasks: () => void;
  deleteTask: (task: Task) => void;
  filterCompletedTasks: () => void;
  showAllTasks: () => void;
  dragStart: (position: number) => void;
  dragEnter: (position: number) => void;
  drop: (e: React.DragEvent<HTMLLIElement>) => void;
}

const tasksList: Task[] = [];

const TaskContext = createContext<TaskContext>({
  taskToShow: [],
  setTaskToShow: () => {},
  taskInputValue: "",
  setTaskInputValue: () => {},
  addTask: () => {},
  completeTask: () => {},
  uncompleteTask: () => {},
  deleteAllCompletedTasks: () => {},
  deleteTask: () => {},
  filterCompletedTasks: () => {},
  showAllTasks: () => {},
  dragStart: () => {},
  dragEnter: () => {},
  drop: () => {},
});

export const TaskContextProvider = ({ children }: { children: ReactNode }) => {
  const [taskInputValue, setTaskInputValue] = useState<string>("");
  const [state, dispatch] = useReducer(reducer, { tasks: tasksList });
  const [taskToShow, setTaskToShow] = useState<Task[]>(state.tasks);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const addTask = () => {
    if (taskInputValue.trim() !== "") {
      const newTask = {
        id: Date.now(),
        title: taskInputValue,
        state: "todo",
      };
      dispatch({ type: "ADD_TASK", payload: newTask });
      setTaskInputValue("");
      console.log(state);
    }
  };

  const completeTask = (task: Task) => {
    task.state = "complete";
    dispatch({ type: "COMPLETE_TASK", payload: task });
  };

  const uncompleteTask = (task: Task) => {
    task.state = "todo";
    dispatch({ type: "UNCOMPLETE_TASK", payload: task });
  };

  const deleteAllCompletedTasks = () => {
    const completedTasks = state.tasks.filter(
      (task) => task.state === "complete"
    );
    if (completedTasks.length !== 0) {
      dispatch({ type: "DELETE_ALL_COMPLETED_TASKS", payload: completedTasks });
    }
    console.log("Aucune tâche à supprimer");
  };

  const deleteTask = (task: Task) => {
    dispatch({ type: "DELETE_TASK", payload: task });
  };

  const filterCompletedTasks = () => {
    const filteredTasks = taskToShow.filter(
      (task) => task.state === "complete"
    );
    if (filteredTasks.length !== 0) {
      setTaskToShow(filteredTasks);
    } else {
      setTaskToShow(state.tasks);
      return;
    }
  };

  const dragStart = (position: number) => {
    console.log(position);
    dragItem.current = position;
    console.log(dragItem.current);
  };

  const dragEnter = (position: number) => {
    console.log(position);
    dragOverItem.current = position;
    console.log(dragItem.current);
  };

  const drop = (
    e: React.DragEvent<HTMLLIElement>
  ) => {
    e.preventDefault();
    const copyListItems = [...taskToShow];
    console.log(copyListItems);
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const dragItemContent = copyListItems[dragItem.current];
      copyListItems.splice(dragItem.current, 1);
      copyListItems.splice(dragOverItem.current, 0, dragItemContent);
      dispatch({ type: "DROP", payload: copyListItems });
    }
    dragItem.current = null;
    dragOverItem.current = null;
    console.log(taskToShow);
  };

  const showAllTasks = () => {
    setTaskToShow(state.tasks);
  };

  useEffect(() => {
    setTaskToShow(state.tasks);
  }, [state.tasks]);

  return (
    <TaskContext.Provider
      value={{
        taskInputValue,
        setTaskInputValue,
        taskToShow,
        setTaskToShow,
        addTask,
        completeTask,
        uncompleteTask,
        deleteAllCompletedTasks,
        deleteTask,
        filterCompletedTasks,
        showAllTasks,
        dragStart,
        dragEnter,
        drop,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
