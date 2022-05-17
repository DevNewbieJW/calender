import React from "react";
import { Routes, Route, useParams } from "react-router-dom";

import { PlusIcon } from "@heroicons/react/outline";

import MonthLayout from "./components/MonthLayout";
import Month from "./components/Month";
import Modal from "./components/Modal";

const DayOverview = () => {
  const { month, day } = useParams();

  const [showModal, setShowModal] = React.useState(false);

  return (
    <div className="w-4/6 h-3/4 p-2 flex justify-center items-center">
      <div className="rounded bg-slate-700 border-2 w-4/5 h-full flex justify-center items-center flex-col">
        <div className="flex felx-row gap-2 justify-center items-center h-full w-full">
          <div className="text-2xl text-left w-11/12">
            {day}, {month}
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
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-2/3 p-2 flex justify-center space-y-4">
                  <div className="text-xl font-bold">Add new Event</div>
                  <div className=""></div>
                </div>
              </div>
            }
          />
        )}
        <div className="text-left flex flex-col w-full h-full space-y-4 pl-4 py-4">
          {[
            { name: "Appointment", time: "13.30", location: "Orthopäde" },
            { name: "Appointment", time: "13.30", location: "Orthopäde" },
            { name: "Appointment", time: "13.30", location: "Orthopäde" },
          ].map(({ name, time, location }) => (
            <div className="flex flex-col">
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
  return (
    <div className="bg-gray-800 text-white font-semibold">
      <div className="navbar h-6"></div>
      <div className="h-full flex flex-col space-y-4 justify-center items-center">
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
