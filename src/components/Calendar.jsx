import { useEffect, useState } from "react";
import axios from "axios";
import CalendarHeader from "./CalendarHeader";
import Day from "./Day";
import daysOfWeek from "../constants";

const Calendar = () => {
  const [navigate, setNavigate] = useState(0);
  const [dateDisplay, setDateDisplay] = useState("");
  const [days, setDays] = useState([]);
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const date = new Date();

    if (navigate !== 0) {
      date.setMonth(new Date().getMonth() + navigate);
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

    const searchHolidays = async () => {
      axios
        .get(`https://date.nager.at/api/v3/PublicHolidays/${year}/US`)
        .then((res) => setHolidays(res.data));
    };

    searchHolidays();

    const paddingDays = daysOfWeek.indexOf(dateString.split(", ")[0]);

    const daysArray = [];

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
    holidays.forEach((obj) => holidayDates.push(obj.date));

    const dayDates = [];
    days.forEach((obj) => dayDates.push(obj.date));

    const found = dayDates.some((r) => holidayDates.includes(r));

    console.log(holidayDates);
    console.log(dayDates);
    console.log(found);

    // const dayDates = days.forEach((obj) => console.log(obj.date));
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
          <Day key={index} day={date} />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
