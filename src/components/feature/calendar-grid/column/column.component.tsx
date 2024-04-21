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

  function removeSpansWithEvents(
    events: Database["public"]["Tables"]["event"]["Row"][],
  ): (typeof timeSpans)[number][] {
    const occupiedSpans: string[] = [];

    events.forEach((event) => {
      const startHour = new Date(event.start_date).getHours();
      const endHour = new Date(event.end_date).getHours();

      for (let i = startHour + 1; i < endHour; i++) {
        occupiedSpans.push(`${i < 10 ? "0" + i : i}:00`);
      }
    });

    return timeSpans.filter((span) => !occupiedSpans.includes(span));
  }

  const timeSpansWithoutEventsRows = removeSpansWithEvents(events);

  const defaultTotalRows = 25;

  const getRowsOfEvents = () => {
    // starts at 8
    // ends at 10
    // resutl is two rows * 2

    let totalHours = 0;

    for (const event of events) {
      const startDate = new Date(event.start_date);
      const endDate = new Date(event.end_date);

      totalHours += endDate.getHours() - startDate.getHours();
    }

    return {
      totalEventRows: totalHours * 2,
    };
  };

  const { totalEventRows } = getRowsOfEvents();

  const totalRows = defaultTotalRows - totalEventRows;

  return (
    <ul
      className="w-full h-full bg-neutral-100 border-b border-r border-neutral-200"
      style={{
        gridTemplateRows: `repeat(${totalRows}, 100px)`,
        display: "grid",
      }}
    >
      {timeSpansWithoutEventsRows.map((time, i) => {
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

        if (!eventInBlock) {
          const timeSpanEnd = timeSpansWithoutEventsRows[i + 1];

          const indexOfTimeSpanEndInDefaultSpans = timeSpans.findIndex(
            (span) => span === timeSpanEnd,
          );

          // get if the event is after this block or before

          const timeSpanStart = timeSpans[indexOfTimeSpanEndInDefaultSpans - 1];

          const isLastRow = !timeSpanEnd && !timeSpanStart;
          const lastRowSpanEnd = timeSpansWithoutEventsRows[i];
          const lastRowSpanIndex = timeSpans.findIndex(
            (span) => span === lastRowSpanEnd,
          );
          const lastRowSpanStart = timeSpans[lastRowSpanIndex];

          return (
            <li key={i} className="w-full h-full border-b border-neutral-200 ">
              <TimeBlock
                timeSpan={{
                  start:
                    events.length === 0
                      ? timeSpans[i]
                      : isLastRow
                        ? lastRowSpanStart
                        : timeSpanStart,
                  end:
                    events.length === 0
                      ? timeSpans[i + 1]
                        ? timeSpans[i + 1]
                        : timeSpans[i]
                      : isLastRow
                        ? lastRowSpanEnd
                        : timeSpanEnd,
                }}
                date={date}
              />
            </li>
          );
        }

        let totalHours = 0;

        const startDate = new Date(eventInBlock.start_date);
        const endDate = new Date(eventInBlock.end_date);

        totalHours += endDate.getHours() - startDate.getHours(); // we count all hours

        const totalRows = totalHours;
        return (
          <li
            key={i}
            className="w-full h-full border-b border-neutral-200"
            style={{ gridRow: `span ${totalRows}` }}
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
