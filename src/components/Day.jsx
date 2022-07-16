import React from "react";

function Day({ day }) {
  const className = `card card-body ${
    day.value === "padding" ? "" : "shadow-md"
  }`;

  return (
    <div className={className}>{day.value === "padding" ? "" : day.value}</div>
  );
}

export default Day;
