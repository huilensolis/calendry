import { Column } from "../../column";
import { TimeAside } from "../../time-aside";

export function WeekView() {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex bg-neutral-100 border-b border-neutral-200 sticky top-[73px]">
        <span className="py-2 w-16 text-end pr-1 border-r border-neutral-200">
          GTM-3
        </span>
        <ul className={`w-full flex-1 grid grid-cols-7`}>
          {daysOfWeek.map((day, i) => (
            <li key={i} className="flex flex-col h-full">
              <header className="py-2 text-center border-r border-neutral-200">
                {day}
              </header>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full flex">
        <div className="w-16 border-r border-neutral-200">
          <TimeAside />
        </div>
        <ul className={`w-full flex-1 grid grid-cols-7 overflow-auto`}>
          {daysOfWeek.map((day, i) => (
            <li key={i} className="w-full">
              {" "}
              <Column />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
