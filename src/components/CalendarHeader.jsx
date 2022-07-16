import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

const CalendarHeader = ({ onPrevious, onNext, dateDisplay }) => {
  return (
    <div className="grid grid-cols-3 gap-4 pb-8 justify-items-center">
      <div onClick={onPrevious} className="btn btn-reverse btn-back">
        <FaArrowCircleLeft /> Previous
      </div>
      <h2>{dateDisplay}</h2>
      <div onClick={onNext} className="btn btn-reverse btn-back">
        <FaArrowCircleRight /> Next
      </div>
    </div>
  );
};

export default CalendarHeader;
