import React, { useEffect, useState } from "react";

import Card from "./components/card";
import Form from "./components/form";
import { Button } from "@mui/material";
import "./styles.scss";

export default function App() {
  const [board, setBoard] = useState([
    {
      id: "todo",
      name: "Todo",
      cards: [],
      addButton: true,
    },
    {
      id: "progress",
      name: "InProgress",
      cards: [],
    },
    {
      id: "done",
      name: "Done",
      cards: [],
    },
  ]);
  const [openAddNewTask, setOpenAddNewTask] = useState(false);

  useEffect(() => {
    const board = localStorage.getItem("data");
    if (board) {
      setBoard(JSON.parse(board));
    }
  }, []);

  const addNewTask = (newTask) => {
    const updatedBoard = [...board];

    updatedBoard?.forEach((section) => {
      if (section?.id === "todo") {
        section?.cards?.push(newTask);
      }
    });

    localStorage.setItem("data", JSON.stringify(updatedBoard));

    setBoard(updatedBoard);
    setOpenAddNewTask(false);
  };

  const handleOnStatusChange = (taskId, value, prevValue, index) => {
    const updatedBoard = [...board];

    let taskCard;

    // Delete the previous
    updatedBoard?.forEach((section) => {
      if (section?.id === prevValue) {
        taskCard = section?.cards?.find((item) => item?.id == taskId);
        section?.cards?.splice(parseInt(index), 1);
      }
    });

    // Add it to the new section
    updatedBoard?.forEach((section) => {
      if (section?.id === value) {
        section?.cards?.push({ ...taskCard, status: value });
      }
    });

    localStorage.setItem("data", JSON.stringify(updatedBoard));
    setBoard(updatedBoard);
    setOpenAddNewTask(false);
  };

  const handleOnDragStart = (event, task, index) => {
    event.dataTransfer.setData("task", task?.id);
    event.dataTransfer.setData("prevValue", event?.target?.parentElement?.id);
    event.dataTransfer.setData("index", index);
  };

  const handleOnDrop = (event) => {
    const taskId = event.dataTransfer.getData("task");
    const value = event?.target?.id;
    const prevValue = event.dataTransfer.getData("prevValue");
    const index = event.dataTransfer.getData("index");
    handleOnStatusChange(taskId, value, prevValue, index);
  };

  const handleOnDragOver = (event) => {
    event.preventDefault();
  };

  const handleCancel = () => {
    setOpenAddNewTask(false);
  };

  return (
    <div>
      <header data-testid="header" className="header">
        Ramsoft's Trello
      </header>
      <div className="board">
        {board.map((section) => {
          return (
            <div onDrop={handleOnDrop} className="board__section" key={section.id}>
              <div className="heading">{section.name}</div>
              {/* Tasks container */}
              <div id={section?.id} onDragOver={handleOnDragOver} className="tasks-container">
                {section?.cards?.map((task, index) => (
                  <div key={task?.id} draggable onDragStart={(event) => handleOnDragStart(event, task, index)}>
                    <Card
                      key={task?.id}
                      index={index}
                      heading={task?.heading}
                      desc={task?.desc}
                      deadline={task?.deadline}
                      status={task?.status}
                      id={task?.id}
                      onStatusChange={handleOnStatusChange}
                    />
                  </div>
                ))}
              </div>
              {/* The Add button and it's container */}
              {section?.addButton && (
                <div className="button-container">
                  <Button className="add-button" variant="contained" onClick={() => setOpenAddNewTask(true)}>
                    Add Card
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Popup for new task */}
      {openAddNewTask && <Form open={openAddNewTask} addNewTask={addNewTask} handleCancel={handleCancel} />}
    </div>
  );
}
