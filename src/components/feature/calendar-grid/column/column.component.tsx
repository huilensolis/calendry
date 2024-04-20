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

  return (
    <ul className="w-full grid [grid-template-rows:repeat(48,_1fr)] h-full bg-neutral-100 border-b border-r border-neutral-200">
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

        return (
          <li key={i} className="w-full h-full border-b border-neutral-200 ">
            {eventInBlock ? (
              <EventBlock
                title={`from ${new Date(
                  eventInBlock.start_date,
                ).getHours()} ${new Date(
                  eventInBlock.start_date,
                ).getMinutes()} to ${new Date(
                  eventInBlock.end_date,
                ).getHours()} ${new Date(eventInBlock.end_date).getMinutes()}`}
              />
            ) : (
              <TimeBlock
                timeSpan={{ start: timeSpans[i], end: timeSpans[i + 1] }}
                date={date}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
