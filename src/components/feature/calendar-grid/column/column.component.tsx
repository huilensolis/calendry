"use client";

import { useEventStore } from "@/stores/events";
import { TimeBlock } from "./time-block";

export function Column({ date }: { date: Date }) {
  const timeSpans = useEventStore((state) => state.timeSpans);

  return (
    <ul className="w-full grid [grid-template-rows:repeat(48,_1fr)] h-full bg-neutral-100 border-b border-r border-neutral-200">
      {timeSpans.map((time, i) => (
        <li key={i} className="w-full h-full border-b border-neutral-200 ">
          <TimeBlock
            timeSpan={{ start: timeSpans[i], end: timeSpans[i + 1] }}
            date={date}
          />
        </li>
      ))}
    </ul>
  );
}
