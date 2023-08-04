import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { TaskContextProvider } from "./Components/Context/TaskContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TaskContextProvider>
    <App />
  </TaskContextProvider>
);
