import { useEffect, useState } from "react";
import CalendarHeader from "./CalendarHeader";
import Day from "./Day";
import daysOfWeek from "../constants";
import { useFetch } from "./hooks/useFetch";

const Calendar = () => {
  const { data, isPending, error } = useFetch(
    "https://date.nager.at/api/v3/PublicHolidays/2022/US"
  );
  const [navigate, setNavigate] = useState(0);
  const [dateDisplay, setDateDisplay] = useState("");
  const [days, setDays] = useState([]);
  const [holiday, setHoliday] = useState(null);

  useEffect(() => {
    const date = new Date();

    // Month is reset if navigation value changes (previous/next buttons are clicked)
    if (navigate !== 0) {
      date.setMonth(new Date().getMonth() + navigate);
    }

    const month = date.getMonth();
    const year = date.getFullYear();

    // Represents total days in the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // Represents the first day of the month, used in determining "padding days"
    const firstDayOfMonth = new Date(year, month, 1);
    // Find specific "day" of the first of the month ("Monday", "Tuesday", etc.)
    const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setDateDisplay(
      `${date.toLocaleDateString("en-us", { month: "long" })} ${year}`
    );

    // Padding days determine spaces to add before month begins
    const paddingDays = daysOfWeek.indexOf(dateString.split(", ")[0]);

    const daysArray = [];

    // Loop creates objects for each padding day and actaul day
    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const stringMonth = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;
      const stringDay =
        i - paddingDays < 10 ? `0${i - paddingDays}` : `${i - paddingDays}`;
      const dayString = `${year}-${stringMonth}-${stringDay}`;

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
    const holidayDates = [];

    // Checks for API data, if data exists, dates are pushed to a holiday date array
    if (data) {
      data.forEach((obj) => holidayDates.push(obj.date));
    }

    // Isolates date from object and pushes each date to a date array
    const dayDates = [];
    daysArray.forEach((obj) => dayDates.push(obj.date));

    // Checks for a match between current days in month and holidays
    const foundHoliday = dayDates.find((r) => {
      if (holidayDates.includes(r)) {
        return r;
      }
    });

    const holidayObject = data.find((r) => r.date === foundHoliday);

    setHoliday(holidayObject);
    console.log(holiday);
  }, [navigate]);

  return (
    <div className="calendar container">
      <CalendarHeader
        dateDisplay={dateDisplay}
        onPrevious={() => setNavigate(navigate - 1)}
        onNext={() => setNavigate(navigate + 1)}
      />
      <div className="grid grid-cols-7 gap-4">
        {days.map((date, index) => (
          <Day key={index} day={date} holiday={holiday} />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
