import React from "react";
import { Link } from "react-router-dom";

import { getToday } from "../functions/date";

const Day = ({ dayInMonth }) => {
  const [currentWeekDay, currentMonth, today, currentYear] = getToday();

  return (
    <Link
      to={dayInMonth.date}
      className={`${
        dayInMonth.date === today && dayInMonth.month === currentMonth
          ? "bg-gray-800 rounded-xl"
          : "bg-gray-600"
      }  flex flex-col justify-center items-center p-4 w-[15.8%] hover:bg-gray-800 hover:rounded-xl hover:scale-[1.15] hover:cursor-pointer`}
    >
      <div className="text-4xl">{dayInMonth.date}</div>
      <div className="text-2xl">{dayInMonth.weekday}</div>
    </Link>
  );
};

export default Day;
