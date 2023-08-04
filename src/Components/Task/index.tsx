import { useTaskContext } from "../../Components/Context/TaskContext";
import { Task } from "../../App";
import Button from "../Button/index";

type Item = {
  item: Task;
  className: string;
  index: number;
};

const TaskItem = ({ item, className, index }: Item) => {
  const {
    completeTask,
    uncompleteTask,
    deleteTask,
    dragEnter,
    dragStart,
    drop,
  } = useTaskContext();

  return (
    <li
      className={className}
      onDragStart={() => dragStart(index)}
      onDragEnter={() => dragEnter(index)}
      onDragEnd={drop}
      draggable
    >
      {item !== undefined && item.state === "todo" ? (
        <>
          <Button
            action={() => completeTask(item)}
            task={item}
            className="completeBtn"
          />
          <span>{item.title}</span>
        </>
      ) : (
        <>
          <Button
            action={() => uncompleteTask(item)}
            task={item}
            className="unCompleteBtn"
          />
          <span>{item.title}</span>
          <Button
            action={() => deleteTask(item)}
            task={item}
            className="deleteBtn"
          />
        </>
      )}
    </li>
  );
};

export default TaskItem;
