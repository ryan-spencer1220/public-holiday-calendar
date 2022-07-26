import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { daysOfWeek } from "../constants";
import { abbreviatedDaysOfWeek } from "../constants";

const CalendarHeader = ({ onPrevious, onNext, dateDisplay }) => {
  const headings = daysOfWeek.map((day) => <div key={day}>{day}</div>);
  const abbreviatedHeadings = abbreviatedDaysOfWeek.map((day) => (
    <div key={day}>{day}</div>
  ));

  return (
    <>
      <div className="grid grid-cols-3 gap-4 pb-8 justify-items-center">
        <div onClick={onPrevious} className="btn btn-reverse btn-back">
          <FaArrowCircleLeft /> Previous
        </div>
        <h2>{dateDisplay}</h2>
        <div onClick={onNext} className="btn btn-reverse btn-back">
          <FaArrowCircleRight /> Next
        </div>
      </div>
      <div className="grid grid-cols-7 gap-4 pb-8 headings">{headings}</div>
      <div className="grid grid-cols-7 gap-4 pb-8 abbreviatedHeadings">
        {abbreviatedHeadings}
      </div>
    </>
  );
};

export default CalendarHeader;
