import { useTaskContext } from "../../Components/Context/TaskContext";
import { Task } from "../../App";
import Button from "../Button/index";
import { useDrag, useDrop } from "react-dnd/dist/hooks";
import CheckMark from "../CheckMark";
import Cross from "../Cross/index.jsx";

type Item = {
  item: Task;
  className: string;
  index: number;
};

type draggedItem = {
  index: number;
};

const TaskItem = ({ item, className, index }: Item) => {
  const { completeTask, uncompleteTask, deleteTask, moveTask } =
    useTaskContext();

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "TASK",
    hover: (draggedItem: draggedItem) => {
      if (draggedItem.index !== index) {
        moveTask(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <li
      ref={(node) => drag(drop(node))}
      className={className}
      style={{ opacity: isDragging ? 0.4 : 1 }}
    >
      {item !== undefined && item.state === "Active" ? (
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
            label={<CheckMark />}
          />
          <span>{item.title}</span>
          <Button
            action={() => deleteTask(item)}
            task={item}
            className="deleteBtn"
            label={<Cross />}
          />
        </>
      )}
    </li>
  );
};

export default TaskItem;
