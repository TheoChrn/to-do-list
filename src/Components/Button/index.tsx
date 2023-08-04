import { Task } from "App";

type Button = {
  task?: Task;
  label?: string;
  action: (task?: Task) => void;
  className?: string;
};

const Button = ({ task, label, action, className }: Button) => {
  return (
    <>
      {task !== undefined ? (
        <button className={className} onClick={() => action(task)}>
          {label}
        </button>
      ) : (
        <button className={className} onClick={() => action()}>
          {label}
        </button>
      )}
    </>
  );
};

export default Button;
