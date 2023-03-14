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

    // Remove the task card from the previous array
    updatedBoard?.forEach((section) => {
      if (section?.id === prevValue) {
        section?.cards?.splice(index, 1);
      }
    });

    // Add it to the new section
    updatedBoard?.forEach((section) => {
      if (section?.id === value) {
        section?.cards?.push({ ...taskCard });
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
                  index={index}
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
      {openAddNewTask && <Form open={openAddNewTask} addNewTask={addNewTask} />}
    </div>
  );
}
