import { Task } from "App";

type ButtonProps = {
  task?: Task;
  label?: string | JSX.Element;
  action: (task?: Task) => void;
  className?: string;
  index?: number;
  isActive?: boolean;
};

const Button = ({ task, label, action, className, isActive }: ButtonProps) => {
  const handleClick = () => {
    task ? action(task) : action();
  };

  return (
    <button
      className={isActive ? `${className} ${className}--active` : className}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default Button;
