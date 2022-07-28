import React from "react";
import { BsCircleFill } from "react-icons/bs";

function Day({ day, data }) {
  const className = `md:card md:card-body ${
    day.value === "padding" ? "" : "shadow-md card-title"
  }`;

  return (
    data && (
      <div className={className}>
        {day.value === "padding" ? "" : day.value}
        {data.map((obj, index) => {
          if (obj.date === day.date) {
            return (
              <React.Fragment key={index}>
                <p className="text-xs holiday">{obj.localName}</p>
                <BsCircleFill size={14} className="holiday-circle" />
              </React.Fragment>
            );
          } else {
            return <React.Fragment key={index}></React.Fragment>;
          }
        })}
      </div>
    )
  );
}

export default Day;
