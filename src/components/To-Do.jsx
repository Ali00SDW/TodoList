// ==== MATERIAL UI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// ==== REACT
import { useContext, useState } from "react";
import { TodoContext } from "../contexts/todoContext";
// ==== DIALOG
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function ToDo({ todo }) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [updatedTodos, setUpdatedTodos] = useState({
    title: todo.title,
    details: todo.details,
  });
  const { todos, setTodos } = useContext(TodoContext);

  // ==== HANDLERS ====

  // ==== CHECK HANDLERS
  function handleCheckClick(todoid) {
    const updatedTodos = todos.map((t) => {
      if (t.id == todoid) {
        t.isCompleted = !todo.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
  }
  // ==== DELETE HANDLERS
  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }

  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => {
      if (t.id == todo.id) {
        return false;
      } else {
        return true;
      }
    });
    setTodos(updatedTodos);
  }
  // ==== EDIT HANDLERS
  function handleEditClose() {
    setShowEditDialog(false);
  }

  function handleEditConfirm() {
    const updatedTodo = todos.map((t) => {
      if (t.id == todo.id) {
        return { ...t, title: updatedTodos.title, details: updatedTodos.details };
      } else {
        return t;
      }
    });
    setTodos(updatedTodo);
    setShowEditDialog(false);
  }

  function handleEditClick() {
    setShowEditDialog(true);
  }

  return (
    <>
      {/* ==== DELETE MODEL ==== */}
      <Dialog
        onClose={handleDeleteDialogClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Task"}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ width: "320px" }}
          >
            Are you sure you want to delete this task? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* ==== DELETE MODEL ==== */}
      {/* EDIT MODEL */}
      <Dialog
        onClose={handleEditClose}
        open={showEditDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit Task"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Task name"
            fullWidth
            variant="standard"
            value={updatedTodos.title}
            onChange={(e) => {
              setUpdatedTodos({ ...updatedTodos, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Task Details"
            fullWidth
            variant="standard"
            value={updatedTodos.details}
            onChange={(e) => {
              setUpdatedTodos({ ...updatedTodos, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditConfirm} autoFocus>
            Sure
          </Button>
        </DialogActions>
      </Dialog>
      {/* ==== EDIT MODEL ==== */}

      <Card className="taskCard" sx={{ minWidth: 275, padding: "0" }}>
        <CardContent sx={{ padding: 1.5 }}>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "left",
                  fontFamily: "ui-serif",
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  textAlign: "left",
                  fontFamily: "ui-serif",
                }}
              >
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              size={4}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              {/* === CHECK BUTTON === */}

              <IconButton
                onClick={() => {
                  handleCheckClick(todo.id);
                }}
                className="icon"
                aria-label="check"
                style={{
                  color: todo.isCompleted ? "white" : "green",
                  backgroundColor: todo.isCompleted ? "green" : "white",
                  border: todo.isCompleted ? "3px double white" : "3px solid",
                }}
              >
                <CheckIcon />
              </IconButton>

              {/* === CHECK BUTTON === */}

              {/* EDIT BUTTON */}

              <IconButton
                onClick={handleEditClick}
                className="icon"
                aria-label="edit"
                style={{
                  color: "blue",
                  border: "3px solid",
                }}
              >
                <EditIcon />
              </IconButton>

              {/* === EDIT BUTTON === */}

              {/* DELETE BUTTON */}

              <IconButton
                onClick={handleDeleteClick}
                className="icon"
                aria-label="delete"
                style={{
                  color: "red",
                  border: "3px solid",
                }}
              >
                <DeleteIcon />
              </IconButton>

              {/* === DELETE BUTTON === */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
