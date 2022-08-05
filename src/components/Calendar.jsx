import CalendarHeader from "./CalendarHeader";
import Day from "./Day";
import { useEffect, useState } from "react";
import { daysOfWeek } from "../constants";
import { toast } from "react-toastify";

const Calendar = () => {
  const [navigateMonth, setNavigateMonth] = useState(0);
  const [dateDisplay, setDateDisplay] = useState("");
  const [days, setDays] = useState([]);
  const [holidayData, setHolidayData] = useState();
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const date = new Date();

    // Month is reset if navigation value changes (previous/next buttons are clicked)
    if (navigateMonth !== 0) {
      date.setMonth(new Date().getMonth() + navigateMonth);
    }

    const month = date.getMonth();
    const year = date.getFullYear();
    setCurrentYear(year);

    const totalDaysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1);
    // Find specific "day" of the first of the month ("Monday", "Tuesday", etc.)
    const formattedFirstDayOfMonth = firstDayOfMonth.toLocaleDateString(
      "en-us",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
    setDateDisplay(
      `${date.toLocaleDateString("en-us", { month: "long" })} ${year}`
    );

    // Padding days determine spaces to add before month begins
    const paddingDays = daysOfWeek.indexOf(
      formattedFirstDayOfMonth.split(", ")[0]
    );

    const daysArray = [];

    for (let i = 1; i <= paddingDays + totalDaysInCurrentMonth; i++) {
      const stringMonth = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;
      const stringDay =
        i - paddingDays < 10 ? `0${i - paddingDays}` : `${i - paddingDays}`;

      // Reformat date to match date format returned from API
      const apiFormattedDate = `${year}-${stringMonth}-${stringDay}`;

      if (i > paddingDays) {
        daysArray.push({
          value: i - paddingDays,
          date: apiFormattedDate,
        });
      } else {
        daysArray.push({
          value: "padding",
          date: "",
        });
      }
    }

    setDays(daysArray);
  }, [navigateMonth]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `https://date.nager.at/api/v3/PublicHolidays/${currentYear}/US`
      )
        .then((response) => response.json())
        .then((response) => setHolidayData(response));
    };

    fetchData().catch(() => {
      if (!holidayData) {
        console.log(holidayData);
        toast.error("OOPS!!");
      }
    });
  }, [currentYear, holidayData]);

  return (
    <div className="calendar container p-4 flex-grow">
      <CalendarHeader
        dateDisplay={dateDisplay}
        onPrevious={() => setNavigateMonth(navigateMonth - 1)}
        onNext={() => setNavigateMonth(navigateMonth + 1)}
      />
      <div className="grid grid-cols-7 gap-4">
        {holidayData &&
          days.map((date, index) => (
            <Day key={index} day={date} data={holidayData} />
          ))}
      </div>
    </div>
  );
};

export default Calendar;
