import "./App.css";
import ToDoList from "./components/To-Do-List";
import { TodoContext } from "./contexts/todoContext";
import { useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["ui-serif"],
  },

  palette: {
    primary: {
      main: "#000000",
    },
  },
});

const initialTodos = [];
function App() {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          background: "linear-gradient(to top, #313131, #a2aeba 75%)",
          height: "100vh",
        }}
      >
        <TodoContext.Provider value={{ todos, setTodos }}>
          <ErrorBoundary>
            <ToDoList />
          </ErrorBoundary>
        </TodoContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
