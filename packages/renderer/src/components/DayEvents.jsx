import React from "react";

const DayEvents = () => (
  <div className="flex flex-row flex-wrap bg-slate-600 rounded-2xl p-4 w-2/6 space-y-3">
    {[
      {
        name: "Geburtstag Schelle",
        time: "13",
        description: "Saufen",
      },
      {
        name: "Essen",
        time: "11",
      },
      {
        name: "Aufstehen",
        time: "9",
        description: "finde the will to live",
      },
    ]
      .sort((a, b) => {
        return a.time - b.time;
      })
      .map((event) => (
        <div
          key={event.name}
          className="flex flex-row bg-slate-900 w-full gap-2 px-4 py-2"
        >
          <div className="text-sm w-2/4">
            <div className="text-base">{event.name}</div>
            <div className="text-sm">{event.time} uhr</div>
          </div>
          {event.description && (
            <div className="text-sm px-2 w-2/3">{event.description}</div>
          )}
        </div>
      ))}
  </div>
);

export default DayEvents;
