import React from "react";

import { useParams } from "react-router-dom";

import Day from "./Day";
import { monthsInYearToArray } from "../functions/date";

const Month = () => {
  const data = monthsInYearToArray();
  const { month } = useParams();

  return (
    <div className="flex w-3/4 flex-wrap gap-2 rounded bg-slate-600 p-4 mt-6">
      {data[month].map((day) => (
        <Day key={day.date} dayInMonth={day} />
      ))}
    </div>
  );
};

export default Month;
