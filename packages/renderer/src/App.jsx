import React from "react";
import { Routes, Route, useParams, useLocation } from "react-router-dom";

import { PlusIcon } from "@heroicons/react/outline";

import MonthLayout from "./components/MonthLayout";
import Month from "./components/Month";
import Modal from "./components/Modal";
import EventForm from "./components/EventForm";
import getEvents from "./api/getEvents";

import { getDayInMonth } from "./functions/date";

const DayOverview = () => {
  const { month, day } = useParams();
  const [events, setEvents] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [, selectedMonth, selectedDay, selectedYear] = getDayInMonth(
    month,
    day
  );

  React.useEffect(() => {
    getEvents().then((response) => setEvents(response));
  }, []);

  return (
    <div className="w-4/6 h-3/4 p-2 flex justify-center items-center">
      <div className="rounded bg-slate-700 border-2 w-4/5 h-full flex justify-center items-center flex-col">
        <div className="flex felx-row gap-2 justify-center items-center h-full w-full">
          <div className="text-2xl text-left w-11/12">
            {selectedDay}-{selectedMonth}-{selectedYear}
          </div>
          <div className="relative left-2 top-0">
            <PlusIcon
              width={25}
              className="p-1 rounded-full hover:bg-slate-900 hover:scale-[1.05]"
              onClick={() => setShowModal(true)}
            />
          </div>
        </div>
        {showModal && (
          <Modal
            handleClose={() => setShowModal(false)}
            children={
              <EventForm date={{ selectedDay, selectedMonth, selectedYear }} />
            }
          />
        )}
        <div className="text-left flex flex-col w-full h-full space-y-4 pl-4 py-4">
          {events.rows
            ?.sort((a, b) => a.doc.time - b.doc.time)
            .map(({ doc: { id, name, time, location } }) => (
              <div key={id} className="flex flex-col">
                <div className="w-1/3 text-xl">{name}</div>
                <div className="text-xs flex flex-row">
                  {time}, {location}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const { pathname } = useLocation();

  return (
    <div className="h-screen w-screen bg-slate-800 text-white">
      <div className="navbar h-12 flex items-center justify-center pt-2">
        {pathname}
      </div>
      <div className="flex flex-col items-center justify-center p-2">
        <Routes>
          <Route path="/" element={<MonthLayout />}>
            <Route path="/:month" element={<Month />} />
            <Route path="/:month/:day" element={<DayOverview />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};
export default App;
