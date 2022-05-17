import React from "react";

import { useParams } from "react-router-dom";

import Day from "./Day";
import { monthsInYearToArray } from "../functions/date";

const Month = () => {
  const data = monthsInYearToArray();
  const { month } = useParams();

  return (
    <div className="flex flex-row flex-wrap bg-gray-600 rounded-2xl p-4 w-4/6">
      {data[month].map((day) => (
        <Day key={day.date} dayInMonth={day} />
      ))}
    </div>
  );
};

export default Month;
