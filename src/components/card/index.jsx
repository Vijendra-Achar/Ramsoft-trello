import React, { useState } from "react";

import "./styles.scss";

const statusOptions = [
  {
    value: "todo",
    label: "ToDo",
  },
  {
    value: "progress",
    label: "In progress",
  },
  {
    value: "done",
    label: "Done",
  },
];

const TaskCard = ({ heading, desc, deadline, status, id, onStatusChange }) => {
  const [statusValue, setStatusValue] = useState(status);

  const handleChange = (event) => {
    setStatusValue(event.target.value);
    onStatusChange(id, event.target.value, status);
  };

  return (
    <div className="card">
      <div className="card__heading">{heading}</div>
      <div className="card__desc">{desc}</div>
      <div className="card__deadline">{deadline}</div>
      <div>
        Status :
        <select value={statusValue} onChange={handleChange}>
          {statusOptions?.map((option) => (
            <option key={option?.value} value={option?.value}>
              {option?.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TaskCard;
