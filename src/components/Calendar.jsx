import { useState, useEffect } from "react";
import BackButton from "./BackButton";
import ForwardButton from "./ForwardButton";

const Calendar = () => {
  const [year, setYear] = useState(2022);
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(31);
  const [spaces, setSpaces] = useState(0);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    const getFirstDayOfMonth = () => {
      const date = new Date();

      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      // Month + 1 represents "next month", 0 represents the day before the first day of "next month", giving us the last day of the current month
      const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

      console.log(day);
      console.log(month);
      console.log(year);
    };

    getFirstDayOfMonth(year, month);
  }, []);

  return (
    <div className="calendar container">
      <div className="grid grid-cols-3 gap-4 pb-8 justify-items-center">
        <BackButton />
        <h2>January</h2>
        <ForwardButton />
      </div>
      <div className="grid grid-cols-7 gap-4 pb-8 ">
        <div>Sunday</div>
        <div>Monday</div>
        <div>Tuesday</div>
        <div>Wednesday</div>
        <div>Thursday</div>
        <div>Friday</div>
        <div>Saturday</div>
      </div>
      <div className="grid grid-cols-7 gap-4">
        {Array.from({ length: day }, (_, i) => (
          <div key={i + 1}>
            <label>{i + 1}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
