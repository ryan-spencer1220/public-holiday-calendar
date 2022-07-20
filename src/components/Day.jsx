import React, { useEffect } from "react";

function Day({ day, holiday }) {
  useEffect(() => {
    console.log(holiday.localName);
  }, []);
  const className = `card card-body ${
    day.value === "padding" ? "" : "shadow-md"
  }`;

  return (
    <div className={className}>
      {day.value === "padding" ? "" : day.value}
      {holiday.date === day.date && <p>{holiday.localName}</p>}
    </div>
  );
}

export default Day;
