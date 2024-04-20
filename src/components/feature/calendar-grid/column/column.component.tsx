"use client";

import { useEventStore } from "@/stores/events";
import { TimeBlock } from "./time-block";
import { Database } from "@/lib/utils/supabase/types";
import { EventBlock } from "./event-block";

export function Column({
  date,
  events,
}: {
  date: Date;
  events: Database["public"]["Tables"]["event"]["Row"][];
}) {
  const timeSpans = useEventStore((state) => state.timeSpans);

  const defaultTotalRows = 50;

  const getRowsOfEvents = () => {
    // starts at 8
    // ends at 10
    // resutl is two rows * 2

    let totalHours = 0;
    let totalHalfHours = 0;

    for (const event of events) {
      const startDate = new Date(event.start_date);
      const endDate = new Date(event.end_date);

      totalHours += endDate.getHours() - startDate.getHours();

      if (startDate.getMinutes() === 30) {
        totalHours -= 1;
        totalHalfHours += 1;
      }

      if (endDate.getMinutes() === 30) {
        totalHours -= 1;
        totalHalfHours += 1;
      }
    }

    return {
      totalEventRows: (totalHours < 0 ? 0 : totalHours * 2) + totalHalfHours,
    };
  };

  const { totalEventRows } = getRowsOfEvents();

  const totalRows = defaultTotalRows - totalEventRows;

  return (
    <ul
      className="w-full h-full bg-neutral-100 border-b border-r border-neutral-200"
      style={{
        gridTemplateRows: `repeat(${totalRows}, 50px)`,
        display: "grid",
      }}
    >
      {timeSpans.map((time, i) => {
        const [startTime, endTime] = time.split(":");

        const blockDate = new Date(date);
        blockDate.setHours(Number(startTime), Number(endTime), 0);

        const eventInBlock = events.find((event) => {
          const startDate = new Date(event.start_date);

          if (
            startDate.getHours() === blockDate.getHours() &&
            startDate.getMinutes() === blockDate.getMinutes()
          ) {
            return event;
          }
        });

        if (!eventInBlock)
          return (
            <li key={i} className="w-full h-full border-b border-neutral-200 ">
              <TimeBlock
                timeSpan={{ start: timeSpans[i], end: timeSpans[i + 1] }}
                date={date}
              />
            </li>
          );

        let totalHours = 0;
        let halfHours = 0;

        const startDate = new Date(eventInBlock.start_date);
        const endDate = new Date(eventInBlock.end_date);

        totalHours += endDate.getHours() - startDate.getHours(); // we count all hours

        if (startDate.getMinutes() === 30) {
          totalHours -= 1;
          halfHours += 1;
        }

        if (endDate.getMinutes() === 30) {
          halfHours += 1;
        }

        const totalRows = totalHours * 2 + halfHours;
        return (
          <li
            key={i}
            className="w-full h-full border-b border-neutral-200"
            style={{ gridRow: `span ${totalRows}` }}
            total-hours={totalHours}
            half-hours={halfHours}
          >
            <EventBlock
              event={eventInBlock}
              maxDescriptionLength={totalRows > 3 ? 120 : totalRows * 30}
            />
          </li>
        );
      })}
    </ul>
  );
}
