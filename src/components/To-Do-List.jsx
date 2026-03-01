import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";

// Icons
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";

// Components
import ToDo from "./To-Do";
import { Grid } from "@mui/material";

// OTHERS
import { v4 as uuidv4 } from "uuid";
import { TodoContext } from "../contexts/todoContext";
import { useContext, useState, useEffect } from "react";

export default function ToDoList() {
  const { todos, setTodos } = useContext(TodoContext);

  const [titleInput, setTitleInput] = useState("");
  const [displayTodosType, setDisplayTodosType] = useState("all");

  // fillteration
  const completedTodos = todos.filter((t) => {
    return t.isCompleted;
  });
  const notCompletedTodos = todos.filter((t) => {
    return !t.isCompleted;
  });

  let todosToBeRendered = todos;

  if (displayTodosType == "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayTodosType == "incompleted") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  const todosJsx =
    todosToBeRendered.map((t) => {
      return <ToDo key={t.id} todo={t} />;
    }) || [];
// useEffect for getting data from local storage
  useEffect(() => {
    console.log("done");
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    setTodos(storageTodos || []);
  }, [setTodos]);

  function changeDisplayedType(e) {
    setDisplayTodosType(e.target.value);
  }

  function handleAddClick() {
    if (!titleInput.trim()) return;
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };

    const currentTodos = todos || [];
    const updatedTodos = [...currentTodos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
  }

  return (
    <Container maxWidth="sm" sx={{ width: { lg: "100%", xs: "100%" } }}>
      <Card
        className="mainCard"
        sx={{ minWidth: 275 }}
        style={{ maxHeight: "80vh", overflow: "scroll" }}
      >
        <CardContent>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "ui-serif",
              color: "#00000098",
              fontWeight: "bold",
              fontSize: { lg: "3.5rem", xs: "2.5rem" },
            }}
          >
            My Tasks
          </Typography>

          <Divider />

          {/* Button */}

          <ToggleButtonGroup
            value={displayTodosType}
            exclusive
            onChange={changeDisplayedType}
            aria-label="text alignment"
            color="primary"
          >
            <ToggleButton
              value="all"
              sx={{
                color: "black",
                margin: 1,
                backgroundColor: "#acacac",
                boxShadow: "0 0 4px 2px #00000068",
                fontSize: { lg: "17px", xs: "10px" },
              }}
            >
              All
            </ToggleButton>
            <ToggleButton
              value="completed"
              sx={{
                color: "black",
                margin: 1,
                backgroundColor: "#acacac",
                boxShadow: "0 0 4px 2px #00000068",
                fontSize: { lg: "17px", xs: "10px" },
              }}
            >
              Completed
            </ToggleButton>
            <ToggleButton
              value="incompleted"
              sx={{
                color: "black",
                margin: 1,
                backgroundColor: "#acacac",
                boxShadow: "0 0 4px 2px #00000068",
                fontSize: { lg: "17px", xs: "10px" },
              }}
            >
              InCompleted
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Button */}

          {/* ==== ALL TASKS ==== */}
          {todosJsx}
          {/* ==== ALL TASKS ==== */}

          {/* ==== INPUT + ADD BUTTON ==== */}
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid
              size={9}
              sx={{
                
                background: "#d1d5db99",
                fontSize: { lg: "17px", xs: "10px" },
              }}
            >
              <TextField
                id="outlined-basic"
                label="Task Title"
                variant="outlined"
                style={{ width: "100%" }}
                value={titleInput}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                }}
              />
            </Grid>
            <Grid
              size={3}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                style={{ width: "100%" }}
                onClick={() => {
                  handleAddClick();
                }}
                disabled={titleInput.length <= 4}
              >
                push
              </Button>
            </Grid>
          </Grid>

          {/* ==== // INPUT + ADD BUTTON ==== */}
        </CardContent>
      </Card>
    </Container>
  );
}
