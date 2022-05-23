import React from "react";

import { Outlet, useNavigate, Link } from "react-router-dom";

import {
  ArrowCircleRightIcon,
  ArrowCircleLeftIcon,
} from "@heroicons/react/outline";

import { getMonthOfYear, getToday } from "../functions/date";

const MonthSelector = () => {
  const currentMonth = new Date().getMonth();
  const [month, setMonth] = React.useState(currentMonth);

  const currentYear = new Date().getFullYear();
  const selectedMonth = getMonthOfYear(month);

  const [, , today] = getToday();

  const navigate = useNavigate();

  const goPreviousMonth = () => {
    if (month === 0) return;
    setMonth(month - 1);
  };

  const goNextMonth = () => {
    if (month === 11) return;
    setMonth(month + 1);
  };

  React.useEffect(() => {
    navigate(`/${month}`);
  }, [month]);

  return (
    <React.Fragment>
      <div className="flex items-center justify-center w-full mb-4">
        <div className="flex h-6 w-auto items-center justify-between gap-2 rounded border-2 px-2">
          <Link to={`/${currentMonth}/${today}`}>Day</Link>
          <div>Week</div>
          <Link to={`/${month}`}>Month</Link>
          <div>Year</div>
        </div>
      </div>
      <div className="flex w-3/4 items-center justify-center">
        <div className="flex h-full w-1/3 flex-col items-center justify-center space-y-2">
          <div className="flex w-full items-center justify-between">
            <ArrowCircleLeftIcon
              className="cursor-pointer"
              width={35}
              onClick={() => goPreviousMonth()}
            />
            <div className="text-4xl font-bold">
              {currentYear}, {selectedMonth}.
            </div>
            <ArrowCircleRightIcon
              className="cursor-pointer"
              width={35}
              onClick={() => goNextMonth()}
            />
          </div>
        </div>
      </div>
      <Outlet />
    </React.Fragment>
  );
};

export default MonthSelector;
