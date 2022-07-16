import { useEffect, useState } from "react";
import CalendarHeader from "./CalendarHeader";
import Day from "./Day";

const Calendar = () => {
  const [navigate, setNavigate] = useState(0);
  const [dateDisplay, setDateDisplay] = useState("");
  const [days, setDays] = useState([]);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    const date = new Date();

    if (navigate !== 0) {
      date.setMonth(new Date().getMonth() + navigate);
      console.log(navigate);
    }

    const month = date.getMonth();
    const year = date.getFullYear();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1);
    const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    setDateDisplay(
      `${date.toLocaleDateString("en-us", { month: "long" })} ${year}`
    );

    const paddingDays = daysOfWeek.indexOf(dateString.split(", ")[0]);

    const daysArray = [];

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const dayString = `${month + 1}/${i - paddingDays}/${year}`;
      if (i > paddingDays) {
        daysArray.push({
          value: i - paddingDays,
          date: dayString,
        });
      } else {
        daysArray.push({
          value: "padding",
          date: "",
        });
      }
    }

    setDays(daysArray);
  }, [navigate]);

  const headings = daysOfWeek.map((day) => <div key={day}>{day}</div>);

  return (
    <div className="calendar container">
      <CalendarHeader
        dateDisplay={dateDisplay}
        onPrevious={() => setNavigate(navigate - 1)}
        onNext={() => setNavigate(navigate + 1)}
      />
      <div className="grid grid-cols-7 gap-4 pb-8 ">{headings}</div>
      <div className="grid grid-cols-7 gap-4">
        {days.map((date, index) => (
          <Day key={index} day={date} />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
