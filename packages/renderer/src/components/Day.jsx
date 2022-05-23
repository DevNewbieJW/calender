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
          ? "bg-slate-800 rounded-xl"
          : "bg-slate-600"
      } flex w-24 p-6 flex-col items-center hover:bg-slate-800 hover:rounded-xl hover:scale-[1.15] hover:cursor-pointer`}
    >
      <div className="text-4xl">{dayInMonth.date}</div>
      <div className="text-2xl">{dayInMonth.weekday}</div>
    </Link>
  );
};

export default Day;
