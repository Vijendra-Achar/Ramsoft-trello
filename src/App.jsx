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

    // Find the task card
    updatedBoard?.forEach((section) => {
      const taskCardTemp = section?.cards?.find((item) => item?.id === taskId);
      if (taskCardTemp) {
        taskCardTemp.status = value;
        taskCard = taskCardTemp;
      }
    });

    updatedBoard?.forEach((section) => {
      // Remove the task card from the previous array
      if (section?.id === prevValue) {
        section?.cards?.splice(index, 1);
      }

      // Add it to the new section
      if (section?.id === value) {
        section?.cards?.push({ ...taskCard });
      }
    });

    localStorage.setItem("data", JSON.stringify(updatedBoard));
    setBoard(updatedBoard);
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
            <div className="board__section" key={section.id}>
              <div className="heading">{section.name}</div>
              <div className="tasks-container">
                {section?.cards?.map((task, index) => (
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
                ))}
              </div>
              <div className="button-container">
                {section?.addButton && (
                  <Button variant="contained" onClick={() => setOpenAddNewTask(true)}>
                    Add Card
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Popup for new task */}
      {openAddNewTask && <Form open={openAddNewTask} addNewTask={addNewTask} />}
    </div>
  );
}
