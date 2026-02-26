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

  const todosJsx = todos.map((t) => {
    return <ToDo key={t.id} todo={t} />;
  }) || [];

  useEffect(() => {
    console.log("done")
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    setTodos(storageTodos || []);
  }, []);

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
    <Container maxWidth="sm" sx={{width:{"lg": '50%', "xs": '80%'}}}>
      <Card className="mainCard" sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography
            variant="h3"
            sx={{ fontFamily: "ui-serif", color: "#f3f3f398", fontWeight:"bold" }}
          >
            My Tasks
          </Typography>

          <Divider />

          {/* Button */}

          <ToggleButtonGroup
            // value={alignment}
            exclusive
            // onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="left" className="barButton">
              All
            </ToggleButton>
            <ToggleButton value="center" className="barButton">
              Completed
            </ToggleButton>
            <ToggleButton value="right" className="barButton">
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
