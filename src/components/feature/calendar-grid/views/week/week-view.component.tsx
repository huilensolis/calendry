import { cn } from "@/lib/utils/cn";
import { Column } from "../../column";
import { TimeAside } from "../../time-aside";

export function WeekView() {
  const daysOfWeek = [" ", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const thisWeek: { date: number; day: string }[] = [];

  const today = new Date();

  const startOfWeek = new Date().getDate() - new Date().getDay() + 1;

  for (let i = 0; i < 7; i++) {
    const current = new Date(startOfWeek);
    current.setDate(startOfWeek + i);

    let dayOfWeek: number;

    if (current.getDay() === 0) {
      dayOfWeek = 7;
    } else {
      dayOfWeek = current.getDay();
    }

    thisWeek.push({
      date: current.getDate(),
      day: daysOfWeek[dayOfWeek],
    });
  }

  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex bg-neutral-100 border-b border-neutral-200 sticky top-[73px]">
        <span className="py-2 w-16 text-end pr-1 border-r border-neutral-200">
          GTM-3
        </span>
        <ul className={`w-full flex-1 grid grid-cols-7`}>
          {thisWeek.map(({ day, date }, i) => (
            <li key={i} className="flex flex-col h-full">
              <header
                className={cn(
                  "py-2 text-center border-r border-neutral-200",
                  `${
                    date === new Date().getDate() &&
                    "bg-primary text-primary-foreground"
                  }`,
                )}
              >
                {day} {date}
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
          {thisWeek.map(({ day, date }, i) => (
            <li key={i} className="w-full">
              <Column />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
