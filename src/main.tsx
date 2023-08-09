import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { TaskContextProvider } from "./Components/Context/TaskContext.tsx";
import { DndProvider } from "react-dnd-multi-backend";
import { HTML5toTouch } from "rdndmb-html5-to-touch";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TaskContextProvider>
    <DndProvider options={HTML5toTouch}>
      <App />
    </DndProvider>
  </TaskContextProvider>
);
