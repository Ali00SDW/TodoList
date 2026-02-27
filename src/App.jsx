import "./App.css";
import ToDoList from "./components/To-Do-List";
import { TodoContext } from "./contexts/todoContext";
import { useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary";

const initialTodos = [];
function App() {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: "linear-gradient(to bottom, #000000, #a2aeba 75%)",
        height: "100vh",
      }}
    >
      <TodoContext.Provider value={{ todos, setTodos }}>
        <ErrorBoundary>
          <ToDoList />
        </ErrorBoundary>
      </TodoContext.Provider>
    </div>
  );
}

export default App;
