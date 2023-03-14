import React, { useEffect, useState } from "react";

import Card from "./components/card";
import Form from "./components/form";

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

  const handleOnStatusChange = (taskId, value, prevValue) => {
    const updatedBoard = [...board];

    updatedBoard?.forEach((section) => {
      if (section?.id === "todo" && value === "todo") {
        const taskIndex = section?.cards?.findIndex((item) => item?.id === taskId);
        const task = section?.cards[taskIndex];
        section?.cards?.push(task);
      } else if (section?.id === "progress" && value === "progress") {
        const taskIndex = section?.cards?.findIndex((item) => item?.id === taskId);
        const task = section?.cards[taskIndex];
        section?.cards?.push(task);
      } else if (section?.id === "done" && value === "done") {
        const taskIndex = section?.cards?.findIndex((item) => item?.id === taskId);
        const task = section?.cards[taskIndex];
        section?.cards?.push(task);
      }
    });

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
              {section?.cards?.map((task, index) => (
                <Card
                  key={index}
                  heading={task?.heading}
                  desc={task?.desc}
                  deadline={task?.deadline}
                  status={task?.status}
                  id={task?.id}
                  onStatusChange={handleOnStatusChange}
                />
              ))}
              {section?.addButton && <button onClick={() => setOpenAddNewTask(true)}>Add Card</button>}
            </div>
          );
        })}
      </div>

      {/* Popup for new task */}
      <Form open={openAddNewTask} addNewTask={addNewTask} />
    </div>
  );
}
