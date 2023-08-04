import { Task } from "App";

type State = {
  tasks: Task[];
};

type Action = {
  payload: Task | Task[];
  type: string;
};

export const reducer = (state: State, action: Action) => {
  let tasksToDelete: number[] = [];
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          ...(Array.isArray(action.payload)
            ? action.payload
            : [action.payload]),
        ],
      };
    case "COMPLETE_TASK":
      return {
        ...state,
      };
    case "UNCOMPLETE_TASK":
      return {
        ...state,
      };
    case "DELETE_TASK":
      tasksToDelete = Array.isArray(action.payload)
        ? action.payload.map((task) => task.id)
        : [action.payload.id];

      return {
        ...state,
        tasks: state.tasks.filter((task) => !tasksToDelete.includes(task.id)),
      };
    case "DELETE_ALL_COMPLETED_TASKS":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.state !== "complete"),
      };
    case "DROP":
      return {
        ...state,
        tasks: Array.isArray(action.payload) ? action.payload : state.tasks,
      };
    default:
      return state;
  }
};
