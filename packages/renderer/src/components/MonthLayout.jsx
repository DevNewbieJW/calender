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
      <div className="h-full w-2/6 p-2 rounded-2xl flex flex-col">
        <div className="w-full flex flex-row justify-between items-center pb-6">
          <ArrowCircleLeftIcon
            className="cursor-pointer"
            width={35}
            onClick={() => goPreviousMonth()}
          />
          <span className="text-center w-full font-bold text-4xl">
            {currentYear}, {selectedMonth}.
          </span>
          <ArrowCircleRightIcon
            className="cursor-pointer"
            width={35}
            onClick={() => goNextMonth()}
          />
        </div>
        <div className="w-full text-center -mb-2 text-sm flex justify-center items-center">
          <div className="border-2 rounded bg-slate-500 w-1/4 flex flex-col justify-center items-center">
            <div className="flex flex-row justify-between items-center w-full px-2">
              <Link to={`/${currentMonth}/${today}`}>Day</Link>
              <Link to={`/${month}`}>Month</Link>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </React.Fragment>
  );
};

export default MonthSelector;
