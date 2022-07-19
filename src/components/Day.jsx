import React, { useEffect } from "react";

function Day({ day, holiday }) {
  useEffect(() => {
    // console.log(day, holiday);
  }, []);
  const className = `card card-body ${
    day.value === "padding" ? "" : "shadow-md"
  }`;

  return (
    <div className={className}>
      {day.value === "padding" ? "" : day.value}
      {holiday === day.value && <p>Holiday!!!!</p>}
    </div>
  );
}

export default Day;
