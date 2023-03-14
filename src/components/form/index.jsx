import React, { useState } from "react";
import "./styles.scss";
import { Modal, Box, Button } from "@mui/material";

// MUI styles
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const TaskForm = ({ open = false, addNewTask }) => {
  const [newTask, setNewTask] = useState({
    heading: "",
    desc: "",
    deadline: "",
    status: "todo",
    id: "",
  });

  const handleChange = (event) => {
    const field = event?.target?.name;

    switch (field) {
      case "heading":
        setNewTask((prevState) => {
          return {
            ...prevState,
            heading: event?.target?.value,
          };
        });
        break;

      case "desc":
        setNewTask((prevState) => {
          return {
            ...prevState,
            desc: event?.target?.value,
          };
        });
        break;

      case "deadline":
        setNewTask((prevState) => {
          return {
            ...prevState,
            deadline: event?.target?.value,
          };
        });
        break;

      case "status":
        setNewTask((prevState) => {
          return {
            ...prevState,
            status: event?.target?.value,
          };
        });
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const task = { ...newTask, id: Date.now() };
    addNewTask(task);
  };

  return (
    <div>
      <Modal open={open} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
        <Box sx={{ ...style, width: 400 }}>
          <div className="form__header">Add new task</div>

          <form className="form__container" onSubmit={handleSubmit}>
            <div className="form__field">
              <label>Title</label>
              <input aria-label="heading" name="heading" value={newTask?.heading} onChange={handleChange} />
            </div>
            <div className="form__field">
              <label>Description</label>
              <input aria-label="desc" name="desc" value={newTask?.desc} onChange={handleChange} />
            </div>
            <div className="form__field">
              <label>Deadline</label>
              <input aria-label="deadline" name="deadline" value={newTask?.deadline} onChange={handleChange} />
            </div>

            <Button color="secondary" type="submit" variant="outlined">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default TaskForm;
